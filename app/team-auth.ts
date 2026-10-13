import { env } from "cloudflare:workers";
import { getChatGPTUser } from "./chatgpt-auth";

export type TeamActor = { email: string; role: "admin" | "staff" };

export async function getActor(request: Request): Promise<{ email: string } | null> {
  const signedIn = await getChatGPTUser();
  if (signedIn?.email) return { email: signedIn.email.trim().toLowerCase() };

  const email = request.headers.get("x-vma-actor-email")?.trim().toLowerCase();
  const timestamp = request.headers.get("x-vma-actor-time") || "";
  const signature = request.headers.get("x-vma-actor-signature") || "";
  const secret = env.VMA_BACKOFFICE_SECRET;
  if (!email || !secret || !/^\d{13}$/.test(timestamp) || !/^[a-f0-9]{64}$/i.test(signature)) return null;
  if (Math.abs(Date.now() - Number(timestamp)) > 5 * 60 * 1000) return null;

  const body = ["GET", "HEAD"].includes(request.method.toUpperCase()) ? new ArrayBuffer(0) : await request.clone().arrayBuffer();
  const bodyHashBytes = new Uint8Array(await crypto.subtle.digest("SHA-256", body));
  const bodyHash = Array.from(bodyHashBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  const requestPath = new URL(request.url).pathname + new URL(request.url).search;
  const canonical = `${email}\n${timestamp}\n${request.method.toUpperCase()}\n${requestPath}\n${bodyHash}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signed = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(canonical)));
  const expected = Array.from(signed, (byte) => byte.toString(16).padStart(2, "0")).join("");
  let mismatch = expected.length ^ signature.length;
  for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ (signature.toLowerCase().charCodeAt(i) || 0);
  return mismatch === 0 ? { email } : null;
}

export async function authorizeTeam(request: Request, adminOnly = false): Promise<{ actor: TeamActor } | { response: Response }> {
  const identity = await getActor(request);
  if (!identity) return { response: Response.json({ error: "Authentification requise." }, { status: 401 }) };
  const user = await env.DB.prepare("SELECT role,status FROM users WHERE lower(email)=?").bind(identity.email).first<{ role: string; status: string }>();
  if (user?.role === "admin" && user.status === "approved") return { actor: { email: identity.email, role: "admin" } };
  if (!adminOnly) {
    const member = await env.DB.prepare("SELECT role FROM team_members WHERE lower(email)=? AND active=1").bind(identity.email).first<{ role: string }>();
    if (member?.role === "staff") return { actor: { email: identity.email, role: "staff" } };
  }
  return { response: Response.json({ error: adminOnly ? "Accès réservé à l’administration." : "Accès réservé à l’équipe trackR." }, { status: 403 }) };
}

export function auditStatement(actor: TeamActor | { email: string; role: string }, action: string, releaseId: number | null, details: Record<string, unknown> = {}, section: string | null = null) {
  const payload = section ? { ...details, section } : details;
  return env.DB.prepare("INSERT INTO activity_log (release_id,actor_email,actor_role,action,details) VALUES (?,?,?,?,?)")
    .bind(releaseId, actor.email, actor.role, action, JSON.stringify(payload));
}

export async function writeAudit(actor: TeamActor | { email: string; role: string }, action: string, releaseId: number | null, details: Record<string, unknown> = {}, section: string | null = null) {
  await auditStatement(actor, action, releaseId, details, section).run();
}
