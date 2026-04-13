"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Launching_soon.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DRIFT_EASE = "sine.inOut";

function renderWord(word, wordKey) {
  return (
    <span className="ls-word" data-word={wordKey} aria-label={word}>
      {Array.from(word).map((ch, i) => (
        <span className="ls-char" aria-hidden="true" key={`${wordKey}-${ch}-${i}`}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function LaunchingSoon() {
  const sceneRef = useRef(null);   // outer scroll-space wrapper (scroll trigger)
  const panelRef = useRef(null);   // fixed overlay panel (slides bottom → top)
  const bgRef    = useRef(null);   // gradient layer — parallax + holds orb tweens scope
  const textRef  = useRef(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const panel = panelRef.current;
    const bg    = bgRef.current;
    const text  = textRef.current;
    if (!scene || !panel || !bg || !text) return undefined;

    const orbs = bg.querySelectorAll(".ls-orb");
    const [o1, o2, o3, o4] = orbs;
    if (!o1 || !o2 || !o3 || !o4) return undefined;

    const moveBgX = gsap.quickTo(bg, "x", { duration: 1.15, ease: "power3.out" });
    const moveBgY = gsap.quickTo(bg, "y", { duration: 1.15, ease: "power3.out" });

    const onPointerMove = (e) => {
      const rect = panel.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      moveBgX(nx * 16);
      moveBgY(ny * 12);
    };

    const onPointerLeave = () => {
      moveBgX(0);
      moveBgY(0);
    };

    panel.addEventListener("pointermove", onPointerMove);
    panel.addEventListener("pointerleave", onPointerLeave);

    const ctx = gsap.context(() => {
      // ── Orb drift — identical on all breakpoints ─────────────────
      gsap.set([o1, o2, o3, o4], { transformOrigin: "50% 50%", force3D: true });
      gsap.set(o3, { xPercent: -50, yPercent: -50 });

      gsap.to(o1, { x: 72, y: 54, duration: 19, repeat: -1, yoyo: true, ease: DRIFT_EASE });
      gsap.to(o1, { scale: 1.06, duration: 15, repeat: -1, yoyo: true, ease: DRIFT_EASE });

      gsap.to(o2, { x: -62, y: -48, duration: 23, repeat: -1, yoyo: true, ease: DRIFT_EASE });
      gsap.to(o2, { scale: 1.045, duration: 18, repeat: -1, yoyo: true, ease: DRIFT_EASE });
      gsap.to(o2, { rotation: 2.8, duration: 27, repeat: -1, yoyo: true, ease: DRIFT_EASE });

      gsap.fromTo(o3, { x: -36, y: 32 }, { x: 42, y: -38, duration: 16, repeat: -1, yoyo: true, ease: DRIFT_EASE });
      gsap.to(o3, { scale: 1.07, duration: 20, repeat: -1, yoyo: true, ease: DRIFT_EASE });

      gsap.to(o4, { x: -40, y: 44, duration: 21, repeat: -1, yoyo: true, ease: DRIFT_EASE });
      gsap.to(o4, { rotation: -5, duration: 24, repeat: -1, yoyo: true, ease: DRIFT_EASE });
      gsap.to(o4, { scale: 1.08, duration: 17, repeat: -1, yoyo: true, ease: DRIFT_EASE });

      // ── Shared char references ────────────────────────────────────
      const launchingChars = text.querySelectorAll('[data-word="launching"] .ls-char');
      const soonChars      = text.querySelectorAll('[data-word="soon"] .ls-char');

      /*
       * wordIn — adds a char stagger tween to `tl` at `startAt`.
       * For scrub timelines startAt is a fractional position (0-1);
       * for auto-play timelines it is an absolute second offset.
       */
      const wordIn = (tl, chars, startAt) => {
        tl.fromTo(
          chars,
          { opacity: 0, y: (i) => 58 + Math.sin(i * 0.9) * 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            stagger: { each: 0.055, from: "start" },
            overwrite: true,
          },
          startAt,
        );
      };

      const mm = gsap.matchMedia();

      // ── Mobile (≤ 1024px): one-shot auto-play ────────────────────
      // A single scroll into view fires the animation once and plays
      // it all the way through at real speed — no scrubbing needed.
      mm.add("(max-width: 1024px)", () => {
        gsap.set(panel, { yPercent: 100 });
        gsap.set([...launchingChars, ...soonChars], { opacity: 0, y: 52, force3D: true });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top 85%",
            once:  true,
          },
        });

        // Panel rises fast then decelerates to a natural stop.
        tl.to(panel, { yPercent: 0, duration: 0.9, ease: "power3.inOut" });

        // "Launching" appears as panel crosses mid-screen (~t=0.4s).
        wordIn(tl, launchingChars, 0.38);

        // "Soon" follows once panel is nearly full (~t=0.58s).
        wordIn(tl, soonChars, 0.58);
      });

      // ── Desktop (> 1024px): scroll-scrubbed rise ─────────────────
      // Panel position is tied to scroll distance; reversible.
      mm.add("(min-width: 1025px)", () => {
        gsap.set(panel, { yPercent: 100 });
        gsap.set([...launchingChars, ...soonChars], { opacity: 0, y: 52, force3D: true });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start:  "top bottom",
            end:    "top -60%",
            scrub:  1.5,
          },
        });

        // 20 % dead zone before the panel moves, then rises over 80 % of the window.
        tl.to(panel, { yPercent: 0, ease: "none", duration: 0.8 }, 0.2);

        // "Launching" at ~52 % risen; "Soon" at ~75 % risen.
        wordIn(tl, launchingChars, 0.62);
        wordIn(tl, soonChars,      0.80);
      });
    }, sceneRef);

    return () => {
      panel.removeEventListener("pointermove", onPointerMove);
      panel.removeEventListener("pointerleave", onPointerLeave);
      ctx.revert();
    };
  }, []);

  return (
    /*
     * ls-scene: invisible scroll-space div that gives ScrollTrigger something
     * to measure against. The fixed panel animates relative to the viewport,
     * not this element, so ls-scene needs no visible styling.
     */
    <section className="ls-scene" ref={sceneRef}>

      {/* Fixed overlay panel — slides up from below viewport */}
      <div className="ls-panel" ref={panelRef}>

        {/* Moving brownish gradient orbs on a light background */}
        <div className="ls-bg" ref={bgRef} aria-hidden="true">
          <span className="ls-orb ls-orb--1" />
          <span className="ls-orb ls-orb--2" />
          <span className="ls-orb ls-orb--3" />
          <span className="ls-orb ls-orb--4" />
        </div>

        <h2 className="ls-text" ref={textRef}>
          <span className="ls-line">{renderWord("Launching", "launching")}</span>
          <span className="ls-line">{renderWord("Soon", "soon")}</span>
        </h2>
      </div>
    </section>
  );
}
