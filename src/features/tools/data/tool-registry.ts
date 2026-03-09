import type { ToolDefinition } from "@/features/tools/types";

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
    name: "Data Extractor",
    summary: "Parse unstructured text and export clean JSON for downstream automation.",
    status: "planned",
    category: "Automation",
  },
];
