// ─────────────────────────────────────────────────────────────────────────────
//  Products — shared TypeScript types
//
//  These types are used by every category data file and all UI components.
//  You should not need to edit this file when adding new products.
// ─────────────────────────────────────────────────────────────────────────────

/** One attribute row shown below a product card (e.g. "Dimensions: 190L x 90W x 90H") */
export interface AttributeField {
  /** Internal key that matches the key in Product.attributes */
  key: string;
  /** Human-readable label displayed in the UI */
  label: string;
}

/** A single product entry */
export interface Product {
  /** Unique identifier within the category, used as React key */
  id: string;
  /** Display name shown under the product image */
  name: string;
  /**
   * Path to the product image, relative to /public
   * Example: "/Images/Products/bricks-blocks/red-clay-bricks.png"
   */
  image: string;
  /**
   * Key-value pairs for product attributes.
   * Keys must match the `key` fields defined in the parent category's attributeSchema.
   */
  attributes: Record<string, string>;
}

/** A full product category (one data file = one category) */
export interface ProductCategory {
  /** URL slug — must match the [category] segment in the route */
  slug: string;
  /** Label shown in the filter tabs and breadcrumb */
  label: string;
  /**
   * Defines which attributes to display for this category and in what order.
   * Only keys listed here will be shown in the product card.
   */
  attributeSchema: AttributeField[];
  /** All products belonging to this category */
  products: Product[];
}
