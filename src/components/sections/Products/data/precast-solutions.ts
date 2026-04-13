// ─────────────────────────────────────────────────────────────────────────────
//  PRECAST SOLUTIONS — product data
//
//  HOW TO ADD A NEW PRODUCT
//  ────────────────────────
//  1. Place the product image in:
//       /public/Images/Products/precast-solutions/your-image-name.png
//
//  2. Copy a product block from below and paste it inside the `products` array.
//
//  3. Fill in id, name, image, and attributes.
//     Attribute keys for this category: dimensions, loadCapacity, units
// ─────────────────────────────────────────────────────────────────────────────

import type { ProductCategory } from "./types";

const precastSolutions: ProductCategory = {
  slug: "precast-solutions",
  label: "Precast Solutions",

  attributeSchema: [
    { key: "dimensions",    label: "Dimensions" },
    { key: "loadCapacity",  label: "Load Capacity" },
    { key: "units",         label: "Units" },
  ],

  products: [
    // ── ADD PRECAST SOLUTIONS PRODUCTS HERE ───────────────────────────────
    // Example:
    // {
    //   id: "precast-lintel",
    //   name: "Precast Lintel",
    //   image: "/Images/Products/precast-solutions/precast-lintel.png",
    //   attributes: {
    //     dimensions:   "1200L x 140H x 100W",
    //     loadCapacity: "15 kN/m",
    //     units:        "millimeters / kN",
    //   },
    // },
  ],
};

export default precastSolutions;
