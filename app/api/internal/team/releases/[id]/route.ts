import { env } from "cloudflare:workers";
import { auditStatement, authorizeTeam } from "../../../../../team-auth";

const STATUSES = new Set(["received", "in_review", "corrections_requested", "approved", "delivered", "rejected"]);

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await authorizeTeam(request);
  if ("response" in access) return access.response;
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) return Response.json({ error: "Référence invalide." }, { status: 400 });
  const release = await env.DB.prepare(`SELECT r.*,COALESCE(u.name,'') AS artist_name,COALESCE(u.artist_name,'') AS artist_alias
    FROM releases r LEFT JOIN users u ON lower(u.email)=lower(r.owner_email) WHERE r.id=?`).bind(id).first();
  if (!release) return Response.json({ error: "Sortie introuvable." }, { status: 404 });
  const [corrections, history, assets, revisions] = await Promise.all([
    env.DB.prepare("SELECT id,section,message,status,created_by_email,response,responded_by_email,created_at,responded_at,due_at FROM release_corrections WHERE release_id=? ORDER BY created_at DESC").bind(id).all(),
    env.DB.prepare("SELECT id,actor_email,actor_role,action,details,created_at FROM activity_log WHERE release_id=? ORDER BY created_at DESC,id DESC").bind(id).all(),
    env.DB.prepare("SELECT id,kind,object_key,filename,content_type,size,created_at FROM assets WHERE release_id=? ORDER BY id").bind(id).all(),
    env.DB.prepare("SELECT id,revision_number,actor_email,change_summary,created_at FROM release_revisions WHERE release_id=? ORDER BY revision_number DESC LIMIT 20").bind(id).all(),
  ]);
  return Response.json({ release, corrections: corrections.results, history: history.results, assets: assets.results, revisions: revisions.results });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await authorizeTeam(request);
  if ("response" in access) return access.response;
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  const body = await request.json().catch(() => ({})) as { status?: string };
  if (!Number.isInteger(id) || id < 1 || !body.status || !STATUSES.has(body.status)) return Response.json({ error: "Statut invalide." }, { status: 400 });
  const current = await env.DB.prepare("SELECT status FROM releases WHERE id=?").bind(id).first<{ status: string }>();
  if (!current) return Response.json({ error: "Sortie introuvable." }, { status: 404 });
  if (current.status !== body.status) {
    await env.DB.batch([
      env.DB.prepare("UPDATE releases SET status=? WHERE id=?").bind(body.status, id),
      auditStatement(access.actor, "release.status_changed", id, { from: current.status, to: body.status }),
    ]);
  }
  return Response.json({ ok: true, status: body.status });
}
