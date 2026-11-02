import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import VideoStage from "../components/VideoStage";
import { useTickerStore } from "../hooks/useTickerStore";

const SPEEDS = [
  { label: "Slow", value: 40 },
  { label: "Normal", value: 70 },
  { label: "Fast", value: 110 },
];

export default function TickerApp() {
  const {
    video,
    headlines,
    label,
    toast,
    setVideo,
    setLabel,
    addHeadline,
    removeHeadline,
    resetDemo,
  } = useTickerStore();

  const [speed, setSpeed] = useState(70);
  const [paused, setPaused] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoError, setVideoError] = useState("");
  const [headline, setHeadline] = useState("");
  const [headlineError, setHeadlineError] = useState("");
  const [labelDraft, setLabelDraft] = useState(label);

  useEffect(() => {
    setLabelDraft(label);
  }, [label]);

  const onSetVideo = (e) => {
    e.preventDefault();
    setVideoError("");
    const result = setVideo(videoUrl);
    if (!result.ok) {
      setVideoError(result.error);
      return;
    }
    setVideoUrl("");
  };

  const onAddHeadline = (e) => {
    e.preventDefault();
    setHeadlineError("");
    const result = addHeadline(headline);
    if (!result.ok) {
      setHeadlineError(result.error);
      return;
    }
    setHeadline("");
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <Brand />
        <div className="topbar-actions">
          <button type="button" className="btn btn-ghost" onClick={resetDemo}>
            Reset demo data
          </button>
          <Link className="btn btn-ghost" to="/">
            Home
          </Link>
        </div>
      </header>

      <main className="app-main app-main-wide">
        <div className="editor-stage">
          <div className="stage-toolbar">
            <div>
              <p className="stage-kicker">Live preview</p>
              <h1>Your video + bottom crawl</h1>
            </div>
            <div className="stage-controls">
              <div className="seg" role="group" aria-label="Crawl speed">
                {SPEEDS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    className={speed === s.value ? "is-active" : ""}
                    onClick={() => setSpeed(s.value)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={`btn ${paused ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? "Resume crawl" : "Pause crawl"}
              </button>
            </div>
          </div>

          <VideoStage
            video={video}
            headlines={headlines}
            label={label}
            speed={speed}
            paused={paused}
          />
        </div>

        <div className="app-grid">
          <section className="panel">
            <h2>Background video</h2>
            <p className="muted panel-lead">
              Playing now: <strong>{video.title}</strong>
            </p>
            <form className="stack-form" onSubmit={onSetVideo}>
              <label>
                YouTube link
                <input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=…"
                  required
                />
              </label>
              {videoError ? <p className="error">{videoError}</p> : null}
              <button type="submit" className="btn btn-primary">
                Set video
              </button>
            </form>
          </section>

          <section className="panel">
            <h2>Crawl label</h2>
            <p className="muted panel-lead">
              The red badge on the left of the ticker (BREAKING, LIVE, SCORES…).
            </p>
            <form
              className="stack-form"
              onSubmit={(e) => {
                e.preventDefault();
                setLabel(labelDraft);
              }}
            >
              <label>
                Label text
                <input
                  value={labelDraft}
                  onChange={(e) => setLabelDraft(e.target.value)}
                  maxLength={16}
                  placeholder="BREAKING"
                />
              </label>
              <button type="submit" className="btn btn-ghost">
                Update label
              </button>
            </form>
          </section>

          <section className="panel panel-span">
            <h2>Headlines in the crawl</h2>
            <p className="muted panel-lead">
              Each line scrolls across the bottom of the video.
            </p>
            <form className="stack-form headline-form" onSubmit={onAddHeadline}>
              <label>
                New headline
                <input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Stocks climb as investors eye rate decision"
                  required
                />
              </label>
              {headlineError ? <p className="error">{headlineError}</p> : null}
              <button type="submit" className="btn btn-primary">
                Add to crawl
              </button>
            </form>

            {headlines.length === 0 ? (
              <p className="muted">No headlines yet.</p>
            ) : (
              <ul className="headline-list">
                {headlines.map((h) => (
                  <li key={h.id}>
                    <span>{h.text}</span>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => removeHeadline(h.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}
