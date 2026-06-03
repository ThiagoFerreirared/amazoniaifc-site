import { clsx } from "clsx";
import { Shield, Shirt } from "lucide-react";
import type { Product, Swatch } from "@/lib/types";

/** Estilo do placeholder visual por cor base do produto (até termos as fotos). */
export const swatchStyles: Record<Swatch, { wrap: string; icon: string }> = {
  green: { wrap: "from-amazonia-green to-amazonia-green-dark", icon: "text-white/90" },
  white: {
    wrap: "from-white to-zinc-200 ring-1 ring-inset ring-zinc-200",
    icon: "text-amazonia-green",
  },
  gold: { wrap: "from-amazonia-gold to-amazonia-gold-bright", icon: "text-amazonia-ink" },
  graphite: { wrap: "from-zinc-700 to-amazonia-black", icon: "text-amazonia-gold" },
};

export function productIcon(product: Product) {
  return product.line === "acessorios" ? Shield : Shirt;
}

export function ProductGlyph({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const Icon = productIcon(product);
  const s = swatchStyles[product.swatch];
  return (
    <div
      className={clsx(
        "relative flex aspect-square w-full items-center justify-center bg-gradient-to-br",
        s.wrap,
        className,
      )}
    >
      <Icon className={clsx("h-20 w-20 opacity-90", s.icon)} strokeWidth={1.25} />
      <span className="pointer-events-none absolute bottom-3 select-none font-display text-[11px] uppercase tracking-[0.25em] text-current opacity-30">
        Amazônia
      </span>
    </div>
  );
}
