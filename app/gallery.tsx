"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/* Public-domain paintings from The Met's open-access collection (CC0),
   resized to 2000px WebP, the same set zimmr hangs. They sit behind the
   page and every section sits on a paper panel above them, so the art
   frames the reading without ever being underneath a line of text. */
const ART = [
  { src: "/art/great-wave.webp", title: "Under the Wave off Kanagawa", by: "Katsushika Hokusai" },
  { src: "/art/wheat-field.webp", title: "Wheat Field with Cypresses", by: "Vincent van Gogh" },
  { src: "/art/rocky-mountains.webp", title: "The Rocky Mountains, Lander's Peak", by: "Albert Bierstadt" },
  { src: "/art/blind-orion.webp", title: "Blind Orion Searching for the Rising Sun", by: "Nicolas Poussin" },
  { src: "/art/trojan-women.webp", title: "The Trojan Women Setting Fire to Their Fleet", by: "Claude Lorrain" },
] as const;

/* Long enough that a change reads as the room shifting, not as motion. */
const HOLD = 45_000;

/* Picked once per visit, on the client only: a random pick on the server
   would never match the client's. The paper background on <html> covers
   the moment before hydration. */
let first: number | null = null;
const pick = () => (first ??= Math.floor(Math.random() * ART.length));
const still = () => () => {};

export function Gallery() {
  const start = useSyncExternalStore(still, pick, () => null);
  const [step, setStep] = useState(0);
  const now = start === null ? null : (start + step) % ART.length;
  const was = start === null || step === 0 ? null : (start + step - 1) % ART.length;

  useEffect(() => {
    if (now === null) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let gone = false;
    const t = setTimeout(() => {
      // Load first, so the fade never runs into a half-drawn painting.
      const img = new Image();
      img.onload = () => {
        if (!gone) setStep((n) => n + 1);
      };
      img.src = ART[(now + 1) % ART.length].src;
    }, HOLD);
    return () => {
      gone = true;
      clearTimeout(t);
    };
  }, [now]);

  return (
    <div aria-hidden="true" className="gallery">
      {ART.map((a, k) => (
        <div
          key={a.src}
          className="gallery-art"
          style={{
            // Only the painting on show and the one leaving are fetched.
            backgroundImage: k === now || k === was ? `url(${a.src})` : undefined,
            opacity: k === now ? 1 : 0,
          }}
        />
      ))}
      <div className="gallery-scrim" />
      {now !== null && (
        <p className="micro gallery-credit">
          {ART[now].by} · {ART[now].title}
        </p>
      )}
    </div>
  );
}
