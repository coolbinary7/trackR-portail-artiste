import { env } from "cloudflare:workers";
import type { ReleaseInput } from "./release-validation";
import { scheduleCheck } from "./release-rules";

export async function validateScheduleAndAssets(email: string, input: ReleaseInput, releaseId?: number): Promise<string | null> {
  const schedule = scheduleCheck(input.date);
  if (!schedule || schedule.businessDays < 0) return "La date de sortie est passée ou invalide.";
  if (schedule.businessDays <= 2) return "Une sortie doit être planifiée plus de 2 jours ouvrés à l’avance.";
  if (schedule.businessDays < 15 && !(input.payload.urgent === true && input.payload.confirmed === true)) {
    return `Il reste ${schedule.businessDays} jour(s) ouvré(s). Cochez les deux confirmations de délai avant de soumettre une demande urgente.`;
  }

  const profile = await env.DB.prepare("SELECT artist_name FROM users WHERE lower(email)=lower(?)").bind(email).first<{ artist_name: string }>();
  const label = profile?.artist_name?.trim() || "";
  const capacity = label
    ? await env.DB.prepare(`SELECT COUNT(*) AS total FROM releases r LEFT JOIN users u ON lower(u.email)=lower(r.owner_email)
        WHERE lower(u.artist_name)=lower(?) AND r.release_date>=? AND r.release_date<? AND r.status<>'rejected' AND (? IS NULL OR r.id<>?)`)
        .bind(label, schedule.weekStart, schedule.weekEnd, releaseId ?? null, releaseId ?? null).first<{ total: number }>()
    : await env.DB.prepare(`SELECT COUNT(*) AS total FROM releases r
        WHERE lower(r.owner_email)=lower(?) AND r.release_date>=? AND r.release_date<? AND r.status<>'rejected' AND (? IS NULL OR r.id<>?)`)
        .bind(email, schedule.weekStart, schedule.weekEnd, releaseId ?? null, releaseId ?? null).first<{ total: number }>();
  if ((capacity?.total || 0) >= 4) return "La capacité de 4 sorties par label et par semaine est atteinte pour cette semaine.";

  if (input.assetKeys.some((key) => !key.startsWith(`${email}/`))) return "Un fichier de la sortie ne vous appartient pas.";
  const rows = await env.DB.prepare(`SELECT object_key,kind,release_id FROM assets WHERE owner_email=? AND object_key IN (${input.assetKeys.map(() => "?").join(",")})`)
    .bind(email, ...input.assetKeys).all<{ object_key: string; kind: string; release_id: number | null }>();
  if (rows.results.length !== input.assetKeys.length) return "Un fichier joint est introuvable ou n’appartient pas à votre espace.";
  const byKey = new Map(rows.results.map((row) => [row.object_key, row]));
  const cover = byKey.get(input.payload.cover);
  if (!cover || cover.kind !== "cover") return "La cover TIFF sélectionnée est introuvable.";
  for (const track of input.payload.tracks as Array<{ master: string }>) {
    const master = byKey.get(track.master);
    if (!master || master.kind !== "master") return "Un master WAV sélectionné est introuvable.";
  }
  if (rows.results.some((row) => row.release_id !== null && row.release_id !== releaseId)) return "Un fichier est déjà rattaché à une autre sortie.";
  return null;
}
