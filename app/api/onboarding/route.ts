import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../chatgpt-auth";
import { writeAudit } from "../../team-auth";

export async function POST(request: Request) {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error: "Non authentifié" }, { status: 401 });
  const p = await request.json() as Record<string,string>;
  if (!p.artistName?.trim() || !p.phone?.trim() || !p.country?.trim()) return Response.json({ error: "Complétez les champs obligatoires." }, { status: 400 });
  await env.DB.batch([env.DB.prepare(`INSERT INTO users (email,name,artist_name,phone,country,spotify,instagram,status,role)
    VALUES (?,?,?,?,?,?,?,'approved','user')
    ON CONFLICT(email) DO UPDATE SET name=excluded.name,artist_name=excluded.artist_name,phone=excluded.phone,country=excluded.country,spotify=excluded.spotify,instagram=excluded.instagram,status='approved'`)
    .bind(identity.email, p.name || identity.displayName, p.artistName, p.phone, p.country, p.spotify || "", p.instagram || ""),
    env.DB.prepare("INSERT INTO activity_log (actor_email,actor_role,action,details) VALUES (?,?,?,?)").bind(identity.email,"artist","profile.onboarding_completed",JSON.stringify({artistName:p.artistName,country:p.country}))]);
  return Response.json({ ok: true, status: "approved" });
}
