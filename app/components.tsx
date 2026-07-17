"use client";

import { useEffect, useRef, useState } from "react";

function usesReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Live Sydney clock. Makes "open now" literal, not a slogan.
   Rendered empty on the server: the server's clock is not Sydney's,
   and any placeholder that differs from the first client tick is a
   hydration mismatch. */
export function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Sydney",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(`SYDNEY ${fmt.format(new Date())}`);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="bar-clock" aria-hidden="true">
      {time}
    </span>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/* Split-flap: the status column settles like a departure board.
   The real text stays in the DOM for screen readers; only the
   visible layer scrambles. */
export function SplitFlap({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  const flap = useRef<HTMLSpanElement>(null);

  /* The scramble is written straight to the DOM rather than held in state.
     It's a ~30fps animation on a decorative layer, so routing it through
     React would re-render every row of the board on every frame to paint
     text no screen reader ever sees. React renders the settled text once;
     this effect owns the element in between. */
  useEffect(() => {
    const el = flap.current;
    if (!el || usesReducedMotion()) return;

    const slots = text.split("");
    const settleAt = slots.map((c, i) => (c === " " ? 0 : 6 + i * 3));
    const total = Math.max(...settleAt);
    let frame = 0;
    let flapId: ReturnType<typeof setInterval> | undefined;

    el.textContent = "";

    const startId = setTimeout(() => {
      flapId = setInterval(() => {
        frame++;
        el.textContent = slots
          .map((c, i) =>
            frame >= settleAt[i]
              ? c
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join("");
        if (frame > total) {
          clearInterval(flapId);
          el.textContent = text;
        }
      }, 34);
    }, delay);

    return () => {
      clearTimeout(startId);
      clearInterval(flapId);
      /* Restore what React thinks it rendered: it diffs against `text` and
         won't repaint a node this effect scribbled on. */
      el.textContent = text;
    };
  }, [text, delay]);

  return (
    <span className={className}>
      <span aria-hidden="true" ref={flap}>
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/* Scroll reveal. Children fade up once, then stop being observed. */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (usesReducedMotion()) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`rise ${className}`}>
      {children}
    </div>
  );
}
