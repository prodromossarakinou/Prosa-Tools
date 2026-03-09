import sharp from "sharp";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export type ConvertWebpResult = {
  buffer: Buffer;
  outputFileName: string;
};

export function validateWebpUpload(file: File) {
  if (!file) {
    throw new Error("No file received.");
  }

  if (!file.type.includes("webp") && !file.name.toLowerCase().endsWith(".webp")) {
    throw new Error("Only .webp files are supported.");
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("File is too large. Maximum size is 10MB.");
  }
}

export async function convertWebpToPng(file: File): Promise<ConvertWebpResult> {
  validateWebpUpload(file);

  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const outputBuffer = await sharp(inputBuffer).png({ compressionLevel: 9 }).toBuffer();

  const baseName = file.name.replace(/\.webp$/i, "").replace(/[^a-zA-Z0-9-_]/g, "-") || "image";

  return {
    buffer: outputBuffer,
    outputFileName: `${baseName}.png`,
  };
}
