# Tool Progress: WebP to PNG

## Status
Active

## Goal
Provide a free and reliable conversion flow from `.webp` to `.png` without requiring external paid APIs.

## Implemented
- Added server conversion utility with validation and filename normalization.
- Added API endpoint: `POST /api/webp-to-png`
- Added UI page: `/tools/webp-to-png`
- Added upload form with automatic PNG download behavior.
- Added validation handling for missing file, unsupported format, and max size.

## Architecture Notes
- Conversion logic is isolated in feature-level backend utility code.
- Route handler remains thin and delegates core logic.
- Endpoint returns binary PNG response with download headers.

## Outcome
The WebP to PNG flow is fully functional end-to-end through both browser UI and API usage.
