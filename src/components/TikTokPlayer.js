"use client";
import { useEffect, useRef, useState } from "react";
import { Controls, PlayGlyph } from "./Controls";

// TikTok's bare player (player/v1) with every TikTok control switched off, driven through its
// postMessage API so the tile keeps the site's own buttons. Docs: developers.tiktok.com/doc/embed-player
const ORIGIN = "https://www.tiktok.com";
const params = new URLSearchParams({
  controls: 0, autoplay: 1, loop: 1, music_info: 0, description: 0, rel: 0,
  closed_caption: 0, native_context_menu: 0, timestamp: 0,
}).toString();

const TikTokMark = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.4 2.6 2.2 4.4 5 4.6" />
  </svg>
);
const Index = ({ n, className }) => (
  <span className={`absolute left-4 top-4 font-mono text-xs ${className}`}>{String(n).padStart(2, "0")}</span>
);
const Meta = ({ handle, likes, className }) => (
  <span className={`mt-2 flex items-center gap-3 font-mono text-[11px] ${className}`}>
    <span>@{handle}</span>
    {likes && <span className="flex items-center gap-1"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10z" /></svg>{likes}</span>}
  </span>
);
// Sound-wave bars that dance while the tile is hovered
const Wave = () => (
  <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
    {[0.5, 0.9, 0.6, 1, 0.7, 0.4].map((h, i) => (
      <span key={i} className="wave w-[3px] rounded-[1px] bg-mint transition-colors group-hover/tt:bg-mint-deep" style={{ height: `${h * 100}%`, "--i": i }} />
    ))}
  </span>
);

export default function TikTokPlayer({ item, handle, index = 1 }) {
  const frame = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState({ now: 0, total: 0 });
  const send = (type, value) => frame.current?.contentWindow?.postMessage({ type, value, "x-tiktok-player": true }, ORIGIN);

  useEffect(() => {
    if (!started) return;
    const on = (e) => {
      if (e.origin !== ORIGIN || e.source !== frame.current?.contentWindow || !e.data?.["x-tiktok-player"]) return;
      const { type, value } = e.data;
      if (type === "onStateChange") setPlaying(value === 1 || value === 3);
      if (type === "onCurrentTime") setTime({ now: value.currentTime, total: value.duration });
      if (type === "onMute") setMuted(value);
      // Browsers can block sound without a tap inside the frame: fall back to muted playback
      if (type === "onPlayerError" && value?.errorCode === 3002) { send("mute"); send("play"); setMuted(true); }
    };
    addEventListener("message", on);
    return () => removeEventListener("message", on);
  }, [started]);

  const caption = item.caption || "TikTok";
  return (
    <div className="tile group/tt relative aspect-[9/16] w-full overflow-hidden">
      {started ? (
        <iframe ref={frame} src={`${ORIGIN}/player/v1/${item.id}?${params}`} title={`TikTok: ${caption}`}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture" className="absolute inset-0 h-full w-full bg-black" />
      ) : item.cover ? (
        // With a cover: full-bleed photo, caption on a dark scrim (dark in every theme)
        <button type="button" onClick={() => setStarted(true)} aria-label={`Play TikTok: ${caption}`}
          className="absolute inset-0 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mint">
          <img src={item.cover} alt="" className="h-full w-full object-cover transition duration-700 group-hover/tt:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          <Index n={index} className="text-white/80" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition group-hover/tt:scale-110 group-hover/tt:bg-mint group-hover/tt:text-mint-deep"><PlayGlyph playing={false} className="ml-0.5 h-6 w-6" /></span>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4" lang="vi">
            <span className="line-clamp-3 text-sm font-semibold leading-snug text-white">{caption}</span>
            <Meta handle={handle} likes={item.likes} className="text-white/75" />
          </span>
        </button>
      ) : (
        // No cover: a typographic poster in the theme's colours, so the tile still looks finished
        <button type="button" onClick={() => setStarted(true)} aria-label={`Play TikTok: ${caption}`}
          className="absolute inset-0 flex flex-col justify-between bg-cell p-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mint sm:p-5">
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-mint transition-[height] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/tt:h-full" aria-hidden="true" />
          <span className="outline-num pointer-events-none absolute -right-2 top-[18%] select-none font-display text-[150px] font-bold leading-none tracking-[-0.06em] transition-transform duration-700 group-hover/tt:-translate-y-2" aria-hidden="true">{String(index).padStart(2, "0")}</span>
          <span className="relative flex items-start justify-between">
            <span className="font-mono text-xs text-mint transition group-hover/tt:text-mint-deep">{String(index).padStart(2, "0")}</span>
            <TikTokMark className="h-5 w-5 text-muted transition group-hover/tt:text-mint-deep" />
          </span>
          <span className="relative" lang="vi">
            <span className="line-clamp-4 font-display text-xl font-bold leading-[1.1] tracking-[-0.02em] text-paper transition group-hover/tt:text-mint-deep sm:text-2xl">{caption}</span>
            <span className="mt-4 flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-mint text-mint-deep transition group-hover/tt:bg-mint-deep group-hover/tt:text-mint"><PlayGlyph playing={false} className="ml-0.5 h-4 w-4" /></span>
              <Wave />
            </span>
            <Meta handle={handle} likes={item.likes} className="text-muted transition group-hover/tt:text-mint-deep" />
          </span>
        </button>
      )}
      {started && (
        <div className="absolute inset-x-0 bottom-0">
          <Controls compact playing={playing} muted={muted} now={time.now} total={time.total}
            onToggle={() => send(playing ? "pause" : "play")}
            onMute={() => { send(muted ? "unMute" : "mute"); setMuted(!muted); }}
            onSeek={(t) => { send("seekTo", t); setTime((x) => ({ ...x, now: t })); }} />
        </div>
      )}
    </div>
  );
}
