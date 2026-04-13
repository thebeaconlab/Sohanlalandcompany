// ─────────────────────────────────────────────────────────────────────────────
//  PAVING SOLUTIONS — product data
//
//  HOW TO ADD A NEW PRODUCT
//  ────────────────────────
//  1. Place the product image in:
//       /public/Images/Products/paving-solutions/your-image-name.png
//
//  2. Copy a product block from below and paste it inside the `products` array.
//
//  3. Fill in id, name, image, and attributes.
//     Attribute keys for this category: dimensions, finish, thickness
// ─────────────────────────────────────────────────────────────────────────────

import type { ProductCategory } from "./types";

const pavingSolutions: ProductCategory = {
  slug: "paving-solutions",
  label: "Paving Solutions",

  attributeSchema: [
    { key: "dimensions", label: "Dimensions" },
    { key: "finish",     label: "Finish" },
    { key: "thickness",  label: "Thickness" },
  ],

  products: [
    // ── ADD PAVING SOLUTIONS PRODUCTS HERE ────────────────────────────────
    // Example:
    // {
    //   id: "cobble-paver",
    //   name: "Cobble Paver",
    //   image: "/Images/Products/paving-solutions/cobble-paver.png",
    //   attributes: {
    //     dimensions: "200L x 100W",
    //     finish:     "Tumbled",
    //     thickness:  "60mm",
    //   },
    // },
  ],
};

export default pavingSolutions;
