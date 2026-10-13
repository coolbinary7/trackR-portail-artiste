export type FileCheck = { ok: true } | { ok: false; error: string };

function readTiffDimension(view: DataView, little: boolean, entry: number): number | null {
  const type = view.getUint16(entry + 2, little);
  const count = view.getUint32(entry + 4, little);
  if (count < 1) return null;
  if (type === 3 && count === 1) return view.getUint16(entry + 8, little);
  if (type === 4 && count === 1) return view.getUint32(entry + 8, little);
  const offset = view.getUint32(entry + 8, little);
  if (type === 3 && count === 1 && offset + 2 <= view.byteLength) return view.getUint16(offset, little);
  if (type === 4 && count === 1 && offset + 4 <= view.byteLength) return view.getUint32(offset, little);
  return null;
}

export function validateTiff(bytes: ArrayBuffer): FileCheck {
  if (bytes.byteLength < 8) return { ok: false, error: "Le fichier TIFF semble incomplet." };
  const view = new DataView(bytes);
  const marker = String.fromCharCode(view.getUint8(0), view.getUint8(1));
  if (marker !== "II" && marker !== "MM") return { ok: false, error: "Le fichier n’est pas un TIFF valide." };
  const little = marker === "II";
  if (view.getUint16(2, little) !== 42) return { ok: false, error: "Le format TIFF BigTIFF n’est pas pris en charge." };
  const offset = view.getUint32(4, little);
  if (offset + 2 > view.byteLength) return { ok: false, error: "Les dimensions de la cover sont illisibles." };
  const count = view.getUint16(offset, little);
  if (offset + 2 + count * 12 > view.byteLength) return { ok: false, error: "Les dimensions de la cover sont illisibles." };
  let width: number | null = null;
  let height: number | null = null;
  for (let i = 0; i < count; i++) {
    const entry = offset + 2 + i * 12;
    const tag = view.getUint16(entry, little);
    if (tag === 256) width = readTiffDimension(view, little, entry);
    if (tag === 257) height = readTiffDimension(view, little, entry);
  }
  if (width !== 3000 || height !== 3000) return { ok: false, error: `La cover doit mesurer 3000 × 3000 px (fichier reçu : ${width ?? "?"} × ${height ?? "?"}).` };
  return { ok: true };
}

export function validateWav(bytes: ArrayBuffer): FileCheck {
  const view = new DataView(bytes);
  const ascii = (at: number) => at + 4 <= view.byteLength
    ? String.fromCharCode(view.getUint8(at), view.getUint8(at + 1), view.getUint8(at + 2), view.getUint8(at + 3))
    : "";
  if (view.byteLength < 44 || ascii(0) !== "RIFF" || ascii(8) !== "WAVE") return { ok: false, error: "Le fichier n’est pas un WAV RIFF valide." };
  let offset = 12;
  while (offset + 8 <= view.byteLength) {
    const tag = ascii(offset);
    const size = view.getUint32(offset + 4, true);
    if (tag === "fmt ") {
      if (size < 16 || offset + 8 + size > view.byteLength) return { ok: false, error: "L’en-tête audio WAV est incomplet." };
      const format = view.getUint16(offset + 8, true);
      const sampleRate = view.getUint32(offset + 12, true);
      const bits = view.getUint16(offset + 22, true);
      if (![1, 3].includes(format) || sampleRate < 44100 || bits < 16) return { ok: false, error: `Le master doit être en PCM ou WAV float, au minimum 44,1 kHz et 16 bits (reçu : ${sampleRate} Hz / ${bits} bits).` };
      return { ok: true };
    }
    offset += 8 + size + (size % 2);
  }
  return { ok: false, error: "L’en-tête audio WAV est illisible." };
}
