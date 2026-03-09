import { fail } from "@/lib/server/api-response";
import { generateQrPng } from "@/features/tools/qr-generator-reader/lib/qr-code";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { text?: string };
    const text = payload?.text ?? "";
    const png = await generateQrPng(text);

    return new Response(new Uint8Array(png), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="qr-code.png"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "QR generation failed.";
    return fail(message, 400);
  }
}
