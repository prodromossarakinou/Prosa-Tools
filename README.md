# Prosa's AI Tools

A modular Next.js platform for building and shipping multiple AI-powered tools over time.
This is part of the **100 Days with AI** challenge.

## Current Stack

- Frontend: Next.js (App Router, SSR-first)
- Backend: Next.js Route Handlers (API layer for third-party integrations)
- Database: PostgreSQL (when needed, not wired yet)
- Language: TypeScript
- Styling: Tailwind CSS v4

## Project Structure

```text
src
├── app
│   ├── api
│   │   ├── health/route.ts
│   │   ├── integrations/route.ts
│   │   ├── qr/generate/route.ts
│   │   ├── qr/read/route.ts
│   │   └── webp-to-png/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── layout
│   └── providers
├── features
│   └── tools
│       ├── qr-generator-reader
│       │   ├── components
│       │   └── lib
│       ├── webp-to-png
│       │   ├── components
│       │   └── lib
│       └── shared
│           ├── components
│           ├── data
│           └── types.ts
└── lib
    ├── config
    └── server
```

## Architecture Guidelines

- Keep `app/` focused on routing and page composition only.
- Put reusable UI in `src/components`.
- Put feature-specific UI and domain logic in `src/features/<feature>`.
- For tools, keep one folder per tool under `src/features/tools/<tool-name>` (e.g. `qr-generator-reader`, `webp-to-png`).
- Keep shared multi-tool code under `src/features/tools/shared`.
- Put server-only utilities in `src/lib/server`.
- Use route handlers in `src/app/api/*` as stable integration entry points.
- Prefer server components by default; use client components only when interactivity requires it.
- Introduce providers in `src/components/providers/app-providers.tsx` and keep them centralized.

## Backend Direction

- `/api/health` is a basic operational check endpoint.
- `/api/integrations` is the entry point placeholder for third-party connectors.
- `/api/webp-to-png` performs free, server-side WebP to PNG conversion.
- `/api/qr/generate` creates QR PNG files from text input.
- `/api/qr/read` decodes QR values from uploaded images.
- When integrations grow, add provider modules under a dedicated server folder (for example `src/server/integrations`).

## Scripts

- `npm run dev`: run local development server
- `npm run lint`: run lint checks
- `npm run build`: production build validation
- `npm run start`: run production server

## Next Steps

1. Define a PostgreSQL strategy (Prisma or Drizzle) once persistent data is needed.
2. Add auth and analytics providers in `app-providers.tsx`.
3. Add integration adapters under `/api/integrations` when external providers are introduced.
