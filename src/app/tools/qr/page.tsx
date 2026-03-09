import { AppShell } from "@/components/layout/app-shell";
import { QrTool } from "@/features/tools/qr-generator-reader/components/qr-tool";

export default function QrToolPage() {
  return (
    <AppShell>
      <section className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Image Tool</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">QR Generator and Reader</h2>
        <p className="max-w-3xl text-slate-600">
          Generate QR codes and decode them from uploaded images or live camera scanning.
        </p>
        <p className="max-w-3xl text-sm text-slate-500">
          Camera functionality can be used through Chrome, Edge, Opera, Samsung Internet, and Android WebView.
        </p>
      </section>
      <section className="mt-8">
        <QrTool />
      </section>
    </AppShell>
  );
}
