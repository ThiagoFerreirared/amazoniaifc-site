import type { Metadata } from "next";
import { ProductListing } from "@/components/category/ProductListing";
import { getAllProducts } from "@/lib/products";
import { LINES, LINE_LABELS, type Line } from "@/lib/types";

function resolveCategory(slug: string): {
  title: string;
  line: Line | null;
  promoOnly: boolean;
} {
  if (slug === "promocoes") return { title: "Promoções", line: null, promoOnly: true };
  if ((LINES as string[]).includes(slug)) {
    return { title: LINE_LABELS[slug as Line], line: slug as Line, promoOnly: false };
  }
  return { title: "Todos os produtos", line: null, promoOnly: false };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return { title: resolveCategory(params.slug).title };
}

export default async function CategoriaPage({
  params,
}: {
  params: { slug: string };
}) {
  const all = await getAllProducts();
  const { title, line, promoOnly } = resolveCategory(params.slug);

  return (
    <ProductListing
      key={params.slug}
      title={title}
      products={all}
      initialLine={line}
      promoOnly={promoOnly}
    />
  );
}
