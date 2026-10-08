import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FONTS_DIR = join(dirname(fileURLToPath(import.meta.url)), "../styles/fonts");

type OgFont = {
  name: string;
  data: Buffer;
  style: "normal";
  weight: 400 | 600;
};

/** Satori needs the faces as buffers, not as a stylesheet. */
export async function loadOgFonts(): Promise<OgFont[]> {
  const [regular, semibold] = await Promise.all([
    readFile(join(FONTS_DIR, "inter-regular.ttf")),
    readFile(join(FONTS_DIR, "inter-semibold.ttf")),
  ]);

  return [
    { name: "Inter", data: regular, style: "normal", weight: 400 },
    { name: "Inter", data: semibold, style: "normal", weight: 600 },
  ];
}
