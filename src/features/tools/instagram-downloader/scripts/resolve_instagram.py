#!/usr/bin/env python3
import json
import re
import sys

import instaloader


def extract_shortcode(url: str) -> str:
    pattern = re.compile(r"instagram\.com/(?:reel|p|tv)/([^/?#]+)/?", re.IGNORECASE)
    match = pattern.search(url)
    if not match:
        raise ValueError("Could not extract Instagram shortcode from URL.")
    return match.group(1)


def resolve_media(url: str) -> dict:
    shortcode = extract_shortcode(url)

    loader = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        save_metadata=False,
        compress_json=False,
        quiet=True,
    )

    post = instaloader.Post.from_shortcode(loader.context, shortcode)

    media = []

    if post.typename == "GraphSidecar":
        for node in post.get_sidecar_nodes():
            if node.is_video and node.video_url:
                media.append({"url": node.video_url, "type": "video"})
            elif node.display_url:
                media.append({"url": node.display_url, "type": "image"})
    elif post.is_video and post.video_url:
        media.append({"url": post.video_url, "type": "video"})
    elif post.url:
        media.append({"url": post.url, "type": "image"})

    if not media:
        raise ValueError("No downloadable media found for this Instagram URL.")

    return {
        "provider": "instaloader",
        "shortcode": shortcode,
        "media": media,
    }


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: resolve_instagram.py <instagram-url>", file=sys.stderr)
        return 2

    url = sys.argv[1].strip()

    try:
        result = resolve_media(url)
        print(json.dumps(result))
        return 0
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
