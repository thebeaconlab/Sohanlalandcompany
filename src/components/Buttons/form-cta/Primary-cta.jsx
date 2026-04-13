"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import "./primary-cta.css";

const ArrowUpRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

/* Easing curves */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_IN_EXPO  = [0.7, 0, 0.84, 0];
const EASE_IN_QUAD  = [0.4, 0, 1, 1];
const EASE_OUT_QUAD = [0, 0, 0.2, 1];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function PrimaryCta({ onClick }) {
  const [isActive,  setIsActive]    = useState(false);
  const textControls                = useAnimation();
  const iconWrapControls            = useAnimation();
  const iconControls                = useAnimation();
  const hoverRef = useRef(false);
  const phaseRef = useRef("idle"); // idle | opening | open | closing

  const openSequence = async () => {
    if (phaseRef.current === "opening" || phaseRef.current === "open") return;
    phaseRef.current = "opening";

    // Known baseline (no visual pop)
    iconControls.stop();
    iconWrapControls.stop();
    iconControls.set({ scale: 0 });
    iconWrapControls.set({ width: 0, opacity: 0 });

    textControls.stop();
    await textControls.start({
      y: "-115%",
      opacity: 0,
      transition: { duration: 0.12, ease: EASE_IN_QUAD },
    });
    textControls.set({ y: "115%", opacity: 0 });

    await Promise.all([
      textControls.start({
        y: "0%",
        opacity: 1,
        transition: { duration: 0.22, ease: EASE_OUT_QUAD },
      }),
      iconWrapControls.start({
        width: 24,
        opacity: 1,
        transition: { duration: 0.65, ease: EASE_OUT_EXPO },
      }),
      iconControls.start({
        scale: 1,
        transition: { duration: 0.65, ease: EASE_OUT_EXPO },
      }),
    ]);

    phaseRef.current = "open";

    // If the pointer already left while opening, close AFTER opening completes.
    if (!hoverRef.current) {
      await closeSequence();
    }
  };

  const closeSequence = async () => {
    if (phaseRef.current === "closing" || phaseRef.current === "idle") return;
    phaseRef.current = "closing";

    await Promise.all([
      iconControls.start({
        scale: 0,
        transition: { duration: 0.6, ease: EASE_IN_EXPO },
      }),
      iconWrapControls.start({
        width: 0,
        opacity: 0,
        transition: { duration: 0.75, ease: EASE_IN_EXPO },
      }),
    ]);

    textControls.stop();
    await textControls.start({
      y: "115%",
      opacity: 0,
      transition: { duration: 0.18, ease: EASE_IN_QUAD },
    });
    textControls.set({ y: "-115%", opacity: 0 });
    await textControls.start({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.26, ease: EASE_OUT_QUAD },
    });

    phaseRef.current = "idle";

    // If user re-hovered during closing, reopen once fully closed.
    if (hoverRef.current) {
      await openSequence();
    }
  };

  return (
    <motion.button
      layout
      className={`pcta${isActive ? " pcta--active" : ""}`}
      onHoverStart={() => {
        hoverRef.current = true;
        openSequence();
      }}
      onHoverEnd={() => {
        hoverRef.current = false;
        // Only close once we're fully open (or after opening finishes).
        if (phaseRef.current === "open") closeSequence();
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      onClick={onClick}
      transition={{ layout: { duration: 0.42, ease: EASE_OUT_EXPO } }}
    >
      {/* ── Sunrise radial fill from bottom on click ── */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            className="pcta__ripple"
            initial={{ scale: 0 }}
            animate={{ scale: 18 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeOut" } }}
            transition={{ duration: 1, ease: [0, 0, 0.15, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ── Text: clipped wrapper + single element animation ── */}
      <div className="pcta__textWrap">
        <motion.span className="pcta__text" animate={textControls}>
          GET IN TOUCH
        </motion.span>
      </div>

      {/* ── Arrow: width-wrapper controls space, inner span controls visual scale ── */}
      <motion.span
        className="pcta__iconWrap"
        initial={{ width: 0, opacity: 0 }}
        animate={iconWrapControls}
      >
        <motion.span
          className="pcta__icon"
          initial={{ scale: 0 }}
          animate={iconControls}
        >
          <ArrowUpRight />
        </motion.span>
      </motion.span>
    </motion.button>
  );
}
