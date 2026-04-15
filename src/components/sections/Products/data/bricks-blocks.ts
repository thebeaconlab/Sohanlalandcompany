// ─────────────────────────────────────────────────────────────────────────────
//  BRICKS & BLOCKS — product data
//
//  HOW TO ADD A NEW PRODUCT
//  ────────────────────────
//  1. Place the product image in:
//       /public/Images/Products/bricks-blocks/your-image-name.png
//
//  2. Copy one of the product blocks below and paste it inside the `products` array.
//
//  3. Fill in:
//       id         → a unique slug (use hyphens, no spaces)
//       name       → the display name shown in the UI
//       image      → "/Images/Products/bricks-blocks/your-image-name.png"
//       attributes → must use the keys: dimensions, units, strength
//
//  That's it — the page will automatically pick it up.
// ─────────────────────────────────────────────────────────────────────────────

import type { ProductCategory } from "./types";

const bricksBlocks: ProductCategory = {
  slug: "bricks-blocks",
  label: "Bricks & Blocks",

  // Defines the attribute rows shown under each product card for this category.
  // Change labels here if you want different display text in the UI.
  attributeSchema: [
    { key: "dimensions", label: "Dimensions" },
    { key: "units",      label: "Units" },
    { key: "strength",   label: "Strength" },
  ],

  products: [
    {
      id: "red-clay-bricks",
      name: "Red Clay Bricks",
      image: "/Images/Products/bricks-blocks/red-clay-brick.png",
      attributes: {
        dimensions: "190L x 90W x 90H",
        units:      "millimeters",
        strength:   "20 MPa",
      },
    },
    {
      id: "red-clay-tiles",
      name: "Red Clay Tiles",
      image: "/Images/Products/bricks-blocks/red-clay-tile.png",
      attributes: {
        dimensions: "190L x 90W x 90H",
        units:      "millimeters",
        strength:   "20 MPa",
      },
    },
    {
      id: "concrete-bricks",
      name: "Concrete Bricks",
      image: "/Images/Products/bricks-blocks/concrete-brick.png",
      attributes: {
        dimensions: "190L x 90W x 90H",
        units:      "millimeters",
        strength:   "20 MPa",
      },
    },
    {
      id: "hollow-blocks",
      name: "Hollow Blocks",
      image: "/Images/Products/bricks-blocks/hollow-block.png",
      attributes: {
        dimensions: "190L x 90W x 90H",
        units:      "millimeters",
        strength:   "20 MPa",
      },
    },
    // ── ADD NEW BRICKS & BLOCKS PRODUCTS BELOW THIS LINE ──────────────────
  ],
};

export default bricksBlocks;
