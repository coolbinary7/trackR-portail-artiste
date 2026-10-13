import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../../../chatgpt-auth";
import { auditStatement } from "../../../../../team-auth";

export async function POST(request: Request, context: { params: Promise<{ id: string; correctionId: string }> }) {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error: "Non authentifié." }, { status: 401 });
  const { id: rawId, correctionId: rawCorrectionId } = await context.params;
  const releaseId = Number(rawId), correctionId = Number(rawCorrectionId);
  const body = await request.json().catch(() => ({})) as { response?: string };
  const response = body.response?.trim() || "";
  if (!Number.isInteger(releaseId) || !Number.isInteger(correctionId) || response.length < 2 || response.length > 2000) return Response.json({ error: "Votre réponse doit contenir entre 2 et 2 000 caractères." }, { status: 400 });
  const release = await env.DB.prepare("SELECT id FROM releases WHERE id=? AND owner_email=?").bind(releaseId, identity.email).first();
  if (!release) return Response.json({ error: "Sortie introuvable." }, { status: 404 });
  const updated = await env.DB.batch([
    env.DB.prepare(`INSERT INTO activity_log (release_id,actor_email,actor_role,action,details)
      SELECT ?,?,'artist','correction.answered',? WHERE EXISTS
      (SELECT 1 FROM release_corrections WHERE id=? AND release_id=? AND owner_email=? AND status='requested')`)
      .bind(releaseId, identity.email, JSON.stringify({ correctionId, response }), correctionId, releaseId, identity.email),
    env.DB.prepare(`UPDATE release_corrections SET response=?,status='answered',responded_by_email=?,responded_at=CURRENT_TIMESTAMP
      WHERE id=? AND release_id=? AND owner_email=? AND status='requested'`).bind(response, identity.email, correctionId, releaseId, identity.email),
  ]);
  if (!updated[1]?.meta?.changes) return Response.json({ error: "Cette correction n’est plus en attente." }, { status: 409 });
  return Response.json({ ok: true });
}
