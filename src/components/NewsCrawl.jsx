import { useEffect, useRef, useState } from "react";

/**
 * Classic bottom-of-screen text crawl / news ticker.
 * Duplicates the line for a seamless loop.
 */
export default function NewsCrawl({
  headlines,
  label = "BREAKING",
  speed = 70,
  paused = false,
}) {
  const trackRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !headlines.length) return undefined;

    let raf = 0;
    let x = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(40, now - last);
      last = now;
      if (!paused && !reduceMotion) {
        x -= (speed * dt) / 1000;
        const w = el.scrollWidth / 2;
        if (w > 0 && -x >= w) x += w;
        el.style.transform = `translate3d(${x}px, 0, 0)`;
      } else {
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [headlines, speed, paused, reduceMotion]);

  if (!headlines.length) {
    return (
      <div className="crawl">
        <div className="crawl-label">{label}</div>
        <div className="crawl-viewport">
          <p className="crawl-empty">Add headlines to start the crawl</p>
        </div>
      </div>
    );
  }

  const items = [...headlines, ...headlines];

  return (
    <div className={`crawl${paused || reduceMotion ? " is-paused" : ""}`}>
      <div className="crawl-label">{label}</div>
      <div className="crawl-viewport">
        <div className="crawl-track" ref={trackRef}>
          {items.map((h, i) => (
            <span key={`${h.id}-${i}`} className="crawl-item">
              {h.text}
              <span className="crawl-sep" aria-hidden="true">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
