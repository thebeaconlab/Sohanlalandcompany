# Products Page — System Design & Developer Guide

> Last updated: April 2026

---

## Table of Contents

1. [Overview](#1-overview)
2. [URL Routes](#2-url-routes)
3. [Folder Structure](#3-folder-structure)
4. [How the Data Layer Works](#4-how-the-data-layer-works)
5. [How to Add a New Product ← START HERE for the owner](#5-how-to-add-a-new-product)
6. [How to Add a New Category](#6-how-to-add-a-new-category)
7. [Component Architecture](#7-component-architecture)
8. [UI Layout Reference](#8-ui-layout-reference)
9. [Image Guidelines](#9-image-guidelines)
10. [SEO — Per-Page Metadata](#10-seo--per-page-metadata)

---

## 1. Overview

The Products section is a **single page** (`ProductsPage`) that renders different products
based on the active URL segment. The filter tabs (ALL, BRICKS & BLOCKS, etc.) are just
navigation links that change the URL — no client-side state management required.

```
URL                                    Active filter shown
─────────────────────────────────────  ──────────────────────────────
/products              → redirects to  /products/all
/products/all                          All products, grouped by category
/products/bricks-blocks                Bricks & Blocks only
/products/paving-solutions             Paving Solutions only
/products/wall-cladding                Facade & Wall Cladding only
/products/architecture-landscape       Architectural & Landscape only
/products/precast-solutions            Precast Solutions only
```

---

## 2. URL Routes

| Route | File |
|---|---|
| `/products` | `src/app/products/page.tsx` — redirects to `/products/all` |
| `/products/all` | `src/app/products/[category]/page.tsx` — shows all |
| `/products/bricks-blocks` | same `[category]` page, filter = bricks-blocks |
| `/products/paving-solutions` | same `[category]` page, filter = paving-solutions |
| `/products/wall-cladding` | same `[category]` page, filter = wall-cladding |
| `/products/architecture-landscape` | same `[category]` page, filter = architecture-landscape |
| `/products/precast-solutions` | same `[category]` page, filter = precast-solutions |

All routes are **statically pre-rendered** at build time via `generateStaticParams`.

---

## 3. Folder Structure

```
sohanlalandcompany/
│
├── src/
│   ├── app/
│   │   └── products/
│   │       ├── page.tsx                    ← redirects → /products/all
│   │       └── [category]/
│   │           └── page.tsx                ← main route (passes active filter to UI)
│   │
│   └── components/
│       └── sections/
│           └── Products/
│               │
│               ├── data/                   ← DATA LAYER (edit here to add products)
│               │   ├── types.ts            ← TypeScript interfaces (do not edit)
│               │   ├── index.ts            ← master export (add new categories here)
│               │   ├── bricks-blocks.ts    ← Bricks & Blocks products
│               │   ├── paving-solutions.ts ← Paving Solutions products
│               │   ├── wall-cladding.ts    ← Facade & Wall Cladding products
│               │   ├── architecture-landscape.ts
│               │   └── precast-solutions.ts
│               │
│               ├── ProductsPage.jsx        ← page shell (TODO: build UI)
│               ├── ProductsPage.css
│               ├── CategoryFilter.jsx      ← filter tab bar
│               ├── CategoryFilter.css
│               ├── ProductGrid.jsx         ← 4-column responsive grid
│               ├── ProductGrid.css
│               ├── ProductCard.jsx         ← individual product card
│               └── ProductCard.css
│
└── public/
    └── Images/
        └── Products/
            ├── bricks-blocks/              ← drop images here for Bricks & Blocks
            ├── paving-solutions/           ← drop images here for Paving Solutions
            ├── wall-cladding/              ← drop images here for Wall Cladding
            ├── architecture-landscape/     ← drop images here for Arch & Landscape
            └── precast-solutions/          ← drop images here for Precast Solutions
```

---

## 4. How the Data Layer Works

Each category has its own data file. All data files follow the same structure:

```ts
{
  slug: "bricks-blocks",          // matches the URL segment
  label: "Bricks & Blocks",       // shown in filter tabs + breadcrumb

  attributeSchema: [              // defines which attributes to show for THIS category
    { key: "dimensions", label: "Dimensions" },
    { key: "units",      label: "Units" },
    { key: "strength",   label: "Strength" },
  ],

  products: [                     // array of products — add new ones here
    {
      id:    "red-clay-bricks",
      name:  "Red Clay Bricks",
      image: "/Images/Products/bricks-blocks/red-clay-bricks.png",
      attributes: {
        dimensions: "190L x 90W x 90H",
        units:      "millimeters",
        strength:   "20 MPa",
      },
    },
  ],
}
```

**Key design decision:** Each category defines its own `attributeSchema`.
This means Bricks & Blocks can show "Strength" while Paving Solutions shows "Finish" —
the `ProductCard` component renders only the attributes defined in that category's schema,
so there is no tight coupling between categories.

---

## 5. How to Add a New Product

**This is the only thing the site owner needs to do to publish a new product.**

### Step 1 — Drop the image

Place the product image in the correct category folder under `/public/Images/Products/`.

```
/public/Images/Products/bricks-blocks/new-product-name.png
```

✅ Use `.png` or `.webp` for best quality.  
✅ Recommended size: **800 × 800 px** square, transparent or neutral background.  
✅ File name: use hyphens, no spaces (`hollow-blocks.png` not `hollow blocks.png`).

### Step 2 — Open the data file

Open the file for the correct category:

| Category | File to edit |
|---|---|
| Bricks & Blocks | `src/components/sections/Products/data/bricks-blocks.ts` |
| Paving Solutions | `src/components/sections/Products/data/paving-solutions.ts` |
| Facade & Wall Cladding | `src/components/sections/Products/data/wall-cladding.ts` |
| Architectural & Landscape | `src/components/sections/Products/data/architecture-landscape.ts` |
| Precast Solutions | `src/components/sections/Products/data/precast-solutions.ts` |

### Step 3 — Copy and paste a product block

Find the `products: [` array in the file. Copy an existing product block and paste it
**above** the closing `]`. Then update the values.

```ts
{
  id:    "my-new-product",                      // unique ID (hyphens, no spaces)
  name:  "My New Product",                      // display name in the UI
  image: "/Images/Products/bricks-blocks/my-new-product.png",
  attributes: {
    dimensions: "200L x 100W x 75H",            // use the keys shown in attributeSchema
    units:      "millimeters",
    strength:   "25 MPa",
  },
},
```

### Step 4 — Save and deploy

That's it. After saving, run `npm run build` and the new product appears automatically
on the website — no changes needed in any component or page file.

---

## 6. How to Add a New Category

1. **Create the data file**

   Copy `src/components/sections/Products/data/bricks-blocks.ts` and rename it.
   Update `slug`, `label`, `attributeSchema`, and `products`.

2. **Register it in the index**

   Open `src/components/sections/Products/data/index.ts`.
   Import your new file and add it to the `CATEGORIES` array.

3. **Create the image folder**

   ```
   /public/Images/Products/your-new-slug/
   ```

4. **Add to sitemap**

   Open `src/app/sitemap.ts` and add a new entry for the new route.

5. **No route file changes needed** — the `[category]` dynamic route handles
   any slug automatically via `generateStaticParams`.

---

## 7. Component Architecture

```
ProductsPage
├── <Header />                      (global — imported from sections/Header)
├── <ProductsBreadcrumb />          HOME / PRODUCTS / BRICKS & BLOCKS
├── <ProductsSearch />              search input (client component)
├── <SectionHeading />              "PRODUCT CATALOGUE" title + subheading
├── <CategoryFilter />              filter tab bar — links change the URL
│     Each tab is a Next.js <Link href="/products/[slug]">
│     The active tab is highlighted by comparing params.category
└── <ProductGrid />
      Renders either:
        a) all CATEGORIES grouped with a heading per group  (when slug = "all")
        b) one getCategoryBySlug(slug).products             (when slug = specific)
      └── <ProductCard /> × N
            ├── <Image />           product photo (next/image, optimised)
            ├── <h3>name</h3>
            └── attributes list     rendered from category.attributeSchema
```

### Props flow

```
page.tsx
  ↓ params.category (string)
ProductsPage
  ↓ activeCategory, categories
CategoryFilter     → links, no state
ProductGrid        → activeCategory, categories (or one category)
  ↓ product, attributeSchema
ProductCard
```

No global state, no context — just props. This keeps it simple and SSR-friendly.

---

## 8. UI Layout Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
├─────────────────────────────────────────────────────────────────┤
│  HOME / PRODUCTS / BRICKS & BLOCKS            [  Search...  🔍] │  ← breadcrumb + search
├─────────────────────────────────────────────────────────────────┤
│                    PRODUCT CATALOGUE                            │  ← title
│           Our complete premium top of the line product range.   │  ← subheading
├─────────────────────────────────────────────────────────────────┤
│  [ALL] [BRICKS & BLOCKS] [PAVING] [FACADE] [ARCH] [PRECAST]    │  ← filter tabs
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  image   │  │  image   │  │  image   │  │  image   │       │
│  │          │  │          │  │          │  │          │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │  ← 4-col grid
│  PRODUCT NAME  PRODUCT NAME  PRODUCT NAME  PRODUCT NAME        │
│  Dim: ...      Dim: ...      Dim: ...      Dim: ...            │
│  Units: ...    Units: ...    Units: ...    Units: ...          │
│  Strength:...  Strength:...  Strength:...  Strength:...        │
└─────────────────────────────────────────────────────────────────┘
```

**Responsive grid:**
| Breakpoint | Columns |
|---|---|
| Desktop (> 1024px) | 4 columns |
| Tablet (768px–1024px) | 2 columns |
| Mobile (< 768px) | 1 column (or 2, TBD) |

---

## 9. Image Guidelines

| Property | Recommendation |
|---|---|
| Format | `.webp` (preferred) or `.png` |
| Dimensions | 800 × 800 px (square) |
| Background | Neutral grey (#f0f0f0) or transparent |
| File size | < 200 KB after compression |
| Naming | `kebab-case-no-spaces.png` |

Use [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com) to compress before uploading.

---

## 10. SEO — Per-Page Metadata

Each category URL gets its own `<title>` and `<meta description>` automatically,
generated by `generateMetadata()` in `src/app/products/[category]/page.tsx`.

| URL | Title |
|---|---|
| `/products/all` | `Product Catalogue \| SL Build Tech` |
| `/products/bricks-blocks` | `Bricks & Blocks \| SL Build Tech` |
| `/products/paving-solutions` | `Paving Solutions \| SL Build Tech` |
| etc. | ... |

All product routes are included in `src/app/sitemap.ts` and will be submitted to Google.

---

*Questions or changes? Check the inline comments in each data file — every file has
step-by-step instructions at the top.*
