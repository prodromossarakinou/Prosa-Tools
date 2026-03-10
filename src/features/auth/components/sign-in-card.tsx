"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function SignInCard() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/dashboard";
  const loginHref = `/auth/login?provider=google&next=${encodeURIComponent(nextPath)}`;

  return (
    <section className="mx-auto max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Sign in required</h2>
      <p className="text-sm text-slate-600">Please sign in with Google to continue.</p>
      <Link href={loginHref} className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
        Continue with Google
      </Link>
    </section>
  );
}
