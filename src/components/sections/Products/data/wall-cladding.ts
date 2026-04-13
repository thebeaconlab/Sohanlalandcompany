// ─────────────────────────────────────────────────────────────────────────────
//  FACADE & WALL CLADDING — product data
//
//  HOW TO ADD A NEW PRODUCT
//  ────────────────────────
//  1. Place the product image in:
//       /public/Images/Products/wall-cladding/your-image-name.png
//
//  2. Copy a product block from below and paste it inside the `products` array.
//
//  3. Fill in id, name, image, and attributes.
//     Attribute keys for this category: dimensions, material, finish
// ─────────────────────────────────────────────────────────────────────────────

import type { ProductCategory } from "./types";

const wallCladding: ProductCategory = {
  slug: "wall-cladding",
  label: "Facade & Wall Cladding",

  attributeSchema: [
    { key: "dimensions", label: "Dimensions" },
    { key: "material",   label: "Material" },
    { key: "finish",     label: "Finish" },
  ],

  products: [
    // ── ADD FACADE & WALL CLADDING PRODUCTS HERE ──────────────────────────
    // Example:
    // {
    //   id: "split-face-block",
    //   name: "Split Face Block",
    //   image: "/Images/Products/wall-cladding/split-face-block.png",
    //   attributes: {
    //     dimensions: "390L x 190H",
    //     material:   "Concrete",
    //     finish:     "Split Face",
    //   },
    // },
  ],
};

export default wallCladding;
