import { AppShell } from "@/components/layout/app-shell";
import { WebpToPngForm } from "@/features/tools/components/webp-to-png-form";

export default function WebpToPngPage() {
  return (
    <AppShell>
      <section className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Image Tool</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">WebP to PNG</h2>
        <p className="max-w-3xl text-slate-600">
          Free server-side conversion endpoint built into your Next.js backend at <code>/api/webp-to-png</code>.
        </p>
      </section>
      <section className="mt-8 max-w-2xl">
        <WebpToPngForm />
      </section>
    </AppShell>
  );
}
