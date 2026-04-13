import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  getCategoryBySlug,
} from "../../../components/sections/Products/data/index";

// ─── Static params (pre-render every category route at build time) ──────────
export function generateStaticParams() {
  return [
    { category: "all" },
    ...CATEGORY_SLUGS.map((slug) => ({ category: slug })),
  ];
}

// ─── Per-page metadata ───────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  if (category === "all") {
    return {
      title: "Product Catalogue",
      description:
        "Browse SL Build Tech's complete range of premium construction products — " +
        "bricks, paving, facade cladding, precast & architectural solutions.",
      alternates: { canonical: "/products/all" },
    };
  }

  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Products" };

  return {
    title: cat.label,
    description: `Explore SL Build Tech's ${cat.label} — premium quality, engineered for lasting performance.`,
    alternates: { canonical: `/products/${cat.slug}` },
  };
}

// ─── Page component ──────────────────────────────────────────────────────────
export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const validSlugs = ["all", ...CATEGORY_SLUGS];

  if (!validSlugs.includes(category)) notFound();

  /**
   * TODO: Replace this placeholder with the real <ProductsPage> component
   * once the UI is built.
   *
   * The active category slug is passed as a prop so the filter tabs
   * can highlight the correct button on first render.
   *
   * Example (uncomment when ready):
   *
   * import ProductsPage from "../../../components/sections/Products/ProductsPage";
   *
   * return (
   *   <>
   *     <Header />
   *     <ProductsPage activeCategory={category} categories={CATEGORIES} />
   *   </>
   * );
   */
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <p style={{ color: "#888", marginBottom: "0.5rem" }}>
        HOME / PRODUCTS{category !== "all" ? ` / ${category.toUpperCase().replace(/-/g, " ")}` : ""}
      </p>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        PRODUCT CATALOGUE
      </h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Active filter: <strong>{category}</strong>
      </p>
      <p style={{ color: "#aaa" }}>
        ← Replace this placeholder with the{" "}
        <code>&lt;ProductsPage&gt;</code> component once the UI is built.
      </p>
    </main>
  );
}
