"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../../secHeader/SectionHeading";
import SecondCta from "../../Buttons/second-cta/second-cta";
import "./Category.css";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  {
    id: 1,
    title: "Bricks & Blocks",
    mobileTitle: (<>Bricks &<br />Blocks</>),
    image: "/Images/Category/home-page/1-bricks-vertical.png",
    mobileImage: "/Images/Category/home-page/1-bricks-horizontal.png",
    slug: "bricks-blocks",
  },
  {
    id: 2,
    title: "Paving Solutions",
    mobileTitle: (<>Paving<br />Solutions</>),
    image: "/Images/Category/home-page/2-paving-vertical.png",
    mobileImage: "/Images/Category/home-page/2-paving-horizontal.png",
    slug: "paving-solutions",
  },
  {
    id: 3,
    title: (<>Facade & Wall<br />Cladding</>),
    mobileTitle: (<>Facade & Wall<br />Cladding</>),
    image: "/Images/Category/home-page/3-wall-cladding-vertical.png",
    mobileImage: "/Images/Category/home-page/3-wall-cladding-horizontal.png",
    slug: "wall-cladding",
  },
  {
    id: 4,
    title: "Precast Solutions",
    mobileTitle: (<>Precast<br />Solutions</>),
    image: "/Images/Category/home-page/4-pre-cast-vertical.png",
    mobileImage: "/Images/Category/home-page/4-precast-horizontal.png",
    slug: "precast-solutions",
  },
  {
    id: 5,
    title: (<>Architectural &<br />Landscape</>),
    mobileTitle: (<>Architectural &<br />Landscape</>),
    image: "/Images/Category/home-page/5-arch-vertical.png",
    mobileImage: "/Images/Category/home-page/5-arch-horizontal.png",
    slug: "architecture-landscape",
  },
];

export default function Category() {
  const containerRef = useRef(null);
  const router = useRouter();

  // Capture viewport height exactly once so Safari chrome show/hide
  // never triggers a resize-based layout jump on the sticky section.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.style.setProperty(
      "--cat-stable-vh",
      `${window.innerHeight}px`
    );
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".cat-card");

      // Use matchMedia so timing adapts without duplicating animation logic.
      // Mobile gets softer, slightly longer easing; desktop stays snappy.
      const mm = gsap.matchMedia(containerRef);

      const buildTimeline = ({
        triggerStart,
        blurAmount,      // initial blur — controls how "foggy" cards look before animation
        fadeDuration,
        fadeStagger,
        popDuration,
        popScale,
        popZ,
        settleDuration,
        popOverlap,
        cleanDuration,
        cleanOverlap,
      }) => {
        // Initial state — set per breakpoint so blur is independent
        gsap.set(cards, {
          autoAlpha: 0,
          filter: `blur(${blurAmount})`,
          scale: 0.98,
          transformPerspective: 1200,
          transformOrigin: "50% 50%",
          zIndex: 1,
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
            once: true,
          },
        });

        // 1. Soft fade-in across all cards
        tl.to(cards, {
          autoAlpha: 1,
          duration: fadeDuration,
          ease: "power2.out",
          stagger: fadeStagger,
        });

        // 2. Per-card 3D pop → settle (same sequence as desktop)
        cards.forEach((card) => {
          tl.to(card, {
            flexGrow: 1.01,
            scale: popScale,
            z: popZ,
            zIndex: 10,
            filter: "blur(0px)",
            boxShadow: "10px 20px 20px -15px rgba(71, 46, 30, 0.34)",
            duration: popDuration,
            ease: "power3.out",
          }, `-=${popOverlap}`)
          .to(card, {
            scale: 1,
            z: 0,
            zIndex: 1,
            filter: "blur(0px)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: settleDuration,
            ease: "power2.inOut",
          });
        });

        // 3. Final cleanup
        tl.to(cards, {
          filter: "blur(0px)",
          duration: cleanDuration,
          ease: "power2.out",
          clearProps: "zIndex,filter,boxShadow,z,scale,flexGrow",
        }, `-=${cleanOverlap}`);
      };

      // ── Mobile (≤ 1024px): lighter blur, gentler timing ──
      mm.add("(max-width: 1024px)", () => {
        buildTimeline({
          triggerStart:   "top 70%",
          blurAmount:     "4px",   // subtle on mobile — not too foggy
          fadeDuration:   0.4,
          fadeStagger:    0.13,
          popDuration:    0.45,
          popScale:       1.01,
          popZ:           4,
          settleDuration: 0.55,
          popOverlap:     0.38,
          cleanDuration:  0.45,
          cleanOverlap:   0.25,
        });
      });

      // ── Desktop (> 1024px): same timing profile as mobile, lighter blur ──
      mm.add("(min-width: 1025px)", () => {
        buildTimeline({
          triggerStart:   "top 70%",
          blurAmount:     "4px",
          fadeDuration:   0.6,
          fadeStagger:    0.1,
          popDuration:    0.45,
          popScale:       1.008,
          popZ:           4,
          settleDuration: 0.4,
          popOverlap:     0.3,
          cleanDuration:  0.3,
          cleanOverlap:   0.2,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SectionHeading
        title="Categories"
        description={
          <>
          <span>A complete range of building materials, designed for <br/>modern construction.</span>
          </>
        }
      />

      <section className="cat-section" ref={containerRef}>
      <div className="cat-grid">
        {CATEGORIES.map((cat) => (
          <div
            className="cat-card"
            key={cat.id}
            role="link"
            tabIndex={0}
            onClick={() => router.push(`/products/${cat.slug}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                router.push(`/products/${cat.slug}`);
              }
            }}
          >
            {/* Desktop vertical image */}
            <Image
              src={cat.image}
              alt={typeof cat.title === "string" ? cat.title : `Category ${cat.id}`}
              fill
              className="cat-card__img cat-card__img--desktop"
              sizes="20vw"
              priority={cat.id <= 2}
            />

            {/* Mobile horizontal image */}
            <Image
              src={cat.mobileImage}
              alt={typeof cat.title === "string" ? cat.title : `Category ${cat.id}`}
              fill
              className="cat-card__img cat-card__img--mobile"
              sizes="100vw"
              priority={cat.id <= 2}
            />

            <div className="cat-card__overlay" aria-hidden="true" />

            <div className="cat-card__content">
              <h3 className="cat-card__title">
                <span className="cat-card__title--desktop">{cat.title}</span>
                <span className="cat-card__title--mobile">{cat.mobileTitle}</span>
              </h3>

              <div className="cat-card__cta">
                <SecondCta
                  label="View Products"
                  rightIconSrc="/svg/arrow-up-right.svg"
                  rightIconClassName="cat-card__cta-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push(`/products/${cat.slug}`);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      </section>
    </>
  );
}
