import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../components/sections/Header/Header";
import ProductsPage from "../../../components/sections/Products/ProductsPage";
import Footer from "../../../components/Footer/Footer";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  getCategoryBySlug,
} from "../../../components/sections/Products/data/index";

export function generateStaticParams() {
  return [
    { category: "all" },
    ...CATEGORY_SLUGS.map((slug) => ({ category: slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  if (category === "all") {
    return {
      title: "Product Catalogue — All Construction Materials",
      description:
        "Browse Sohan Lal & Co.'s complete range of premium construction products — " +
        "bricks, blocks, paving solutions, facade & wall cladding, precast & architectural solutions. " +
        "50+ years of trusted quality from Punjab, India.",
      alternates: { canonical: "/products/all" },
    };
  }

  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Products" };

  return {
    title: `${cat.label} — Premium Construction Materials`,
    description:
      `Explore Sohan Lal & Co.'s ${cat.label} — premium quality construction materials ` +
      `engineered for lasting performance. Trusted by builders across India for 50+ years.`,
    alternates: { canonical: `/products/${cat.slug}` },
  };
}

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
      <Footer />
    </>
  );
}
