"use client";
import { useEffect, useRef } from "react";

// A fixed field of dots behind the page; dots near the cursor light up mint and swell.
// Drawn at device pixel ratio so every dot is crisp, and only while the pointer moves.
const GAP = 26, REACH = 150;

export default function DotGrid() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, px = -9999, py = -9999, glow = 0, raf = 0, last = 0;

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const d = Math.hypot(x - px, y - py), k = Math.max(0, 1 - d / REACH) * glow;
          ctx.fillStyle = k > 0.01 ? `rgba(47,240,160,${0.1 + k * 0.75})` : "rgba(255,255,255,0.07)";
          ctx.fillRect(x - 0.75 - k * 1.1, y - 0.75 - k * 1.1, 1.5 + k * 2.2, 1.5 + k * 2.2);
        }
      }
    };
    // Glow eases in while moving and fades out after the pointer rests
    const loop = (t) => {
      const moving = t - last < 120;
      glow += ((moving ? 1 : 0) - glow) * 0.12;
      draw();
      raf = glow > 0.01 || moving ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX; py = e.clientY; last = performance.now();
      if (!raf) raf = requestAnimationFrame(loop);
    };

    size();
    addEventListener("resize", size);
    if (!still) addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_20%,#000_30%,transparent_80%)]" />;
}
