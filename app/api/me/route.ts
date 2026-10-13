import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../chatgpt-auth";

const INITIAL_ADMINS = new Set(["siacedrick@gmail.com"]);

export async function GET() {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error: "Non authentifié" }, { status: 401 });
  const existing = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(identity.email).first();
  if (existing) return Response.json({ user: existing });
  if (INITIAL_ADMINS.has(identity.email.toLowerCase())) {
    await env.DB.prepare("INSERT INTO users (email,name,status,role) VALUES (?,?,?,?)").bind(identity.email, identity.displayName, "approved", "admin").run();
    return Response.json({ user: { email: identity.email, name: identity.displayName, status: "approved", role: "admin" } });
  }
  return Response.json({ user: { email: identity.email, name: identity.displayName, status: "not_started", role: "user" } });
}
