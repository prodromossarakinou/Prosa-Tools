# Project Guidelines for Codex (Prosa's AI Tools)

Use these rules for all future edits in this repository to keep implementation quality and architecture consistent.

## 1) Product Context

- Product name: **Prosa's AI Tools**
- Initiative: **100 Days with AI**
- Goal: ship many small, reliable AI tools in one scalable codebase
- Core principle: build incrementally, without architecture rewrites

## 2) Technical Baseline

- Framework: Next.js App Router (SSR-first)
- Language: TypeScript, strict mode
- Backend: Next.js Route Handlers (`src/app/api/*`)
- Data: PostgreSQL only when needed (do not add ORM until required)
- Styling: Tailwind CSS

## 3) Architecture Rules

- Keep `src/app` thin:
  - only routes, layout composition, metadata, and page-level orchestration
- Reusable cross-feature UI belongs in `src/components`
- Feature-specific code belongs in `src/features/<feature-name>`
- For tools, use one folder per tool under `src/features/tools/<tool-name>`
  - Examples:
    - `src/features/tools/qr-generator-reader`
    - `src/features/tools/webp-to-png`
  - Keep each tool self-contained with local `components`, `lib`, and future `types`/`data` if needed
- Use `src/features/tools/shared` only for code used by multiple tools (registry, shared cards, shared types)
- Server-only modules belong in `src/lib/server` (or `src/server` if domain grows)
- Do not place business logic directly inside route handlers or page files
- Create typed modules first, then consume them from routes/pages

## 4) Component and Provider Conventions

- Default to server components
- Add `"use client"` only when browser APIs, event handlers, or client state are required
- Global providers must be wired only in `src/components/providers/app-providers.tsx`
- Keep providers minimal; each new provider must have a clear purpose
- Build reusable components with stable, explicit props

## 5) API and Integration Conventions

- All API responses should use a consistent shape (`success`, `data` or `error`)
- Validate and sanitize all incoming payloads
- Integration endpoints should be deterministic and loggable
- Keep third-party adapter logic isolated from route files
- Never expose secrets in responses or client bundles

## 6) Data and Reliability Rules

- Add persistence only when the feature needs durable state
- Prefer idempotent operations where possible
- Include basic error handling in every route
- Add lightweight health checks for critical services

## 7) Code Quality Rules

- Avoid `any`; define shared types close to their domain
- Keep functions small and focused
- Prefer composition over large utility files
- Do not introduce new dependencies without clear need
- Update documentation when behavior or architecture changes

## 8) Folder and Naming Rules

- Use kebab-case for file names
- Use clear names: `tool-card.tsx`, `tool-registry.ts`, `api-response.ts`
- Do not create ambiguous folders like `helpers` or `misc`
- Group by domain first, then by technical role
- For every new tool, create a dedicated folder first:
  - `src/features/tools/<tool-name>/components`
  - `src/features/tools/<tool-name>/lib`

## 9) Delivery Workflow

For each meaningful feature:

1. Add/update types and domain model
2. Implement server logic (if needed)
3. Add/compose UI components
4. Wire route/page
5. Run lint + build
6. Update README or architecture notes

## 10) Scope Control

- Choose pragmatic, small increments
- Leave explicit TODOs for deferred decisions
- Do not prebuild speculative abstractions
- Keep the app usable at every step
