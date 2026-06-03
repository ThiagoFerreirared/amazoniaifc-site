import { ComingSoon } from "@/components/ui/ComingSoon";
import { LINE_LABELS, type Line } from "@/lib/types";

function labelFor(slug: string): string {
  if (slug === "promocoes") return "Promoções";
  if (slug in LINE_LABELS) return LINE_LABELS[slug as Line];
  return slug;
}

export default function CategoriaPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <ComingSoon
      title={labelFor(params.slug)}
      description="A página de categoria (PLP) com sidebar de filtros (tamanho, preço, linha) chega na próxima fase."
    />
  );
}
