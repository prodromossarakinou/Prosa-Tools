# Progress Entry

## Date
2026-03-11

## Commit
pending

## Summary
Hardened authentication flow, enforced dashboard-first routing, and improved responsive behavior across mobile/tablet layouts.

## Delivered
- Added Supabase auth flow with server-side routes and callback handling.
- Added route/session control via `proxy.ts` for signed-in checks and protected access behavior.
- Added dedicated `/sign-in` entry flow with Google OAuth handoff.
- Switched auth env usage to server-side variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).
- Added explicit environment-file handling policy to project guidelines.
- Refined dashboard-first navigation:
  - Header now keeps only dashboard navigation
  - Root `/` redirects to `/dashboard`
  - Centralized route constants in shared config
- Improved responsive UI behavior for:
  - app shell/header
  - tools overview
  - WebP tool
  - Instagram downloader tool
  - QR tool controls and modal scaling

## Notes
A lint warning remains for `<img>` usage in QR preview modal (non-blocking). Functional checks pass.
