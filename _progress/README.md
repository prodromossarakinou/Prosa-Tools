# Progress Tracking Specification

All meaningful commits must be documented in this project.

## Location

Use:

- `_progress/<YYYY-MM>/<entry>.md`

Example:

- `_progress/2026-03/day-01-initialization.md`

## Required Rules

- Create one progress file per meaningful commit.
- Write progress files in English.
- Keep progress history append-only.
- Do not store progress logs outside `_progress`.

## Recommended Entry Format

```md
# Progress Entry

## Date
YYYY-MM-DD

## Commit
<commit-hash-or-pending>

## Summary
Short statement of what changed.

## Delivered
- Item 1
- Item 2

## Notes
Any important constraints, issues, or follow-up points.
```
