"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./Hero.css";

export default function Hero() {
  const copyRef = useRef(null);

  useLayoutEffect(() => {
    // Freeze viewport height for Safari stability.
    document.documentElement.style.setProperty(
      "--hero-stable-vh",
      `${window.innerHeight * 0.7}px`
    );

    // Animate each reveal-inner block: slide up from 65% below the clip edge.
    const copy = copyRef.current;
    if (!copy) return;

    const inners = copy.querySelectorAll(".hero-reveal-inner");
    gsap.set(inners, { y: "65%", autoAlpha: 0 });

    const ctx = gsap.context(() => {
      gsap.to(inners, {
        y: 0,
        autoAlpha: 1,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.18,
        delay: 0.35,
      });
    }, copy);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section">
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        src="/Clips/SLBULD.mp4"
      />

      {/* Bottom gradient scrim so text stays readable over any footage */}
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-copy" ref={copyRef}>

          <h1 className="hero-title">
            <span className="hero-reveal-clip">
              <span className="hero-reveal-inner">From structures</span>
            </span>
            <span className="hero-reveal-clip">
              <span className="hero-reveal-inner">to surfaces</span>
            </span>
          </h1>

          <p className="hero-description">
            <span className="hero-reveal-clip">
              <span className="hero-reveal-inner">
                Producing the finest luxury collection. Covering all your
                construction needs.
              </span>
            </span>
          </p>

        </div>
      </div>
    </section>
  );
}
