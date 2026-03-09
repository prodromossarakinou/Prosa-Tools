import jsQR from "jsqr";
import QRCode from "qrcode";
import sharp from "sharp";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export type DecodedQrResult = {
  text: string;
};

export async function generateQrPng(text: string) {
  if (!text.trim()) {
    throw new Error("Text is required.");
  }

  return QRCode.toBuffer(text, {
    type: "png",
    errorCorrectionLevel: "M",
    margin: 1,
    width: 512,
  });
}

export async function decodeQrFromImage(file: File): Promise<DecodedQrResult> {
  if (!file) {
    throw new Error("No file received.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are supported.");
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("File is too large. Maximum size is 10MB.");
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgbaPixels = new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength);
  const decoded = jsQR(rgbaPixels, info.width, info.height);

  if (!decoded?.data) {
    throw new Error("No QR code detected in the uploaded image.");
  }

  return { text: decoded.data };
}
