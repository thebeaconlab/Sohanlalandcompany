import { redirect } from "next/navigation";

/**
 * /products  →  redirect to /products/all
 * "all" is the default active filter that shows every category.
 */
export default function ProductsRoot() {
  redirect("/products/all");
}
