"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../../secHeader/SectionHeading";
import "./Legacy.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
 * Splits a plain string into individual <span class="leg-word"> elements.
 * Each span carries a unique key and is separated by a normal space text node
 * so natural line-wrapping is preserved.
 */
function splitWords(text) {
  return text.trim().split(/\s+/).map((word, i, arr) => (
    <span className="leg-word" key={i}>
      {word}{i < arr.length - 1 ? " " : ""}
    </span>
  ));
}

const PARA =
  "SL Build Tech is a trusted construction company with a legacy spanning over 50 years. Founded with a vision to deliver quality and reliability, the company has grown into a leader in innovative building solutions.";

export default function Legacy() {
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  /* ── Left: sweep-from-left for the "50+ years" numerals ─────── */
  useLayoutEffect(() => {
    const left = leftRef.current;
    if (!left) return;

    const stack = left.querySelector(".leg-left-stack");
    if (!stack) return;

    // Start the stack off to the left, hidden.
    gsap.set(stack, { x: -220, autoAlpha: 0 });

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: left,
          start: "top 85%",
          once: true,
        },
        delay: 0.6,
      }).to(stack, {
        x: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "expo.out",
      });
    }, left);

    return () => ctx.revert();
  }, []);

  /* ── Right: pop-up + reading sweep ──────────────────────────── */
  useLayoutEffect(() => {
    const right = rightRef.current;
    if (!right) return;

    /*
     * .leg-reveal-inner — all three reveal blocks (title + 2 paras).
     * .leg-word         — every individual word span inside the paragraphs.
     */
    const revealInners = right.querySelectorAll(".leg-reveal-inner");
    const words        = right.querySelectorAll(".leg-word");

    if (!revealInners.length) return;

    // Resolve --pcs-brown-500 at runtime so GSAP gets the real colour string.
    const brown400 = getComputedStyle(document.documentElement)
      .getPropertyValue("--pcs-brown-400")
      .trim();

    // Initial state — every inner block pushed below its clip boundary.
    gsap.set(revealInners, { y: "65%", autoAlpha: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: right,
          start: "top 85%",
          once: true,
        },
        /*
         * 0.5s delay: section must be clearly in view before anything moves,
         * making the reveal feel deliberate rather than reactive.
         */
        delay: 0.5,
      });

      // ── Phase 1: pop-up ──────────────────────────────────────────
      // All three blocks slide up sequentially with a 0.18s stagger.
      tl.to(revealInners, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.18,
      });

      // ── Phase 2: reading sweep ───────────────────────────────────
      // 0.12s pause after the last pop-up finishes, then sweep word by word.
      // --leg-wght is a CSS custom property on each .leg-word.
      // font-variation-settings: "wght" var(--leg-wght) lets the variable
      // font interpolate weight smoothly as GSAP drives the number 300 → 600.
      tl.to(words, {
        color: brown400,
        "--leg-wght": 400,
        duration: 1.2,
        stagger: { each: 0.038, from: "start" },
        ease: "power1.inOut",
      }, ">0.12");
    }, right);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SectionHeading
        title="Our Legacy"
        description="How we evolved over the years"
        paddingTop="150px"
        paddingBottom="80px"
      />

      <section className="leg-section">
        <div className="leg-container">

          {/* ── Left — large numerals ──────────────────────────── */}
          <div className="leg-left" ref={leftRef}>
            <div className="leg-left-stack">
              <span className="leg-number">
                <span className="leg-number__digits">50</span>
                <span className="leg-number__plus">+</span>
              </span>
              <span className="leg-years">years</span>
            </div>
          </div>

          <div className="leg-divider" aria-hidden="true" />

          {/* ── Right — story copy with reveal + sweep ─────────── */}
          <div className="leg-right" ref={rightRef}>

            <h3 className="leg-story-title">
              <span className="leg-reveal-clip">
                <span className="leg-reveal-inner">How it all started</span>
              </span>
            </h3>

            <div className="leg-paras">
              <p className="leg-para">
                <span className="leg-reveal-clip">
                  <span className="leg-reveal-inner">
                    {splitWords(PARA)}
                  </span>
                </span>
              </p>
              <p className="leg-para">
                <span className="leg-reveal-clip">
                  <span className="leg-reveal-inner">
                    {splitWords(PARA)}
                  </span>
                </span>
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
