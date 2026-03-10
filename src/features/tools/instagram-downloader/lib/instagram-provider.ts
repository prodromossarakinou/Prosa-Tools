import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);
const SUPPORTED_HOSTS = ["instagram.com", "www.instagram.com"];
const REEL_BACKUP_PROVIDER = "https://instagram-video-downloader-mu.vercel.app/api/video";

type ProviderMediaType = "video" | "image" | "unknown";

type InstaloaderResponse = {
  provider: string;
  shortcode: string;
  media: Array<{
    url: string;
    type: ProviderMediaType;
  }>;
};

export type ProviderMedia = {
  url: string;
  type: ProviderMediaType;
};

export type InstagramProviderResult = {
  media: ProviderMedia[];
  provider: string;
};

function ensureInstagramUrl(rawUrl: string) {
  let parsed: URL;

  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    throw new Error("Invalid URL format.");
  }

  if (!SUPPORTED_HOSTS.includes(parsed.hostname)) {
    throw new Error("Only instagram.com URLs are supported.");
  }

  return parsed.toString();
}

function uniqueMedia(media: ProviderMedia[]) {
  const seen = new Set<string>();
  return media.filter((item) => {
    if (seen.has(item.url)) {
      return false;
    }

    seen.add(item.url);
    return true;
  });
}

function collectMedia(payload: unknown, bucket: ProviderMedia[] = []): ProviderMedia[] {
  if (!payload) {
    return bucket;
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      collectMedia(item, bucket);
    }
    return bucket;
  }

  if (typeof payload !== "object") {
    return bucket;
  }

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string" && value.startsWith("http")) {
      if (/(\.mp4|\.jpg|\.jpeg|\.png|\.webp)(\?|$)/i.test(value) || key.toLowerCase().includes("url")) {
        bucket.push({
          url: value,
          type: value.toLowerCase().includes(".mp4") ? "video" : "image",
        });
      }
    } else {
      collectMedia(value, bucket);
    }
  }

  return bucket;
}

async function fetchFromInstaloader(normalizedUrl: string): Promise<InstagramProviderResult> {
  const scriptPath = path.join(
    process.cwd(),
    "src",
    "features",
    "tools",
    "instagram-downloader",
    "scripts",
    "resolve_instagram.py",
  );

  try {
    const { stdout, stderr } = await execFileAsync("python3", [scriptPath, normalizedUrl], {
      timeout: 30000,
      maxBuffer: 1024 * 1024,
    });

    if (stderr?.trim()) {
      console.warn("[instagram-provider] instaloader stderr", { stderr: stderr.slice(0, 500) });
    }

    const payload = JSON.parse(stdout) as InstaloaderResponse;

    if (!Array.isArray(payload.media) || !payload.media.length) {
      throw new Error("Instaloader returned no media.");
    }

    return {
      media: uniqueMedia(payload.media),
      provider: payload.provider || "instaloader",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Instaloader failed: ${message}`);
  }
}

async function fetchFromReelBackup(normalizedUrl: string): Promise<InstagramProviderResult> {
  const endpoint = new URL(REEL_BACKUP_PROVIDER);
  endpoint.searchParams.set("postUrl", normalizedUrl);

  const response = await fetch(endpoint.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const rawBody = await response.text();

  if (!response.ok) {
    throw new Error(`Backup provider failed with status ${response.status}.`);
  }

  let payload: unknown = null;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    throw new Error("Backup provider did not return JSON.");
  }

  const media = uniqueMedia(collectMedia(payload));
  if (!media.length) {
    throw new Error("Backup provider returned no media.");
  }

  return {
    media,
    provider: REEL_BACKUP_PROVIDER,
  };
}

export async function fetchInstagramMedia(instagramUrl: string): Promise<InstagramProviderResult> {
  const normalizedUrl = ensureInstagramUrl(instagramUrl);

  try {
    return await fetchFromInstaloader(normalizedUrl);
  } catch (primaryError) {
    console.error("[instagram-provider] Instaloader failed, trying reel backup", {
      message: primaryError instanceof Error ? primaryError.message : String(primaryError),
    });
    return fetchFromReelBackup(normalizedUrl);
  }
}
