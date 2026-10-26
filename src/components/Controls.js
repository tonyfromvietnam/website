// Shared player chrome so YouTube and TikTok look like part of the site, not someone else's player
export const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const btn = "grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-mint";
const path = { play: "M8 5.5v13l11-6.5z", pause: "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" };

export function PlayGlyph({ playing, className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d={playing ? path.pause : path.play} /></svg>;
}

function SoundGlyph({ muted }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
      {muted ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : <path d="M16 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />}
    </svg>
  );
}

export function Controls({ playing, muted, now, total, onToggle, onMute, onSeek, extra, compact }) {
  return (
    <div className="flex items-center gap-1 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-2 pb-2 pt-8">
      <button type="button" className={btn} onClick={onToggle} aria-label={playing ? "Pause" : "Play"}><PlayGlyph playing={playing} /></button>
      {!compact && <span className="w-24 shrink-0 font-mono text-xs tabular-nums text-white/80">{fmt(now)} / {fmt(total || 0)}</span>}
      <input type="range" min="0" max={total || 1} step="0.1" value={Math.min(now, total || 1)} aria-label="Seek"
        onChange={(e) => onSeek(Number(e.target.value))}
        className="h-11 min-w-0 flex-1 cursor-pointer accent-[var(--color-mint)]" />
      <button type="button" className={btn} onClick={onMute} aria-label={muted ? "Unmute" : "Mute"}><SoundGlyph muted={muted} /></button>
      {extra}
    </div>
  );
}
