"use client";
import { useEffect, useState } from "react";

// Live London time; renders dashes on the server so hydration always matches
const time = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", second: "2-digit" });
const hourOf = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "numeric", hourCycle: "h23" });
const part = (h) => (h < 5 ? "Night" : h < 12 ? "Morning" : h < 17 ? "Afternoon" : h < 22 ? "Evening" : "Night");

export default function Clock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const [hh, mm, ss] = now ? time.format(now).split(":") : ["--", "--", "--"];
  return (
    <>
      <p className="font-mono text-3xl tabular-nums text-paper sm:text-4xl" aria-live="off">
        {hh}<span className="animate-pulse text-muted">:</span>{mm}<span className="ml-1 text-lg text-muted">{ss}</span>
      </p>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">{now ? `${part(Number(hourOf.format(now)))} in London` : "London"}</p>
    </>
  );
}
