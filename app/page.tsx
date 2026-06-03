import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { getBestSellers, getFeatured } from "@/lib/products";

export default async function HomePage() {
  const [lancamentos, maisVendidos] = await Promise.all([
    getFeatured(),
    getBestSellers(),
  ]);

  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryStrip />

      <ProductShowcase
        title="Lançamentos"
        subtitle="As novidades da temporada 2025/26"
        products={lancamentos}
        action={{ href: "/categoria/linha-de-jogo", label: "Ver tudo" }}
      />

      <ProductShowcase
        title="Mais Vendidos"
        subtitle="Os preferidos da torcida"
        products={maisVendidos}
        action={{ href: "/categoria/promocoes", label: "Ver tudo" }}
      />
    </>
  );
}
