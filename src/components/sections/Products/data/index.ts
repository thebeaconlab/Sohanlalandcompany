// ─────────────────────────────────────────────────────────────────────────────
//  Products — master data index
//
//  All category data is imported here and exported as a single array.
//  Components and pages should import from this file — NOT from individual
//  category files — so there is a single source of truth.
//
//  TO ADD A BRAND-NEW CATEGORY:
//    1. Create a new file: src/components/sections/Products/data/my-category.ts
//    2. Follow the same pattern as the other data files.
//    3. Import it below and add it to the CATEGORIES array.
//    4. Add a new folder:  /public/Images/Products/my-category/
//    5. Add the route to:  src/app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────

import type { ProductCategory, Product } from "./types";

import bricksBlocks          from "./bricks-blocks";
import pavingSolutions       from "./paving-solutions";
import wallCladding          from "./wall-cladding";
import architectureLandscape from "./architecture-landscape";
import precastSolutions      from "./precast-solutions";

/** Ordered list of all product categories — order controls filter tab order */
export const CATEGORIES: ProductCategory[] = [
  bricksBlocks,
  pavingSolutions,
  wallCladding,
  architectureLandscape,
  precastSolutions,
];

/** Every product across all categories, each tagged with its category slug + label */
export type FlatProduct = Product & {
  categorySlug:  string;
  categoryLabel: string;
};

export const ALL_PRODUCTS: FlatProduct[] = CATEGORIES.flatMap((cat) =>
  cat.products.map((p) => ({
    ...p,
    categorySlug:  cat.slug,
    categoryLabel: cat.label,
  })),
);

/** Returns the full category object for a given URL slug, or undefined */
export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

/** Valid URL slugs (used for Next.js generateStaticParams) */
export const CATEGORY_SLUGS = CATEGORIES.map((cat) => cat.slug);

export type { ProductCategory, Product };
