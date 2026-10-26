"use client";
import { useEffect } from "react";

// Page-wide motion, wired by data attributes so the markup stays server-rendered:
// data-reveal fades in on scroll, data-count counts up, data-spot gets a cursor spotlight,
// data-scramble decodes its text. All of it stands still under prefers-reduced-motion.
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/";

function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = (el.dataset.count.split(".")[1] || "").length;
  const start = performance.now(), ms = 1200;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / ms), eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(decimals);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function scramble(el) {
  const text = el.textContent, start = performance.now(), ms = 900;
  const tick = (now) => {
    const shown = Math.floor(((now - start) / ms) * text.length);
    el.textContent = [...text].map((ch, i) =>
      i < shown || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join("");
    if (shown < text.length) requestAnimationFrame(tick);
    else el.textContent = text;
  };
  requestAnimationFrame(tick);
}

export default function Effects() {
  useEffect(() => {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll("[data-reveal], [data-count], [data-scramble]");
    // Observers report every target once right after observe(); if that never comes, show everything
    let heard = false;
    const fallback = setTimeout(() => { if (!heard) targets.forEach((el) => { el.dataset.shown = ""; }); }, 1500);
    const io = new IntersectionObserver((entries) => {
      heard = true;
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        e.target.dataset.shown = "";
        if (e.target.dataset.count && !still) countUp(e.target);
        if (e.target.hasAttribute("data-scramble") && !still) scramble(e.target);
      }
    }, { threshold: 0.15 });
    targets.forEach((el) => io.observe(el));

    const spot = (ev) => {
      const card = ev.target.closest?.("[data-spot]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${ev.clientX - r.left}px`);
      card.style.setProperty("--y", `${ev.clientY - r.top}px`);
    };
    addEventListener("pointermove", spot, { passive: true });
    return () => { clearTimeout(fallback); io.disconnect(); removeEventListener("pointermove", spot); };
  }, []);
  return null;
}
