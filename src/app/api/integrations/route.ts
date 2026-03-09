import { fail, ok } from "@/lib/server/api-response";

export async function GET() {
  return ok({
    message: "Integrations endpoint is available.",
    nextStep: "Implement per-provider handlers under src/server/integrations.",
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    return fail("No integration handlers are implemented yet.", 501, {
      receivedType: typeof payload,
    });
  } catch {
    return fail("Invalid JSON payload.", 400);
  }
}
