"use client";
import { useState } from "react";

// Facade: the server-rendered preview (children) stands in until a click loads the real player,
// so no YouTube, TikTok or Threads scripts or cookies load on page view
const SRC = {
  youtube: (it) => `https://www.youtube-nocookie.com/embed/${it.id}?autoplay=1`,
  tiktok: (it) => `https://www.tiktok.com/embed/v2/${it.id}`,
  threads: (it) => `${it.url.replace(/\/$/, "")}/embed`,
};

export default function Embed({ platform, item, label, className = "", children }) {
  const [live, setLive] = useState(false);
  if (live) {
    return (
      <iframe src={SRC[platform](item)} title={label} className={`${className} bg-black`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
    );
  }
  return (
    <button type="button" onClick={() => setLive(true)} aria-label={`Load ${label}`}
      className={`${className} group text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint`}>
      {children}
    </button>
  );
}
