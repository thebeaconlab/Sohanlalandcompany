"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "../../secHeader/SectionHeading";
import SecondCta from "../../Buttons/second-cta/second-cta";
import ProductGrid from "./ProductGrid";
import "./ProductsPage.css";

const ALL_FILTER = { slug: "all", label: "All" };

export default function ProductsPage({ activeCategory, categories }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeCategoryLabel =
    activeCategory === "all"
      ? "ALL"
      : (
          categories.find((c) => c.slug === activeCategory)?.label ?? "ALL"
        ).toUpperCase();

  const categoryFilters = [ALL_FILTER, ...categories];

  // Resolve which products + schema to show based on active category.
  const activeData =
    activeCategory === "all"
      ? {
          products: categories.flatMap((c) => c.products),
          // For "all", fall back to an empty schema (no attribute rows shown).
          attributeSchema: [],
        }
      : (() => {
          const cat = categories.find((c) => c.slug === activeCategory);
          return {
            products: cat?.products ?? [],
            attributeSchema: cat?.attributeSchema ?? [],
          };
        })();

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return activeData.products;

    return activeData.products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const attributeMatch = Object.values(product.attributes).some((value) =>
        value.toLowerCase().includes(query)
      );
      return nameMatch || attributeMatch;
    });
  }, [activeData.products, searchQuery]);
  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <main className="products-page">
      {/* ── Breadcrumb + Search strip ─────────────────────────────── */}
      <section
        className="products-page__searchBar"
        aria-label="Products breadcrumb and search"
      >
        <p className="products-page__breadcrumbs">
          HOME / PRODUCTS / {activeCategoryLabel}
        </p>

        <div className="products-page__searchWrap products-page__searchWrap--desktop" role="search" aria-label="Search products">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search..."
            className="products-page__searchInput"
            aria-label="Search products"
          />
          <button
            type="button"
            className="products-page__searchIconBtn"
            onClick={() => {
              if (hasSearchQuery) setSearchQuery("");
            }}
            aria-label={hasSearchQuery ? "Clear product search" : "Search products"}
          >
            <Image
              src={hasSearchQuery ? "/svg/x.svg" : "/svg/Search.svg"}
              alt=""
              width={26}
              height={26}
              aria-hidden="true"
              className="products-page__searchIcon"
            />
          </button>
        </div>

        <div className="products-page__mobileSearch" role="search" aria-label="Search products">
          <AnimatePresence initial={false}>
            {mobileSearchOpen && (
              <motion.input
                key="mobile-search-input"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search..."
                className="products-page__searchInput products-page__searchInput--mobile"
                aria-label="Search products"
                initial={{ width: 0, opacity: 0, x: -6 }}
                animate={{ width: "100%", opacity: 1, x: 0 }}
                exit={{ width: 0, opacity: 0, x: -6 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </AnimatePresence>

          <button
            type="button"
            className="products-page__mobileSearchIconBtn"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            aria-label={mobileSearchOpen ? "Close product search" : "Open product search"}
          >
            <Image
              src={mobileSearchOpen ? "/svg/x.svg" : "/svg/Search.svg"}
              alt=""
              width={26}
              height={26}
              aria-hidden="true"
              className="products-page__searchIcon"
            />
          </button>
        </div>
      </section>

      {/* ── Section heading ───────────────────────────────────────── */}
      <SectionHeading
        title="Product Catalogue"
        description="Our complete premium top of the line product range."
        compact
      />

      {/* ── Category filter tabs ──────────────────────────────────── */}
      <section className="products-page__filters" aria-label="Product categories">
        {categoryFilters.map((category) => (
          <SecondCta
            key={category.slug}
            label={category.label}
            isSelected={category.slug === activeCategory}
            onClick={() => router.push(`/products/${category.slug}`)}
          />
        ))}
      </section>

      <section className="products-page__mobileFilters" aria-label="Mobile product filters">
        <div className="products-page__mobileSelectedFilter">
          <SecondCta label={activeCategoryLabel} isSelected />
        </div>

        <div className="products-page__mobileFilterMenu">
          <button
            type="button"
            className="products-page__mobileFilterTrigger"
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            aria-expanded={mobileFilterOpen}
            aria-haspopup="listbox"
          >
            <span>FILTER PRODUCTS</span>
            <Image
              src="/svg/drop-down.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
              className={`products-page__mobileFilterIcon${mobileFilterOpen ? " products-page__mobileFilterIcon--open" : ""}`}
            />
          </button>

          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.ul
                className="products-page__mobileDropdown"
                role="listbox"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {categoryFilters.map((category) => (
                  <li key={category.slug} role="option" aria-selected={category.slug === activeCategory}>
                    <button
                      type="button"
                      className={`products-page__mobileDropdownItem${category.slug === activeCategory ? " products-page__mobileDropdownItem--active" : ""}`}
                      onClick={() => {
                        setMobileFilterOpen(false);
                        router.push(`/products/${category.slug}`);
                      }}
                    >
                      {category.label.toUpperCase()}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Product grid ──────────────────────────────────────────── */}
      <ProductGrid
        products={filteredProducts}
        attributeSchema={activeData.attributeSchema}
      />
    </main>
  );
}
