import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

interface ProductShowcaseProps {
  title: string;
  subtitle?: string;
  products: Product[];
  action?: { href: string; label: string };
}

export function ProductShowcase({
  title,
  subtitle,
  products,
  action,
}: ProductShowcaseProps) {
  if (products.length === 0) return null;

  return (
    <section className="container py-10">
      <SectionTitle title={title} subtitle={subtitle} action={action} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
