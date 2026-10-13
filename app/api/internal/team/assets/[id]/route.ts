import { env } from "cloudflare:workers";
import { auditStatement, authorizeTeam } from "../../../../../team-auth";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await authorizeTeam(request);
  if ("response" in access) return access.response;
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) return new Response("Référence invalide.", { status: 400 });
  const asset = await env.DB.prepare("SELECT release_id,object_key,filename,content_type,kind,size FROM assets WHERE id=?").bind(id).first<{ release_id: number | null; object_key: string; filename: string; content_type: string; kind: string; size: number }>();
  if (!asset) return new Response("Fichier introuvable.", { status: 404 });
  const object = await env.BUCKET.get(asset.object_key);
  if (!object) return new Response("Fichier introuvable.", { status: 404 });
  if (asset.release_id) await auditStatement(access.actor, "asset.downloaded", asset.release_id, { kind: asset.kind, filename: asset.filename, size: asset.size }).run();
  const filename = asset.filename.replace(/[\r\n"\\]/g, "_");
  return new Response(object.body, { headers: {
    "content-type": asset.content_type,
    "content-length": String(object.size),
    "content-disposition": `attachment; filename="${filename}"`,
    "cache-control": "private, no-store",
    "x-content-type-options": "nosniff",
  } });
}
