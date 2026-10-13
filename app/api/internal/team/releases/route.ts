import { env } from "cloudflare:workers";
import { authorizeTeam } from "../../../../team-auth";

export async function GET(request: Request) {
  const access = await authorizeTeam(request);
  if ("response" in access) return access.response;
  const filter = new URL(request.url).searchParams.get("status");
  const allowed = new Set(["received", "in_review", "corrections_requested", "approved", "delivered", "rejected"]);
  const rows = filter && allowed.has(filter)
    ? await env.DB.prepare(`SELECT r.id,r.owner_email,r.title,r.release_type,r.release_date,r.timing_status,r.status,r.payload,r.created_at,
        COALESCE(u.name,'') AS artist_name,COALESCE(u.artist_name,'') AS artist_alias,
        (SELECT COUNT(*) FROM release_corrections c WHERE c.release_id=r.id AND c.status='requested') AS pending_corrections
      FROM releases r LEFT JOIN users u ON lower(u.email)=lower(r.owner_email) WHERE r.status=? ORDER BY r.created_at DESC`).bind(filter).all()
    : await env.DB.prepare(`SELECT r.id,r.owner_email,r.title,r.release_type,r.release_date,r.timing_status,r.status,r.payload,r.created_at,
        COALESCE(u.name,'') AS artist_name,COALESCE(u.artist_name,'') AS artist_alias,
        (SELECT COUNT(*) FROM release_corrections c WHERE c.release_id=r.id AND c.status='requested') AS pending_corrections
      FROM releases r LEFT JOIN users u ON lower(u.email)=lower(r.owner_email) ORDER BY r.created_at DESC`).all();
  return Response.json({ releases: rows.results });
}
