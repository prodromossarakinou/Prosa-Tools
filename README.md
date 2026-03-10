# 100 Days Challenge — AI-Assisted Software Delivery

Copyright © 2026 Prodromos Sarakinou. All rights reserved.

Owner: Prodromos Sarakinou  
Project Management: Michael  
UI/UX Lead: Alexander

This repository is part of the **100 Days Challenge** model.
The challenge focuses on continuous, daily, measurable delivery using AI-assisted development, strict documentation discipline, and structured progress tracking.

## Challenge Day Progress

Start Date: 09-03-2026  
Challenge Length: 100 days

Current Day: Day 1 / 100 (09-03-2026)

Status: ACTIVE

## Tracking Rules

- Each calendar day must produce at least one meaningful commit.
- Each meaningful commit must have a `_progress/<year-month>/<entry>.md` log file.
- Progress is tracked only under `_progress` for this project.

## Day Log

- Day 1 — Project initialization completed. Next.js baseline architecture, shared app shell, provider baseline, initial tools, and API-first backend flow are active.

## Challenge Model

Duration: 100 consecutive days  
Rule: Every day must produce measurable, documented progress.

Valid daily progress includes:

- Feature delivery
- Bug fixes
- Refactors with behavioral impact
- UI/UX improvements
- Build and dependency stabilization
- Architecture and infrastructure work
- Performance improvements
- Documentation and runbooks
- Progress records

Progress must be commit-backed and logged.

## Project Scope Model

This repository is one project under the challenge and currently focuses on an AI tools platform.

Current scope includes:

- Image and utility tools under one shared application
- SSR-first frontend with Next.js App Router
- Backend route handlers for internal utilities and future integrations
- Scalable per-tool feature architecture
- Integrated 3rd-party API tools when needed (marked as `integrated` in tool registry)

Each project in the challenge must maintain its own:

- README
- Scope
- Acceptance criteria
- Progress history

## Technology Approach (This Project)

- Next.js 16 (App Router, SSR-first)
- TypeScript
- Tailwind CSS v4
- Next.js Route Handlers for backend endpoints
- PostgreSQL when persistence is needed (not mandatory from day 1)
- AI-assisted development workflow

Architecture and technical implementation can differ from other challenge projects.

## Progress Tracking Standard

All meaningful commits must be documented.

Structure:

- `_progress/<YYYY-MM>/<entry>.md`

Monthly summary:

- `_progress/<YYYY-MM>/README.md` (optional)

Rules:

- One progress file per meaningful commit.
- Structured format must be followed (see `_progress/README.md`).
- Documentation for progress lives only under `_progress`.
- History is append-only.

## Integration Configuration (Instagram Downloader)

The Instagram downloader currently uses:

- Primary: `instaloader` (local Python resolver)
- Backup (reel/video): `https://instagram-video-downloader-mu.vercel.app/api/video`

Local requirement:

```bash
python3 -m pip install --user instaloader
```

- No API key is required.
- Optional override:
  - `INSTAGRAM_PROVIDER_URL` (if you want to switch provider endpoint later)
- Provider logic is implemented in:
  - `src/features/tools/instagram-downloader/lib/instagram-provider.ts`

## Definition of Success (Project-Level)

This project is successful within the challenge when:

- Continuous daily progress is maintained
- Setup and run instructions remain reproducible
- Progress remains fully traceable through `_progress`
- Deliverables remain functional and incrementally stable
- Documentation quality supports handover and continuation

## Roles

- Owner — Prodromos Sarakinou — scope authority, copyright holder, final acceptance
- Michael — project management and documentation governance
- Alexander — UI/UX authority and design standards
- Codex (AI pair engineer) — implementation support, refactors, and progress discipline

## Legal Notice

All code, documentation, structures, and specifications in this repository are owned by:

Prodromos Sarakinou

Unauthorized redistribution or reuse outside explicit permission is not allowed.
