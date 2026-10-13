import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { scheduleCheck } from "../../../release-rules";
import { validateReleaseInput } from "../../../release-validation";
import { validateScheduleAndAssets } from "../../../release-service";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error: "Non authentifié" }, { status: 401 });
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) return Response.json({ error: "Référence invalide." }, { status: 400 });
  const current = await env.DB.prepare(`SELECT id,title,release_type,release_date,timing_status,status,payload FROM releases
    WHERE id=? AND lower(owner_email)=lower(?)`).bind(id, identity.email).first<any>();
  if (!current) return Response.json({ error: "Sortie introuvable." }, { status: 404 });
  if (current.status !== "corrections_requested") return Response.json({ error: "Cette sortie n’est pas en attente de correction." }, { status: 409 });
  const checked = validateReleaseInput(await request.json().catch(() => null));
  if (!checked.input) return Response.json({ error: checked.error }, { status: 400 });
  const input = checked.input;
  const ruleError = await validateScheduleAndAssets(identity.email, input, id);
  if (ruleError) return Response.json({ error: ruleError }, { status: 400 });
  const schedule = scheduleCheck(input.date)!;
  const timingStatus = schedule.businessDays < 15 ? `Dérogation — ${schedule.businessDays} jours ouvrés` : `Préavis conforme — ${schedule.businessDays} jours ouvrés`;
  const previousPayload = (() => { try { return JSON.parse(current.payload || "{}"); } catch { return {}; } })();
  const changedSections = [
    ...(current.title !== input.title || current.release_type !== input.type || current.release_date !== input.date ? ["project"] : []),
    ...(JSON.stringify(previousPayload.artists || []) !== JSON.stringify(input.payload.artists || []) ? ["artists"] : []),
    ...(JSON.stringify(previousPayload.tracks || []) !== JSON.stringify(input.payload.tracks || []) ? ["tracklist"] : []),
    ...(previousPayload.cover !== input.payload.cover || JSON.stringify((previousPayload.tracks || []).map((track: any) => track.master)) !== JSON.stringify((input.payload.tracks || []).map((track: any) => track.master)) ? ["assets"] : []),
    ...(previousPayload.pitch !== input.payload.pitch || previousPayload.priority !== input.payload.priority ? ["pitch"] : []),
    ...(previousPayload.genre !== input.payload.genre || previousPayload.mood !== input.payload.mood || previousPayload.upc !== input.payload.upc ? ["metadata"] : []),
  ];
  const revision = await env.DB.prepare("SELECT COALESCE(MAX(revision_number),0)+1 AS next FROM release_revisions WHERE release_id=?").bind(id).first<{ next: number }>();
  const storedNext = revision?.next || 1;
  const nextRevision = storedNext === 1 ? 2 : storedNext;
  const snapshot = JSON.stringify({ title: input.title, releaseType: input.type, releaseDate: input.date, timingStatus, payload: input.payload });
  const previousSnapshot = JSON.stringify({ title: current.title, releaseType: current.release_type, releaseDate: current.release_date, timingStatus: current.timing_status, payload: previousPayload });
  const selectedAssets = await env.DB.prepare(`SELECT kind,filename,size,release_id FROM assets WHERE owner_email=? AND object_key IN (${input.assetKeys.map(() => "?").join(",")})`)
    .bind(identity.email, ...input.assetKeys).all<{ kind: string; filename: string; size: number; release_id: number | null }>();
  const statements = [
    ...(storedNext === 1 ? [env.DB.prepare("INSERT INTO release_revisions (release_id,revision_number,actor_email,change_summary,snapshot) VALUES (?,1,?,'État initial avant la première correction',?)").bind(id, identity.email, previousSnapshot)] : []),
    env.DB.prepare("UPDATE releases SET title=?,release_type=?,release_date=?,timing_status=?,status='in_review',payload=? WHERE id=? AND lower(owner_email)=lower(?)")
      .bind(input.title, input.type, input.date, timingStatus, JSON.stringify(input.payload), id, identity.email),
    ...input.assetKeys.map((key) => env.DB.prepare("UPDATE assets SET release_id=? WHERE object_key=? AND owner_email=?").bind(id, key, identity.email)),
    env.DB.prepare(`UPDATE release_corrections SET status='resubmitted',response='Dossier corrigé et renvoyé pour relecture.',responded_by_email=?,responded_at=CURRENT_TIMESTAMP
      WHERE release_id=? AND status='requested'`).bind(identity.email, id),
    env.DB.prepare("INSERT INTO release_revisions (release_id,revision_number,actor_email,change_summary,snapshot) VALUES (?,?,?,?,?)")
      .bind(id, nextRevision, identity.email, changedSections.length ? `Sections modifiées : ${changedSections.join(", ")}` : "Dossier renvoyé après correction", snapshot),
    env.DB.prepare("INSERT INTO activity_log (release_id,actor_email,actor_role,action,details) VALUES (?,?,?,?,?)")
      .bind(id, identity.email, "artist", "release.resubmitted", JSON.stringify({ revision: nextRevision, sections: changedSections, businessDays: schedule.businessDays })),
  ];
  for (const asset of selectedAssets.results.filter((item) => item.release_id !== id)) statements.push(
    env.DB.prepare("INSERT INTO activity_log (release_id,actor_email,actor_role,action,details) VALUES (?,?,?,?,?)")
      .bind(id, identity.email, "artist", "asset.attached", JSON.stringify({ kind: asset.kind, filename: asset.filename, size: asset.size })),
  );
  await env.DB.batch(statements);
  return Response.json({ ok: true, status: "in_review", revision: nextRevision });
}
