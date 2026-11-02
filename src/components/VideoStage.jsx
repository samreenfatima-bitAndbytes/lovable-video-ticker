import { embedUrl } from "../data/seed";
import NewsCrawl from "./NewsCrawl";

/** Main video with a news-style text ticker fixed along the bottom edge. */
export default function VideoStage({
  video,
  headlines,
  label,
  speed,
  paused,
}) {
  return (
    <div className="video-stage">
      <div className="video-frame">
        <iframe
          title={video.title || "Background video"}
          src={embedUrl(video.youtubeId)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="video-crawl-slot">
          <NewsCrawl
            headlines={headlines}
            label={label}
            speed={speed}
            paused={paused}
          />
        </div>
      </div>
    </div>
  );
}
