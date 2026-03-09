import { ok } from "@/lib/server/api-response";

export async function GET() {
  return ok({
    service: "prosa-ai-tools-api",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
}
