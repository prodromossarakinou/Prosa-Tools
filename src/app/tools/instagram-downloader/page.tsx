import { AppShell } from "@/components/layout/app-shell";
import { InstagramDownloaderTool } from "@/features/tools/instagram-downloader/components/instagram-downloader-tool";

export default function InstagramDownloaderPage() {
  return (
    <AppShell>
      <section className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Integrated Tool</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Instagram Post/Reel Downloader</h2>
        <p className="max-w-3xl text-slate-600">
          Third-party API integration for resolving downloadable media from public Instagram post and reel URLs.
        </p>
      </section>
      <section className="mt-8 max-w-3xl">
        <InstagramDownloaderTool />
      </section>
    </AppShell>
  );
}
