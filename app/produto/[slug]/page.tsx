import { ComingSoon } from "@/components/ui/ComingSoon";
import { getBySlug } from "@/lib/products";

export default async function ProdutoPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getBySlug(params.slug);

  return (
    <ComingSoon
      title={product ? product.name : "Página de Produto"}
      description="A PDP (galeria, seleção de tamanho, tabela de medidas e personalização com nome e número) será construída na próxima fase, mediante autorização."
    />
  );
}
