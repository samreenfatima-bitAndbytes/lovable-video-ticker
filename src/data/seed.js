/** Demo: one background video + scrolling text crawl (classic news ticker). */

export const SEED_VIDEO = {
  youtubeId: "LXb3EKWsInQ",
  title: "Costa Rica in 4K",
};

export const SEED_HEADLINES = [
  {
    id: "h1",
    text: "Breaking: Markets open higher as tech leads early gains",
  },
  {
    id: "h2",
    text: "Local crews clear coastal roads after overnight storms",
  },
  {
    id: "h3",
    text: "Live score update — City 2, United 1 in the 78th minute",
  },
  {
    id: "h4",
    text: "Weather: Clear skies this afternoon, highs near 24°C",
  },
  {
    id: "h5",
    text: "Tip: Add your own headlines below — they crawl across the video",
  },
];

export const STORAGE_KEY = "lovable_ticker_crawl_v1";

export function embedUrl(youtubeId, { autoplay = true } = {}) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    controls: "1",
  });
  if (autoplay) params.set("autoplay", "0");
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

export function thumbUrl(youtubeId) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function parseYouTubeId(input) {
  const raw = String(input || "").trim();
  if (!raw) return null;
  if (/^[\w-]{11}$/.test(raw)) return raw;
  try {
    const u = new URL(raw);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      const embedIdx = parts.indexOf("embed");
      if (embedIdx >= 0 && parts[embedIdx + 1] && /^[\w-]{11}$/.test(parts[embedIdx + 1])) {
        return parts[embedIdx + 1];
      }
      const shortsIdx = parts.indexOf("shorts");
      if (shortsIdx >= 0 && parts[shortsIdx + 1] && /^[\w-]{11}$/.test(parts[shortsIdx + 1])) {
        return parts[shortsIdx + 1];
      }
    }
  } catch {
    /* not a URL */
  }
  return null;
}
