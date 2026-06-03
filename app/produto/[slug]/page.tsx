import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { getByLine, getBySlug } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getBySlug(params.slug);
  if (!product) return { title: "Produto não encontrado" };
  return { title: product.name, description: product.description };
}

export default async function ProdutoPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getBySlug(params.slug);
  if (!product) notFound();

  const related = (await getByLine(product.line))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <ProductDetail product={product} />
      <ProductShowcase
        title="Você também pode gostar"
        products={related}
        action={{ href: `/categoria/${product.line}`, label: "Ver tudo" }}
      />
    </>
  );
}
