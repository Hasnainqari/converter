import sharp from "sharp";
const map: Record<string, string> = {
  jpg: "jpeg",
  png: "png",
  webp: "webp",
  avif: "avif",
  tiff: "tiff",
  gif: "gif",
};
export async function convertImage(
  input: Buffer,
  format: string,
  quality: number,
  width?: number,
) {
  const f = map[format] || "webp";
  let im = sharp(input, { failOn: "none", limitInputPixels: 268402689 });
  if (width) im = im.resize({ width, withoutEnlargement: true });
  if (f === "jpeg") im = im.jpeg({ quality, mozjpeg: true });
  else if (f === "png") im = im.png({ compressionLevel: 9 });
  else if (f === "webp") im = im.webp({ quality });
  else if (f === "avif") im = im.avif({ quality, effort: 5 });
  else if (f === "tiff") im = im.tiff({ quality });
  else im = im.gif();
  return im.toBuffer();
}
