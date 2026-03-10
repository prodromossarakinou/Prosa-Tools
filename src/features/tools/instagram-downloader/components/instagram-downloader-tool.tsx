"use client";

import { useState } from "react";

type MediaItem = {
  url: string;
  type: "video" | "image" | "unknown";
};

type ApiSuccess = {
  success: true;
  data: {
    source: string;
    status: "integrated";
    provider: string;
    media: MediaItem[];
  };
};

type ApiError = {
  success: false;
  error?: {
    message?: string;
  };
};

export function InstagramDownloaderTool() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMedia([]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/integrations/instagram/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const payload = (await response.json()) as ApiSuccess | ApiError;

      if (!response.ok || !payload.success) {
        const message = "error" in payload ? payload.error?.message : undefined;
        throw new Error(message ?? "Failed to resolve downloadable media.");
      }

      setMedia(payload.data.media);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Instagram Downloader</h3>
        <p className="text-sm text-slate-600">
          Paste an Instagram post or reel URL and resolve downloadable media through the integrated third-party API.
        </p>
        <input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://www.instagram.com/reel/..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoading ? "Resolving..." : "Fetch Media"}
        </button>
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}
      </form>

      {media.length ? (
        <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h4 className="text-base font-semibold text-slate-900">Resolved Media</h4>
          <ul className="space-y-3">
            {media.map((item, index) => (
              <li key={`${item.url}-${index}`} className="rounded-md border border-slate-200 p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{item.type}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block break-all text-sm text-slate-800 underline"
                >
                  {item.url}
                </a>
                <a
                  href={item.url}
                  download
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 inline-flex rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
