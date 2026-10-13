import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../chatgpt-auth";
import { scheduleCheck } from "../../release-rules";
import { validateReleaseInput } from "../../release-validation";
import { validateScheduleAndAssets } from "../../release-service";

export async function GET() {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error: "Non authentifié" }, { status: 401 });
  const result = await env.DB.prepare("SELECT id,title,release_type,release_date,timing_status,status,payload,created_at FROM releases WHERE lower(owner_email)=lower(?) ORDER BY id DESC").bind(identity.email).all();
  const corrections = await env.DB.prepare(`SELECT id,release_id,section,message,status,response,created_at,responded_at,due_at
    FROM release_corrections WHERE lower(owner_email)=lower(?) ORDER BY created_at DESC`).bind(identity.email).all();
  const byRelease = new Map<number, unknown[]>();
  for (const correction of corrections.results as Array<{ release_id: number }>) {
    const list = byRelease.get(correction.release_id) || [];
    list.push(correction);
    byRelease.set(correction.release_id, list);
  }
  return Response.json({ releases: result.results.map((release: any) => ({ ...release, corrections: byRelease.get(release.id) || [] })) });
}

export async function POST(request: Request) {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error: "Non authentifié" }, { status: 401 });
  const account = await env.DB.prepare("SELECT status FROM users WHERE lower(email)=lower(?)").bind(identity.email).first<{ status: string }>();
  if (account?.status !== "approved") return Response.json({ error: "Votre accès n’est pas encore validé." }, { status: 403 });
  const checked = validateReleaseInput(await request.json().catch(() => null));
  if (!checked.input) return Response.json({ error: checked.error }, { status: 400 });
  const input = checked.input;
  const ruleError = await validateScheduleAndAssets(identity.email, input);
  if (ruleError) return Response.json({ error: ruleError }, { status: 400 });
  const schedule = scheduleCheck(input.date)!;
  const timingStatus = schedule.businessDays < 15 ? `Dérogation — ${schedule.businessDays} jours ouvrés` : `Préavis conforme — ${schedule.businessDays} jours ouvrés`;
  const result = await env.DB.prepare(`INSERT INTO releases (owner_email,title,release_type,release_date,timing_status,status,payload)
    VALUES (?,?,?,?,?,'received',?) RETURNING id`)
    .bind(identity.email, input.title, input.type, input.date, timingStatus, JSON.stringify(input.payload)).first<{ id: number }>();
  if (!result?.id) return Response.json({ error: "La sortie n’a pas pu être créée." }, { status: 500 });
  const snapshot = JSON.stringify({ title: input.title, releaseType: input.type, releaseDate: input.date, timingStatus, payload: input.payload });
  const attachedAssets = await env.DB.prepare(`SELECT kind,filename,size FROM assets WHERE owner_email=? AND object_key IN (${input.assetKeys.map(() => "?").join(",")})`)
    .bind(identity.email, ...input.assetKeys).all<{ kind: string; filename: string; size: number }>();
  const statements = input.assetKeys.map((key) => env.DB.prepare("UPDATE assets SET release_id=? WHERE object_key=? AND owner_email=?").bind(result.id, key, identity.email));
  statements.push(
    env.DB.prepare("INSERT INTO release_revisions (release_id,revision_number,actor_email,change_summary,snapshot) VALUES (?,1,?,'Soumission initiale',?)").bind(result.id, identity.email, snapshot),
    env.DB.prepare("INSERT INTO activity_log (release_id,actor_email,actor_role,action,details) VALUES (?,?,?,?,?)").bind(result.id, identity.email, "artist", "release.submitted", JSON.stringify({ title: input.title, releaseType: input.type, assetCount: input.assetKeys.length, businessDays: schedule.businessDays })),
  );
  for (const asset of attachedAssets.results) statements.push(
    env.DB.prepare("INSERT INTO activity_log (release_id,actor_email,actor_role,action,details) VALUES (?,?,?,?,?)")
      .bind(result.id, identity.email, "artist", "asset.attached", JSON.stringify({ kind: asset.kind, filename: asset.filename, size: asset.size })),
  );
  await env.DB.batch(statements);
  return Response.json({ id: result.id, status: "received", businessDays: schedule.businessDays }, { status: 201 });
}
