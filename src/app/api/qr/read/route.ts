import { fail, ok } from "@/lib/server/api-response";
import { decodeQrFromImage } from "@/features/tools/lib/qr-code";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fileEntry = formData.get("file");

    if (!(fileEntry instanceof File)) {
      return fail("Missing file field. Expected form-data key: file", 400);
    }

    const decoded = await decodeQrFromImage(fileEntry);

    return ok({
      format: "QR_CODE",
      text: decoded.text,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "QR read failed.";
    return fail(message, 400);
  }
}
