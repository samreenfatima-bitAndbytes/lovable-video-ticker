# Lovable Video Ticker — local setup

Vite + React static demo of a **classic video ticker / news crawl**: a continuous scrolling strip of text along the bottom of a video (headlines, scores, prices) — not a carousel of YouTube thumbnails.

## Run locally

```bash
cd local-projects/lovable-video-ticker-static
npm install
npm run dev
```

Open http://127.0.0.1:2130

## What to try

1. Landing preview shows video + bottom crawl.
2. **Open editor** → change YouTube background, crawl label (BREAKING / LIVE…), add/remove headlines.
3. Slow / Normal / Fast controls crawl speed; Pause stops the text.
4. **Reset demo data** restores seed headlines + video.

## Vercel

- Root: this folder
- Build: `npm run build`
- Output: `dist`
