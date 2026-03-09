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
- Added tool page: `/tools/qr` with three sections:
  - Generate QR
  - Read from Upload
  - Read from Camera
- Added camera scanning using browser `BarcodeDetector` when supported.

## Architecture Notes
- Server-side decode path is available through image upload endpoint.
- Camera decode is handled client-side for real-time UX and lower latency.
- Tool is integrated into dashboard and navigation as an active feature.

## Outcome
The QR tool now supports both creation and reading workflows, covering upload-based and camera-based usage in a single page.
