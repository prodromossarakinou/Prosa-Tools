import { fail } from "@/lib/server/api-response";
import { convertWebpToPng } from "@/features/tools/lib/webp-to-png";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fileEntry = formData.get("file");

    if (!(fileEntry instanceof File)) {
      return fail("Missing file field. Expected form-data key: file", 400);
    }

    const { buffer, outputFileName } = await convertWebpToPng(fileEntry);
    const bytes = new Uint8Array(buffer);

    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename=\"${outputFileName}\"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed.";
    return fail(message, 400);
  }
}
