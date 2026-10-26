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

export default function TikTokPlayer({ item, handle }) {
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
    <div className="group/tt relative aspect-[9/16] w-full overflow-hidden rounded-[var(--radius-card)] border border-edge bg-cell">
      {started ? (
        <iframe ref={frame} src={`${ORIGIN}/player/v1/${item.id}?${params}`} title={`TikTok: ${caption}`}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture" className="absolute inset-0 h-full w-full" />
      ) : (
        <button type="button" onClick={() => setStarted(true)} aria-label={`Play TikTok: ${caption}`}
          className="absolute inset-0 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mint">
          {item.cover
            ? <img src={item.cover} alt="" className="h-full w-full object-cover transition duration-700 group-hover/tt:scale-105" />
            : <span className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,rgba(61,220,151,0.18),transparent_60%),linear-gradient(160deg,#13202b,#0a0f14)]" />}
          <span className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-paper/15 text-paper backdrop-blur transition group-hover/tt:scale-110 group-hover/tt:bg-mint group-hover/tt:text-mint-deep"><PlayGlyph playing={false} className="ml-0.5 h-6 w-6" /></span>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4" lang="vi">
            <span className="line-clamp-3 text-sm font-semibold leading-snug text-paper">{caption}</span>
            <span className="mt-2 flex items-center gap-3 font-mono text-[11px] text-paper/70">
              <span>@{handle}</span>
              {item.likes && <span className="flex items-center gap-1"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10z" /></svg>{item.likes}</span>}
            </span>
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
