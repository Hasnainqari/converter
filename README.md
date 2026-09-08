# Convertly V2

A production-oriented image tools platform starter.

## Stack
Next.js App Router + TypeScript + React + Sharp + Archiver.

## Features
- Responsive Picflow-inspired independent design
- Dark mode
- Batch upload
- Batch ZIP
- JPG / PNG / WebP / AVIF / TIFF / GIF output
- Quality control
- Maximum width resizing
- SEO landing pages
- sitemap / robots
- Ad-ready slot
- Pricing architecture
- Health endpoint
- Rate-limit/security hardening notes

## Install
```bash
npm install
npm run dev
```

## Production
```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL`.

## HEIC/RAW
Sharp delegates decoding to libvips/codecs in the deployed environment. HEIC/HEIF and RAW support therefore depends on how libvips is built. For guaranteed commercial RAW coverage, use a tested native/WASM decoder pipeline.

## Important production work before launch
1. Add Redis/Cloudflare rate limiting.
2. Add a job queue for very large batches.
3. Add request-body limits at the proxy.
4. Add temporary storage lifecycle deletion if persistence is introduced.
5. Add CSP/HSTS and secure headers.
6. Add auth + Stripe webhook handling for Pro.
7. Add proper progress events (SSE/WebSocket/job polling) for long-running batches. The included UI has per-item progress states but the HTTP conversion endpoint currently completes in one request.
8. Add PDF renderer for Image→PDF.
9. Add real ad-network code only after policy/consent setup.
