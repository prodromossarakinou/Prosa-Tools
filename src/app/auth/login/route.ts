import { redirect } from "next/navigation";

import { appRoutes } from "@/lib/config/routes";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const provider = (url.searchParams.get("provider") ?? "google") as "google";
  const nextPath = url.searchParams.get("next") ?? appRoutes.basePath;

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect(`${appRoutes.signIn}?authError=Supabase%20environment%20is%20not%20configured`);
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${url.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error || !data.url) {
    redirect(`${appRoutes.signIn}?authError=Failed%20to%20start%20OAuth%20flow`);
  }

  redirect(data.url);
}
