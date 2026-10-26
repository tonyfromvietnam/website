"use client";
import { useEffect, useRef } from "react";

// An ECG trace that sweeps across like a bedside monitor, beating at the given bpm.
// Only animates while on screen; reduced motion gets a still trace.
const g = (t, c, w, a) => a * Math.exp(-(((t - c) / w) ** 2));
const ecg = (t) => g(t, 0.12, 0.035, 0.12) + g(t, 0.21, 0.012, -0.12) + g(t, 0.235, 0.013, 1) + g(t, 0.26, 0.014, -0.28) + g(t, 0.46, 0.06, 0.24);

export default function Heartbeat({ bpm, beats = 3 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const period = 60 / bpm;
    // Trace colour follows the theme's data colour
    const hue = () => getComputedStyle(document.documentElement).getPropertyValue("--color-data").trim() || "#5ccbff";
    let w = 0, h = 0, raf = 0, visible = false, color = hue();

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2), r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now) => {
      const span = beats * period, pxPerSec = w / span, head = ((now / 1000) * pxPerSec) % w;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.6; ctx.lineJoin = "round"; ctx.strokeStyle = color;
      const y = (x) => {
        const age = (head - x + w) % w, t = now / 1000 - age / pxPerSec;
        return h * 0.68 - ecg(((t % period) + period) % period / period) * h * 0.58;
      };
      // Older trace fades out behind the head, with a short gap where the "erase bar" passes
      for (let seg = 0; seg < 24; seg++) {
        const x0 = (head - (seg + 1) * (w / 24) + w) % w;
        ctx.globalAlpha = Math.max(0, 1 - seg / 20);
        ctx.beginPath();
        for (let i = 0; i <= w / 24; i++) {
          const x = (x0 + i) % w;
          if (i === 0 || x < 1) ctx.moveTo(x, y(x)); else ctx.lineTo(x, y(x));
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1; ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(head, y(head), 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.arc(head, y(head), 6, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    };
    const loop = (t) => { draw(t); raf = visible ? requestAnimationFrame(loop) : 0; };

    size();
    draw(performance.now());
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !still && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { size(); draw(performance.now()); });
    ro.observe(canvas);
    const retheme = () => { color = hue(); draw(performance.now()); };
    addEventListener("themechange", retheme);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); removeEventListener("themechange", retheme); };
  }, [bpm, beats]);
  return <canvas ref={ref} aria-hidden="true" className="block h-12 w-full" />;
}
