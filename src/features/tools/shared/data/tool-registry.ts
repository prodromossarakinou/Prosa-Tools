import type { ToolDefinition } from "@/features/tools/shared/types";

export const toolRegistry: ToolDefinition[] = [
  {
    id: "tool-01",
    name: "WebP to PNG",
    summary: "Convert images with predictable quality settings and workflow-safe naming.",
    status: "active",
    category: "Image",
    href: "/tools/webp-to-png",
  },
  {
    id: "tool-02",
    name: "QR Generator and Reader",
    summary: "Generate QR images and decode QR codes from uploads or camera scan.",
    status: "active",
    category: "Image",
    href: "/tools/qr",
  },
  {
    id: "tool-03",
    name: "Instagram Post/Reel Downloader",
    summary: "Download media from Instagram URLs through an integrated third-party provider.",
    status: "active",
    isIntegrated: true,
    category: "Media",
    href: "/tools/instagram-downloader",
  },
];
