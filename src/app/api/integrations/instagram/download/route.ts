import { fail, ok } from "@/lib/server/api-response";
import { fetchInstagramMedia } from "@/features/tools/instagram-downloader/lib/instagram-provider";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { url?: string };
    const instagramUrl = payload?.url ?? "";
    console.info("[instagram-download] Incoming request", {
      hasUrl: Boolean(instagramUrl.trim()),
      urlPreview: instagramUrl.slice(0, 120),
    });

    if (!instagramUrl.trim()) {
      return fail("url is required.", 400);
    }

    const result = await fetchInstagramMedia(instagramUrl);

    return ok({
      source: "instagram",
      status: "integrated",
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Instagram integration failed.";
    console.error("[instagram-download] Request failed", {
      message,
      error,
    });
    return fail(message, 400);
  }
}
