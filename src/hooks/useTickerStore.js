import { useCallback, useEffect, useState } from "react";
import {
  SEED_HEADLINES,
  SEED_VIDEO,
  STORAGE_KEY,
  parseYouTubeId,
} from "../data/seed";

function seedState() {
  return {
    video: { ...SEED_VIDEO },
    headlines: SEED_HEADLINES.map((h) => ({ ...h })),
    label: "BREAKING",
  };
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return seedState();
    return {
      video: parsed.video?.youtubeId ? parsed.video : { ...SEED_VIDEO },
      headlines: Array.isArray(parsed.headlines) && parsed.headlines.length
        ? parsed.headlines
        : SEED_HEADLINES.map((h) => ({ ...h })),
      label: parsed.label || "BREAKING",
    };
  } catch {
    return seedState();
  }
}

export function useTickerStore() {
  const [data, setData] = useState(() => load());
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const notify = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const setVideo = useCallback(
    (url) => {
      const youtubeId = parseYouTubeId(url);
      if (!youtubeId) {
        return { ok: false, error: "Paste a valid YouTube link or video id." };
      }
      setData((d) => ({
        ...d,
        video: { youtubeId, title: `YouTube ${youtubeId}` },
      }));
      notify("Background video updated");
      return { ok: true };
    },
    [notify]
  );

  const setLabel = useCallback((label) => {
    setData((d) => ({ ...d, label: label.trim() || "BREAKING" }));
  }, []);

  const addHeadline = useCallback(
    (text) => {
      const line = String(text || "").trim();
      if (!line) return { ok: false, error: "Enter a headline or score line." };
      const row = { id: `h-${Date.now()}`, text: line };
      setData((d) => ({ ...d, headlines: [...d.headlines, row] }));
      notify("Headline added to crawl");
      return { ok: true };
    },
    [notify]
  );

  const removeHeadline = useCallback(
    (id) => {
      setData((d) => ({
        ...d,
        headlines: d.headlines.filter((h) => h.id !== id),
      }));
      notify("Headline removed");
    },
    [notify]
  );

  const resetDemo = useCallback(() => {
    const fresh = seedState();
    setData(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    notify("Demo restored");
  }, [notify]);

  return {
    ...data,
    toast,
    setVideo,
    setLabel,
    addHeadline,
    removeHeadline,
    resetDemo,
  };
}
