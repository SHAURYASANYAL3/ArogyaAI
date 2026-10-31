# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of medical information and clinical guidance seriously.
If you discover a security vulnerability or clinical safety loophole, please report it privately:

- **Email**: security@arogyaai.internal (or open a GitHub Security Advisory)
- **Response Target**: Within 48 hours.

## Architectural Security Model

- **Client-Side Privacy**: Medical prescription images and clinical records are processed via client-side memory or encrypted transit directly to Google Gemini Vision OCR. No patient PHI (Protected Health Information) is permanently retained on external intermediate databases.
- **Quota Safeguard**: Local storage persistence employs automatic base64 stripping and quota boundary fallbacks to avoid browser memory denial-of-service.
