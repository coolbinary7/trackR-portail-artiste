import { env } from "cloudflare:workers";
import { auditStatement, authorizeTeam } from "../../../../team-auth";

const SECTIONS = new Set(["project", "artists", "tracklist", "assets", "pitch", "planning", "metadata"]);

export async function POST(request: Request) {
  const access = await authorizeTeam(request);
  if ("response" in access) return access.response;
  const body = await request.json().catch(() => ({})) as { releaseId?: number; section?: string; message?: string };
  const releaseId = Number(body.releaseId);
  const section = body.section || "";
  const message = body.message?.trim() || "";
  if (!Number.isInteger(releaseId) || releaseId < 1 || !SECTIONS.has(section) || message.length < 5 || message.length > 2000) {
    return Response.json({ error: "Renseignez une section et une consigne de 5 à 2 000 caractères." }, { status: 400 });
  }
  const release = await env.DB.prepare("SELECT owner_email,status FROM releases WHERE id=?").bind(releaseId).first<{ owner_email: string; status: string }>();
  if (!release) return Response.json({ error: "Sortie introuvable." }, { status: 404 });
  const result = await env.DB.batch([
    env.DB.prepare(`INSERT INTO release_corrections (release_id,owner_email,section,message,status,created_by_email,due_at)
      VALUES (?,?,?,?,'requested',?,datetime('now','+15 days')) RETURNING id`).bind(releaseId, release.owner_email, section, message, access.actor.email),
    env.DB.prepare("UPDATE releases SET status='corrections_requested' WHERE id=?").bind(releaseId),
    auditStatement(access.actor, "correction.requested", releaseId, { from: release.status, to: "corrections_requested", message }, section),
  ]);
  const correctionId = (result[0]?.results?.[0] as { id?: number } | undefined)?.id;
  return Response.json({ ok: true, id: correctionId }, { status: 201 });
}
