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
  // If frames stall (background tab, power saving), still land on the real number
  setTimeout(() => { el.textContent = el.dataset.count; }, ms + 400);
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
  setTimeout(() => { el.textContent = text; }, ms + 400);
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

    // Spotlight follows the pointer; tiles also tilt a few degrees towards it (mouse only)
    let tilted = null;
    const untilt = (el) => { if (el) el.style.transform = ""; };
    const spot = (ev) => {
      const card = ev.target.closest?.("[data-spot]");
      if (card !== tilted) { untilt(tilted); tilted = null; }
      if (!card) return;
      const r = card.getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
      if (still || ev.pointerType !== "mouse" || !card.hasAttribute("data-shown") || card.querySelector("iframe")) return;
      const rx = ((y / r.height) - 0.5) * -3, ry = ((x / r.width) - 0.5) * 3;
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      tilted = card;
    };
    const leave = () => { untilt(tilted); tilted = null; };
    addEventListener("pointermove", spot, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { clearTimeout(fallback); io.disconnect(); removeEventListener("pointermove", spot); document.removeEventListener("pointerleave", leave); };
  }, []);
  return null;
}
