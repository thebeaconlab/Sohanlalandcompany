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
 * title        {string}   — section title (uppercased in CSS)
 * description  {string}   — optional subtitle line
 * compact      {boolean}  — tighter 30px top/bottom padding (e.g. Products page)
 */
export default function SectionHeading({
  title,
  description,
  compact = false,
}) {
  const headingRef = useRef(null);
  const titleRef = useRef(null);

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

  useLayoutEffect(() => {
    const heading = headingRef.current;
    const titleEl = titleRef.current;
    if (!heading || !titleEl) return;

    const updateTitleWidth = () => {
      const titleWidth = titleEl.getBoundingClientRect().width;
      heading.style.setProperty("--sec-title-width", `${titleWidth}px`);
    };

    updateTitleWidth();

    const resizeObserver = new ResizeObserver(updateTitleWidth);
    resizeObserver.observe(titleEl);

    return () => resizeObserver.disconnect();
  }, [title]);

  return (
    <div className={`sec-heading${compact ? " sec-heading--compact" : ""}`} ref={headingRef}>
      <h2 className="sec-heading__title" ref={titleRef}>
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
