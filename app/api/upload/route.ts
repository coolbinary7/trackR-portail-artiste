import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../chatgpt-auth";
import { validateTiff, validateWav } from "../../file-validation";

export async function POST(request: Request) {
  const identity = await getChatGPTUser();
  if (!identity || !request.body) return Response.json({ error: "Non authentifié ou fichier absent" }, { status: 401 });
  const account = await env.DB.prepare("SELECT status FROM users WHERE lower(email)=lower(?)").bind(identity.email).first<{ status: string }>();
  if (account?.status !== "approved") return Response.json({ error: "Votre espace doit être validé avant de déposer un fichier." }, { status: 403 });
  const kind = request.headers.get("x-asset-kind");
  if (kind !== "cover" && kind !== "master") return Response.json({ error: "Type de fichier non pris en charge." }, { status: 400 });
  let decodedName = "fichier";
  try { decodedName = decodeURIComponent(request.headers.get("x-file-name") || "fichier"); } catch {}
  const filename = decodedName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-180);
  const isTiffName = /\.tiff?$/i.test(filename);
  const isWavName = /\.wav$/i.test(filename);
  if (kind === "cover" && !isTiffName) return Response.json({ error: "La cover doit être fournie au format TIFF." }, { status: 400 });
  if (kind === "master" && !isWavName) return Response.json({ error: "Le master doit être fourni au format WAV." }, { status: 400 });
  const maxSize = kind === "cover" ? 80_000_000 : 1_000_000_000;
  const hintedSize = Number(request.headers.get("content-length") || 0);
  if (hintedSize > maxSize) return Response.json({ error: "Fichier trop volumineux." }, { status: 413 });

  const key = `${identity.email}/${crypto.randomUUID()}-${filename}`;
  const contentType = kind === "cover" ? "image/tiff" : "audio/wav";
  await env.BUCKET.put(key, request.body, { httpMetadata: { contentType }, customMetadata: { owner: identity.email, kind } });
  const head = await env.BUCKET.head(key);
  if (!head || head.size > maxSize) {
    await env.BUCKET.delete(key);
    return Response.json({ error: "Fichier trop volumineux ou incomplet." }, { status: 413 });
  }
  const prefix = await env.BUCKET.get(key, { range: { offset: 0, length: 262_144 } });
  const checked = prefix
    ? kind === "cover" ? validateTiff(await prefix.arrayBuffer()) : validateWav(await prefix.arrayBuffer())
    : { ok: false as const, error: "Impossible de vérifier le fichier reçu." };
  if (!checked.ok) {
    await env.BUCKET.delete(key);
    return Response.json({ error: checked.error }, { status: 400 });
  }
  try {
    await env.DB.batch([
      env.DB.prepare("INSERT INTO assets (owner_email,kind,object_key,filename,content_type,size) VALUES (?,?,?,?,?,?)")
        .bind(identity.email, kind, key, filename, contentType, head.size),
      env.DB.prepare("INSERT INTO activity_log (actor_email,actor_role,action,details) VALUES (?,?,?,?)")
        .bind(identity.email, "artist", "asset.uploaded", JSON.stringify({ kind, filename, size: head.size })),
    ]);
  } catch (error) {
    await env.BUCKET.delete(key);
    throw error;
  }
  return Response.json({ key, filename, size: head.size, kind });
}
