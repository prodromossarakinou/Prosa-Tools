# Tool Progress: QR Generator and Reader

## Status
Active

## Goal
Deliver a complete QR workflow with:
- QR code generation from text
- QR decoding from uploaded image
- QR decoding from live camera scan

## Implemented
- Added API endpoint: `POST /api/qr/generate` (returns QR PNG).
- Added API endpoint: `POST /api/qr/read` (decodes uploaded image and returns text).
- Added feature utility for generation and decode logic.
- Added tool page: `/tools/qr` with generation and guided read flow.
- Added camera scanning using browser `BarcodeDetector` when supported.
- Added guided read experience:
  - Step 1: `Choose: Camera or File`
  - Step 2: Execute selected action
  - Completion action: `Continue` to restart flow
- Added `Cancel` actions for both file and camera modes.
- Added camera browser support note under the tool title.
- Changed QR generation UX to open a popup preview modal, then download from inside the modal.

## Architecture Notes
- Server-side decode path is available through image upload endpoint.
- Camera decode is handled client-side for real-time UX and lower latency.
- Tool is integrated into dashboard and navigation as an active feature.
- Tool source is isolated under `src/features/tools/qr-generator-reader`.

## Outcome
The QR tool now supports both creation and reading workflows, covering upload-based and camera-based usage in a single page.
