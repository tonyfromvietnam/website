"use client";
import { useEffect, useRef, useState } from "react";

// Palette picker: the chosen theme spreads out from the tapped swatch (View Transitions API)
// and is remembered per visitor. Swatch colours mirror the themes in globals.css.
export const THEMES = [
  { id: "sand", name: "Sand", bg: "#ece4d6", fg: "#b4471b" },
  { id: "linen", name: "Linen", bg: "#e7e3d7", fg: "#2f6b4a" },
  { id: "espresso", name: "Espresso", bg: "#12100d", fg: "#e6c38e" },
  { id: "night", name: "Night", bg: "#07080a", fg: "#2ff0a0" },
];

const Swatch = ({ t }) => (
  <span className="relative block h-6 w-6 shrink-0 overflow-hidden rounded-full border border-black/15" style={{ background: t.bg }} aria-hidden="true">
    <span className="absolute inset-y-0 right-0 w-1/2" style={{ background: t.fg }} />
  </span>
);

export default function ThemeSwitch({ fallback }) {
  const [theme, setTheme] = useState(fallback);
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => { setTheme(document.documentElement.dataset.theme || fallback); }, [fallback]);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (e.type === "keydown" ? e.key === "Escape" : !box.current?.contains(e.target)) setOpen(false); };
    addEventListener("pointerdown", close); addEventListener("keydown", close);
    return () => { removeEventListener("pointerdown", close); removeEventListener("keydown", close); };
  }, [open]);

  const pick = (id, e) => {
    setOpen(false);
    if (id === theme) return;
    const apply = () => {
      document.documentElement.dataset.theme = id;
      try { localStorage.setItem("theme", id); } catch {}
      dispatchEvent(new Event("themechange"));
      setTheme(id);
    };
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || still) return apply();
    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const current = THEMES.find((t) => t.id === theme) || THEMES[0];
  return (
    <div ref={box} className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="true"
        aria-label={`Colour theme: ${current.name}`}
        className="grid h-11 w-11 place-items-center rounded-[4px] border border-edge transition hover:border-mint/60">
        <Swatch t={current} />
      </button>
      {open && (
        <div role="radiogroup" aria-label="Colour theme"
          className="tile absolute right-0 top-[calc(100%+8px)] z-30 w-48 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.45)]">
          {THEMES.map((t) => (
            <button key={t.id} type="button" role="radio" aria-checked={t.id === theme} onClick={(e) => pick(t.id, e)}
              className={`flex min-h-11 w-full items-center gap-3 rounded-[4px] px-2.5 text-left text-sm font-medium transition hover:bg-paper/[0.06] ${t.id === theme ? "text-paper" : "text-body"}`}>
              <Swatch t={t} />
              <span className="flex-1">{t.name}</span>
              {t.id === theme && <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
