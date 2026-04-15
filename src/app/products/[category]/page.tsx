import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../components/sections/Header/Header";
import ProductsPage from "../../../components/sections/Products/ProductsPage";
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

  return (
    <>
      <Header forceSolid disableBottomRightRadius />
      <ProductsPage activeCategory={category} categories={CATEGORIES} />
    </>
  );
}
