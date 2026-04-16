"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SecondCta from "../../../Buttons/second-cta/second-cta";
import SectionHeading from "../../../secHeader/SectionHeading";
import "./Testimonial.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
  {
    stars: 5,
    review:
      "Excellent experience with SL Build Tech. The bricks were uniform, strong, and high quality, while the concrete delivered outstanding durability. Timely delivery and professional service made the entire construction process smooth and reliable. Highly recommended for premium building materials.",
    author: "HILTON GUPTA MD@APOLLO",
  },
  {
    stars: 4,
    review:
      "Great quality and dependable delivery schedules. Their materials performed consistently across phases, and their coordination with our site team was highly professional.",
    author: "RAHUL JAIN, PROJECT LEAD",
  },
  {
    stars: 5,
    review:
      "From the first order to the final supply batch, the process stayed transparent and efficient. Product finish and structural consistency were exactly what we needed.",
    author: "ANANYA SHARMA, ARCHITECT",
  },
  {
    stars: 4,
    review:
      "SL Build Tech has been reliable for premium projects where quality and timelines both matter. Their support team is responsive and service quality remains strong.",
    author: "NAVEEN KUMAR, BUILDER",
  },
];

export default function Testimonial() {
  const sectionRef = useRef(null);
  const mediaShellRef = useRef(null);
  const rightPanelRef = useRef(null);
  const imageRef = useRef(null);
  const wipeRef = useRef(null);
  const reviewRef = useRef(null);
  const authorRef = useRef(null);
  const switchTlRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [displayReviewIndex, setDisplayReviewIndex] = useState(0);

  useEffect(() => {
    const review = reviewRef.current;
    const author = authorRef.current;
    if (
      !review ||
      !author ||
      activeReviewIndex === displayReviewIndex ||
      isAnimatingRef.current
    ) {
      return;
    }

    isAnimatingRef.current = true;
    gsap.killTweensOf([review, author]);
    switchTlRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
    switchTlRef.current = tl;

    tl.to([review, author], {
      opacity: 0,
      y: 24,
      filter: "blur(8px)",
      duration: 0.24,
      ease: "power2.inOut",
      onComplete: () => setDisplayReviewIndex(activeReviewIndex),
    }).to([review, author], {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.5,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
      isAnimatingRef.current = false;
    };
  }, [activeReviewIndex]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mediaShell = mediaShellRef.current;
    const rightPanel = rightPanelRef.current;
    const image = imageRef.current;
    const wipe = wipeRef.current;
    const review = reviewRef.current;
    const author = authorRef.current;
    if (!section || !mediaShell || !rightPanel || !image || !wipe || !review || !author) return;

    const ctx = gsap.context(() => {
      // Start hidden; reveal smoothly from top to bottom.
      gsap.set(image, {
        opacity: 0,
        x: -10,
        y: 10,
        clipPath: "inset(0 0 100% 0)",
      });

      // Soft blur edge that travels with the loading frontier.
      gsap.set(wipe, {
        yPercent: -115,
        opacity: 0.3,
      });
      // Right-side copy starts blurred + lower, then rises in cleanly.
      gsap.set([review, author], {
        opacity: 0,
        y: 200,
        filter: "blur(14px)",
      });

      const imageTl = gsap.timeline({
        scrollTrigger: {
          // Start only when the left media block is fully inside viewport.
          trigger: mediaShell,
          start: "bottom bottom",
          once: true,
        },
      });

      imageTl.to(image, {
        opacity: 1,
        duration: 0.95,
        ease: "power2.inOut",
      })
        .to(
          image,
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 2.3,
            ease: "power3.out",
          },
          0
        )
        .to(
          wipe,
          {
            yPercent: 105,
            duration: 2.3,
            ease: "sine.inOut",
          },
          0
        )
        .to(
          image,
          {
            x: 0,
            y: 0,
            duration: 1.45,
            ease: "power3.out",
          },
          0.2
        )
        .to(
          wipe,
          {
            opacity: 0,
            duration: 0.7,
            ease: "sine.out",
          },
          ">-0.3"
        );

      const mm = gsap.matchMedia(section);

      // Desktop/tablet: right content reveals together with image.
      mm.add("(min-width: 769px)", () => {
        gsap.to([review, author], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mediaShell,
            start: "bottom bottom",
            once: true,
          },
        });
      });

      // Mobile: start right content reveal when bottom of right panel reaches viewport bottom.
      mm.add("(max-width: 768px)", () => {
        gsap.to([review, author], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightPanel,
            start: "bottom bottom",
            once: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonial-section" ref={sectionRef}>
      <SectionHeading
        title="Clients' Experience"
        description={
          <>
            <span>Don't just take our word, listen from our verified</span>
            <br className="testimonial-desc-break" />
            <span>clients across India.</span>
          </>
        }
      />

      <div className="testimonial-panel">
        <div className="testimonial-panel__left">
          <div className="testimonial-media-shell" ref={mediaShellRef}>
            <img
              ref={imageRef}
              src="/Images/Partners-Reviews/Review.png"
              alt="Client testimonial visual"
              className="testimonial-media-image"
            />
            <span className="testimonial-media-load-edge" ref={wipeRef} aria-hidden="true" />
          </div>
        </div>

        <div className="testimonial-panel__right" ref={rightPanelRef}>
          <article className="testimonial-copy-card">
            <div className="testimonial-copy-card__top-row">
              <div className="testimonial-copy-card__pager">
                {[1, 2, 3, 4].map((item) => (
                  <SecondCta
                    key={item}
                    label={item}
                    isSelected={item - 1 === activeReviewIndex}
                    onClick={() => {
                      if (!isAnimatingRef.current) {
                        setActiveReviewIndex(item - 1);
                      }
                    }}
                  />
                ))}
              </div>
              <img
                src="/svg/quote.svg"
                alt=""
                aria-hidden="true"
                className="testimonial-copy-card__quote-mark"
              />
            </div>

            <div className="testimonial-copy-card__content">
              <div className="testimonial-copy-card__review" ref={reviewRef}>
                <div className="testimonial-copy-card__stars" aria-label="5 star rating">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <span
                      key={item}
                      className={`testimonial-copy-card__star ${
                        item <= TESTIMONIALS[displayReviewIndex].stars
                          ? "is-filled"
                          : "is-empty"
                      }`}
                      aria-hidden="true"
                    >
                      ⭑
                    </span>
                  ))}
                </div>
                <p className="testimonial-copy-card__text">
                  “{TESTIMONIALS[displayReviewIndex].review}”
                </p>
              </div>
              <p className="testimonial-copy-card__author" ref={authorRef}>
                {TESTIMONIALS[displayReviewIndex].author}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
