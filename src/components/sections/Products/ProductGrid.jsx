"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Renders a 4-column responsive grid of product cards.
 *
 * Props
 * ─────
 * products        — flat array of Product objects to display
 * attributeSchema — AttributeField[] from the active category
 */
export default function ProductGrid({ products, attributeSchema }) {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    if (!gridRef.current || !products?.length) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cells = gsap.utils.toArray(".prod-grid__cell");
      if (!cells.length) return;

      if (reduceMotion) {
        gsap.set(cells, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" });
        return;
      }

      gsap.set(cells, {
        autoAlpha: 0,
        y: 22,
        scale: 0.985,
        filter: "blur(6px)",
      });

      ScrollTrigger.batch(cells, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.58,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <p className="prod-grid__empty">No products found in this category yet.</p>
    );
  }

  return (
    <section className="prod-grid" aria-label="Product listing" ref={gridRef}>
      {products.map((product) => (
        <div className="prod-grid__cell" key={product.id}>
          <ProductCard product={product} attributeSchema={attributeSchema} />
        </div>
      ))}
    </section>
  );
}
