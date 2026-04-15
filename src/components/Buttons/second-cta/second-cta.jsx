"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./second-cta.css";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export default function SecondCta({
  label = "Button",
  onClick,
  isSelected = false,
  type = "button",
  rightIconSrc,
  rightIconAlt = "",
  rightIconClassName = "",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const activeVisual = isPressed || isSelected;
  const hoverVisual = !activeVisual && isHovered;
  const visualState = activeVisual ? "active" : hoverVisual ? "hover" : "default";

  return (
    <motion.button
      type={type}
      className={`scta scta--${visualState}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      onClick={onClick}
      transition={{ layout: { duration: 0.42, ease: EASE_OUT_EXPO } }}
    >
      <AnimatePresence mode="wait">
        {visualState !== "default" && (
          <motion.span
            key={visualState}
            className={`scta__ripple scta__ripple--${visualState}`}
            initial={{ scale: 0 }}
            animate={{ scale: 18 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
            transition={{ duration: 0.8, ease: [0, 0, 0.15, 1] }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <span className="scta__text">{label}</span>
      {rightIconSrc ? (
        <img
          src={rightIconSrc}
          alt={rightIconAlt}
          aria-hidden={rightIconAlt ? undefined : "true"}
          className={`scta__icon ${rightIconClassName}`.trim()}
        />
      ) : null}
    </motion.button>
  );
}
