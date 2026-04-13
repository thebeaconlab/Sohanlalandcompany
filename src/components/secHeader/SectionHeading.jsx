"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SectionHeading.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable section heading with a CSS slide-up reveal on scroll.
 *
 * Props
 * ─────
 * title        {string}  — section title (uppercased in CSS)
 * description  {string}  — optional subtitle line
 * paddingTop   {string}  — top padding of the wrapper, default "140px"
 * paddingBottom {string} — bottom padding of the wrapper, default "40px"
 */
export default function SectionHeading({
  title,
  description,
  paddingTop    = "140px",
  paddingBottom = "40px",
}) {
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heading,
        start: "top 88%",
        once: true,
        onEnter: () => heading.classList.add("sec-heading--visible"),
      });
    }, heading);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="sec-heading"
      ref={headingRef}
      style={{ paddingTop, paddingBottom }}
    >
      <h2 className="sec-heading__title">
        <span className="sec-reveal__clip">
          <span className="sec-reveal__text">{title}</span>
        </span>
      </h2>

      {description && (
        <p className="sec-heading__description">
          <span className="sec-reveal__clip">
            <span className="sec-reveal__text">{description}</span>
          </span>
        </p>
      )}
    </div>
  );
}
