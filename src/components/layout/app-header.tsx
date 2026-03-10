import Link from "next/link";

import { siteConfig } from "@/lib/config/site";
import { appRoutes } from "@/lib/config/routes";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const links = [
  { href: appRoutes.basePath, label: "Dashboard" },
] as const;

export async function AppHeader() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-slate-500">{siteConfig.challenge}</p>
          <h1 className="text-xl font-semibold text-slate-900">{siteConfig.name}</h1>
        </div>
        <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
          <div className="w-full overflow-x-auto md:w-auto">
            <nav className="flex min-w-max items-center gap-4 whitespace-nowrap text-sm text-slate-700">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-slate-950">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          {user ? (
            <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-end">
              <p className="max-w-40 truncate text-xs text-slate-500 sm:max-w-44">{user.email}</p>
              <Link
                href={appRoutes.signOut}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700"
              >
                Sign out
              </Link>
            </div>
          ) : (
            <Link
              href={appRoutes.signIn}
              className="w-fit rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white md:self-end"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
