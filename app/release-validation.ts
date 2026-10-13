import { parseReleaseDate } from "./release-rules";

export type ReleaseInput = {
  title: string;
  type: "Single" | "EP" | "Album";
  date: string;
  timingStatus: string;
  payload: Record<string, any>;
  assetKeys: string[];
};

export function validateReleaseInput(value: unknown): { input?: ReleaseInput; error?: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Données de sortie invalides." };
  const body = value as Record<string, any>;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const type = body.type;
  const date = body.date;
  const payload = body.payload;
  if (!title || title.length > 200) return { error: "Le titre du projet est obligatoire et limité à 200 caractères." };
  if (!["Single", "EP", "Album"].includes(type)) return { error: "Le format de sortie est invalide." };
  if (!parseReleaseDate(date)) return { error: "Choisissez une date de sortie valide." };
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return { error: "Les informations de la sortie sont invalides." };
  if (JSON.stringify(payload).length > 200_000) return { error: "Le dossier dépasse la taille autorisée." };
  const artists = Array.isArray(payload.artists) ? payload.artists : [];
  const tracks = Array.isArray(payload.tracks) ? payload.tracks : [];
  if (artists.length < 1 || artists.length > 20 || artists.some((artist: any) => typeof artist?.name !== "string" || !artist.name.trim())) {
    return { error: "Renseignez au moins un artiste principal." };
  }
  const expectedTracks = type === "Single" ? [1, 1] : [2, 50];
  if (tracks.length < expectedTracks[0] || tracks.length > expectedTracks[1]) return { error: type === "Single" ? "Un single doit contenir une piste." : "Un EP ou album doit contenir entre 2 et 50 pistes." };
  const artistNames = new Set(artists.map((artist: any) => artist.name.trim().toLocaleLowerCase()));
  if (tracks.some((track: any) => typeof track?.title !== "string" || !track.title.trim() || typeof track?.main !== "string" || !artistNames.has(track.main.trim().toLocaleLowerCase()) || typeof track?.master !== "string" || !track.master || track.master.includes("Envoi"))) {
    return { error: "Chaque piste doit avoir un titre, un artiste principal déclaré et un master WAV envoyé." };
  }
  const creditRoles = ["beatmakers", "sessionArtists", "authors", "composers"] as const;
  const creditsAreValid = tracks.every((track: any) => {
    if (track.credits == null) return true;
    if (typeof track.credits !== "object" || Array.isArray(track.credits)) return false;
    return creditRoles.every((role) => {
      const credits = track.credits[role];
      if (credits == null) return true;
      if (!Array.isArray(credits) || credits.length > 30) return false;
      return credits.every((credit: any) => typeof credit?.name === "string" && credit.name.trim().length > 0 && credit.name.trim().length <= 120
        && (role !== "sessionArtists" || credit.instrument == null || (typeof credit.instrument === "string" && credit.instrument.trim().length <= 80)));
    });
  });
  if (!creditsAreValid) return { error: "Vérifiez les crédits de chaque piste : noms et instruments sont limités en longueur." };
  const cover = typeof payload.cover === "string" ? payload.cover : "";
  if (!cover || cover.includes("Envoi")) return { error: "Ajoutez une cover TIFF avant d’envoyer le dossier." };
  const keys = [cover, ...tracks.map((track: any) => track.master)];
  if (keys.some((key) => key.length > 500)) return { error: "Référence de fichier invalide." };
  return {
    input: {
      title,
      type,
      date,
      timingStatus: typeof body.timingStatus === "string" ? body.timingStatus.slice(0, 80) : "À confirmer",
      payload,
      assetKeys: [...new Set(keys)],
    },
  };
}
