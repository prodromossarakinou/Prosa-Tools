export const siteConfig = {
  name: "Prosa's AI Tools",
  description:
    "A growing collection of focused AI-powered tools, built as part of the 100 Days with AI challenge.",
  challenge: "100 Days with AI",
} as const;

export type SiteConfig = typeof siteConfig;
