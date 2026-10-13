import { env } from "cloudflare:workers";
import { auditStatement, authorizeTeam } from "../../../../team-auth";

export async function GET(request: Request) {
  const access = await authorizeTeam(request, true);
  if ("response" in access) return access.response;
  const members = await env.DB.prepare("SELECT id,email,display_name,role,active,invited_by_email,created_at FROM team_members ORDER BY active DESC,created_at DESC").all();
  return Response.json({ members: members.results });
}

export async function POST(request: Request) {
  const access = await authorizeTeam(request, true);
  if ("response" in access) return access.response;
  const body = await request.json().catch(() => ({})) as { email?: string; displayName?: string };
  const email = body.email?.trim().toLowerCase() || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return Response.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO team_members (email,display_name,role,active,invited_by_email) VALUES (?,?, 'staff',1,?)
      ON CONFLICT(email) DO UPDATE SET display_name=excluded.display_name,active=1`).bind(email, body.displayName?.trim().slice(0,120) || "", access.actor.email),
    auditStatement(access.actor, "team.member_added", null, { email }),
  ]);
  return Response.json({ ok: true }, { status: 201 });
}

export async function PATCH(request: Request) {
  const access = await authorizeTeam(request, true);
  if ("response" in access) return access.response;
  const body = await request.json().catch(() => ({})) as { email?: string; active?: boolean };
  const email = body.email?.trim().toLowerCase() || "";
  if (!email || typeof body.active !== "boolean") return Response.json({ error: "Paramètres invalides." }, { status: 400 });
  await env.DB.batch([
    env.DB.prepare("UPDATE team_members SET active=? WHERE lower(email)=?").bind(body.active ? 1 : 0, email),
    auditStatement(access.actor, body.active ? "team.member_activated" : "team.member_deactivated", null, { email }),
  ]);
  return Response.json({ ok: true });
}
