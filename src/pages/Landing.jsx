import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import VideoStage from "../components/VideoStage";
import { SEED_HEADLINES, SEED_VIDEO } from "../data/seed";

export default function Landing() {
  return (
    <div className="landing">
      <header className="site-top">
        <Brand />
        <Link className="btn btn-primary" to="/app">
          Try the demo
        </Link>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1 className="hero-brand">Lovable Video Ticker</h1>
          <p className="hero-lead">
            A news-style crawl: scrolling headlines along the bottom of your video —
            breaking news, scores, or prices — without covering the whole screen.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary btn-lg" to="/app">
              Open editor
            </Link>
          </div>
        </div>

        <div className="hero-preview">
          <VideoStage
            video={SEED_VIDEO}
            headlines={SEED_HEADLINES}
            label="BREAKING"
            speed={64}
            paused={false}
          />
        </div>
      </section>

      <section className="section how">
        <h2>How it works</h2>
        <p className="section-lead">
          Same pattern you see on TV news and sports broadcasts.
        </p>
        <ol className="steps">
          <li>
            <strong>Pick a background video</strong>
            <span>Any public YouTube link plays full-frame behind the crawl.</span>
          </li>
          <li>
            <strong>Write headline lines</strong>
            <span>They scroll continuously across the bottom strip.</span>
          </li>
          <li>
            <strong>Tune speed &amp; label</strong>
            <span>BREAKING, LIVE, SCORES — pause anytime.</span>
          </li>
        </ol>
      </section>

      <footer className="site-footer">
        <Brand size="sm" />
        <p>Static demo · Free &amp; easy · Classic video crawl</p>
        <Link to="/app">Open the demo →</Link>
      </footer>
    </div>
  );
}
