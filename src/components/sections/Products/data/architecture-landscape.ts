// ─────────────────────────────────────────────────────────────────────────────
//  ARCHITECTURAL & LANDSCAPE — product data
//
//  HOW TO ADD A NEW PRODUCT
//  ────────────────────────
//  1. Place the product image in:
//       /public/Images/Products/architecture-landscape/your-image-name.png
//
//  2. Copy a product block from below and paste it inside the `products` array.
//
//  3. Fill in id, name, image, and attributes.
//     Attribute keys for this category: dimensions, application, color
// ─────────────────────────────────────────────────────────────────────────────

import type { ProductCategory } from "./types";

const architectureLandscape: ProductCategory = {
  slug: "architecture-landscape",
  label: "Architectural & Landscape",

  attributeSchema: [
    { key: "dimensions",   label: "Dimensions" },
    { key: "application",  label: "Application" },
    { key: "color",        label: "Colour" },
  ],

  products: [
    // ── ADD ARCHITECTURAL & LANDSCAPE PRODUCTS HERE ───────────────────────
    // Example:
    // {
    //   id: "garden-edger",
    //   name: "Garden Edger",
    //   image: "/Images/Products/architecture-landscape/garden-edger.png",
    //   attributes: {
    //     dimensions:  "500L x 200H x 50W",
    //     application: "Garden borders",
    //     color:       "Charcoal",
    //   },
    // },
  ],
};

export default architectureLandscape;
