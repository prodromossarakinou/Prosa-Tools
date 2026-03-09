import Link from "next/link";

import { siteConfig } from "@/lib/config/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tools/webp-to-png", label: "WebP Tool" },
  { href: "/tools/qr", label: "QR Tool" },
  { href: "/api/health", label: "Health API" },
] as const;

export function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-sm font-medium tracking-wide text-slate-500">{siteConfig.challenge}</p>
          <h1 className="text-xl font-semibold text-slate-900">{siteConfig.name}</h1>
        </div>
        <nav className="flex items-center gap-4 text-sm text-slate-700">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
