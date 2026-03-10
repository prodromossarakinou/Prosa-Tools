import { redirect } from "next/navigation";

import { appRoutes } from "@/lib/config/routes";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextPath = url.searchParams.get("next") ?? appRoutes.basePath;

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect(`${appRoutes.signIn}?authError=Supabase%20environment%20is%20not%20configured`);
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      redirect(`${appRoutes.signIn}?authError=Failed%20to%20exchange%20OAuth%20code`);
    }
  }

  redirect(nextPath);
}
