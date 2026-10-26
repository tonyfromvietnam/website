"use client";
import { useEffect, useRef, useState } from "react";
import { Controls, PlayGlyph } from "./Controls";

// YouTube's official IFrame API with its own controls off: our poster, buttons and seek bar sit on top,
// and a click layer over the video keeps YouTube's hover title and "more videos" panels from showing.
let api;
const loadApi = () => api ??= new Promise((resolve) => {
  if (window.YT?.Player) return resolve(window.YT);
  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(window.YT); };
  const s = document.createElement("script");
  s.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(s);
});

export default function YouTubePlayer({ id, title, channel }) {
  const wrap = useRef(null), host = useRef(null), player = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState({ now: 0, total: 0 });

  useEffect(() => {
    if (!started) return;
    let timer, gone = false;
    loadApi().then((YT) => {
      if (gone) return;
      player.current = new YT.Player(host.current, {
        videoId: id, host: "https://www.youtube-nocookie.com", width: "100%", height: "100%",
        playerVars: { autoplay: 1, controls: 0, rel: 0, playsinline: 1, iv_load_policy: 3, disablekb: 1, fs: 0 },
        events: {
          onReady: (e) => e.target.playVideo(),
          onStateChange: (e) => setPlaying(e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.BUFFERING),
        },
      });
      timer = setInterval(() => {
        const p = player.current;
        if (p?.getDuration) setTime({ now: p.getCurrentTime(), total: p.getDuration() });
      }, 250);
    });
    return () => { gone = true; clearInterval(timer); player.current?.destroy?.(); player.current = null; };
  }, [started, id]);

  const p = player.current;
  const toggle = () => (playing ? p?.pauseVideo() : p?.playVideo());
  const mute = () => { if (!p) return; muted ? p.unMute() : p.mute(); setMuted(!muted); };
  const seek = (t) => { p?.seekTo(t, true); setTime((x) => ({ ...x, now: t })); };
  const full = () => (document.fullscreenElement ? document.exitFullscreen() : wrap.current?.requestFullscreen?.());

  return (
    <div ref={wrap} className="group/yt relative aspect-video w-full overflow-hidden bg-black lg:aspect-auto lg:h-full lg:min-h-[420px]">
      {started && <div className="absolute inset-0 [&>iframe]:pointer-events-none"><div ref={host} /></div>}

      {/* Poster: before the first play, and again whenever paused, so YouTube's pause screen never shows */}
      {!playing && (
        <button type="button" onClick={() => (started ? toggle() : setStarted(true))} aria-label={`Play: ${title}`}
          className="absolute inset-0 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mint">
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" className={`h-full w-full object-cover transition duration-700 group-hover/yt:scale-[1.03] ${started ? "opacity-60" : ""}`} />
          <span className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-mint text-mint-deep shadow-[0_8px_40px_-6px_rgba(61,220,151,0.7)] transition group-hover/yt:scale-110"><PlayGlyph playing={false} className="ml-1 h-7 w-7" /></span>
          </span>
          {!started && (
            <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-mint">YouTube · {channel}</span>
              <span className="mt-1.5 block font-display text-xl font-bold text-paper sm:text-2xl">{title}</span>
            </span>
          )}
        </button>
      )}

      {/* While playing: tap the picture to pause */}
      {started && playing && <button type="button" onClick={toggle} aria-label="Pause" className="absolute inset-0" />}

      {started && (
        <div className={`absolute inset-x-0 bottom-0 transition ${playing ? "opacity-0 group-hover/yt:opacity-100 focus-within:opacity-100" : ""}`}>
          <Controls playing={playing} muted={muted} now={time.now} total={time.total} onToggle={toggle} onMute={mute} onSeek={seek}
            extra={<button type="button" onClick={full} aria-label="Full screen" className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-paper hover:bg-white/10">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
            </button>} />
        </div>
      )}
    </div>
  );
}
