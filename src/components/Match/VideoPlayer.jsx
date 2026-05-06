import { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import "./videoplayer.css";

/**
 * Universal Video Player — supports both:
 *   1. HLS streams (.m3u8)  → plays via hls.js
 *   2. Iframe embeds (any URL) → renders in a styled iframe
 *
 * Usage:
 *   <VideoPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
 *   <VideoPlayer src="https://pooembed.eu/embed/mlb/2026-05-05/min-wsh" type="iframe" />
 *
 * The component auto-detects the type from the URL, but you can force it with the `type` prop.
 */
export default function VideoPlayer({ src, poster, title = "Live Stream", type }) {
  // Auto-detect stream type
  const streamType = type || (src?.includes(".m3u8") ? "hls" : "iframe");

  if (!src) {
    return (
      <div className="video-player">
        <div className="video-overlay">
          <p className="video-error-title">No Stream Available</p>
          <p className="video-error-msg">This match doesn't have a stream URL configured.</p>
        </div>
      </div>
    );
  }

  if (streamType === "iframe") {
    return <IframePlayer src={src} title={title} />;
  }

  return <HlsPlayer src={src} poster={poster} title={title} />;
}

/* ═══════════════════════════════════════════════
   IFRAME PLAYER — for embed URLs
   ═══════════════════════════════════════════════ */
function IframePlayer({ src, title }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="video-player">
      {loading && !error && (
        <div className="video-overlay">
          <div className="video-spinner" />
          <p>Loading stream...</p>
        </div>
      )}

      {error && (
        <div className="video-overlay">
          <div className="video-error-icon">⚠️</div>
          <p className="video-error-title">Stream Unavailable</p>
          <p className="video-error-msg">The embed source could not be loaded.</p>
          <button className="video-retry-btn" onClick={() => { setError(false); setLoading(true); }}>
            Retry
          </button>
        </div>
      )}

      <iframe
        className="video-iframe"
        src={src}
        title={title}
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        allow="encrypted-media; picture-in-picture; autoplay"
        onLoad={() => setLoading(false)}
        onError={() => { setLoading(false); setError(true); }}
        style={{ opacity: loading || error ? 0 : 1 }}
      />

      {/* LIVE badge for iframe streams */}
      {!loading && !error && (
        <div className="video-iframe-live">
          <span className="video-live-dot" />
          LIVE
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HLS PLAYER — for .m3u8 streams
   ═══════════════════════════════════════════════ */
function HlsPlayer({ src, poster, title }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) { setStatus("unsupported"); return; }

    if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; }

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setStatus("playing");
        video.play().catch(() => setStatus("playing"));
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setStatus("error");
          setErrorMsg(data.type === Hls.ErrorTypes.NETWORK_ERROR
            ? "Network error — stream may be offline"
            : "Stream playback error");
          hls.destroy();
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        setStatus("playing");
        video.play().catch(() => setStatus("playing"));
      });
      video.addEventListener("error", () => {
        setStatus("error");
        setErrorMsg("Stream playback error");
      });
    } else {
      setStatus("unsupported");
      setErrorMsg("Your browser doesn't support HLS");
    }

    return () => { if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; } };
  }, [src]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (v) { v.muted = !v.muted; setIsMuted(v.muted); }
  };

  const toggleFullscreen = () => {
    const c = videoRef.current?.parentElement;
    if (!c) return;
    document.fullscreenElement ? document.exitFullscreen() : c.requestFullscreen();
  };

  const retry = () => {
    setStatus("loading");
    setErrorMsg("");
    if (hlsRef.current) hlsRef.current.destroy();
    const hls = new Hls();
    hlsRef.current = hls;
    hls.loadSource(src);
    hls.attachMedia(videoRef.current);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      setStatus("playing");
      videoRef.current.play().catch(() => setStatus("playing"));
    });
    hls.on(Hls.Events.ERROR, (_, d) => {
      if (d.fatal) { setStatus("error"); setErrorMsg("Stream offline"); }
    });
  };

  return (
    <div className="video-player">
      <video ref={videoRef} className="video-element" muted={isMuted} autoPlay playsInline poster={poster} title={title} />

      {status === "loading" && (
        <div className="video-overlay">
          <div className="video-spinner" />
          <p>Connecting to stream...</p>
        </div>
      )}

      {status === "error" && (
        <div className="video-overlay">
          <div className="video-error-icon">⚠️</div>
          <p className="video-error-title">Stream Unavailable</p>
          <p className="video-error-msg">{errorMsg}</p>
          <button className="video-retry-btn" onClick={retry}>Retry</button>
        </div>
      )}

      {status === "unsupported" && (
        <div className="video-overlay">
          <p className="video-error-title">No Stream Available</p>
          <p className="video-error-msg">{errorMsg || "No stream configured."}</p>
        </div>
      )}

      {status === "playing" && (
        <div className="video-controls">
          <div className="video-live-indicator">
            <span className="video-live-dot" />
            LIVE
          </div>
          <div className="video-controls-right">
            <button className="video-control-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 010 14.14" />
                  <path d="M15.54 8.46a5 5 0 010 7.07" />
                </svg>
              )}
            </button>
            <button className="video-control-btn" onClick={toggleFullscreen} title="Fullscreen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
