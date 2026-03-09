"use client";

import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  // Add global providers here (auth, analytics, query client, feature flags).
  return <>{children}</>;
}
