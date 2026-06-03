"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { Shield, Shirt, ShoppingBag } from "lucide-react";
import { Price } from "@/components/ui/Price";
import { DiscountTag } from "@/components/ui/DiscountTag";
import { emitAddToCart } from "@/lib/cart-events";
import { discountPercent } from "@/lib/format";
import { LINE_LABELS, type Product, type Swatch } from "@/lib/types";

const swatchStyles: Record<Swatch, { wrap: string; icon: string }> = {
  green: { wrap: "from-amazonia-green to-amazonia-green-dark", icon: "text-white/90" },
  white: { wrap: "from-white to-zinc-200 ring-1 ring-inset ring-zinc-200", icon: "text-amazonia-green" },
  gold: { wrap: "from-amazonia-gold to-amazonia-gold-bright", icon: "text-amazonia-ink" },
  graphite: { wrap: "from-zinc-700 to-amazonia-black", icon: "text-amazonia-gold" },
};

function ProductGlyph({ product }: { product: Product }) {
  const Icon = product.line === "acessorios" ? Shield : Shirt;
  const s = swatchStyles[product.swatch];
  return (
    <div
      className={clsx(
        "relative flex aspect-square w-full items-center justify-center bg-gradient-to-br",
        s.wrap,
      )}
    >
      <Icon className={clsx("h-20 w-20 opacity-90", s.icon)} strokeWidth={1.25} />
      <span className="pointer-events-none absolute bottom-3 select-none font-display text-[11px] uppercase tracking-[0.25em] text-current opacity-30">
        Amazônia
      </span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const off = discountPercent(product.price, product.compareAtPrice);
  const isLancamento = product.badges.includes("lancamento");
  const href = `/produto/${product.slug}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
        <DiscountTag percent={off} />
        {isLancamento ? (
          <span className="rounded-md bg-amazonia-green px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            Lançamento
          </span>
        ) : null}
      </div>

      <Link href={href} aria-label={product.name} className="block overflow-hidden">
        <div className="transition-transform duration-300 group-hover:scale-[1.03]">
          <ProductGlyph product={product} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-400">
          {LINE_LABELS[product.line]}
        </span>
        <Link
          href={href}
          className="mt-1 line-clamp-2 min-h-[2.5rem] font-semibold leading-tight text-amazonia-ink hover:text-amazonia-green"
        >
          {product.name}
        </Link>

        <div className="mt-3">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>

        <button
          type="button"
          onClick={() => emitAddToCart(product)}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-amazonia-green/30 bg-amazonia-green/5 py-2.5 text-sm font-semibold text-amazonia-green transition-colors duration-200 hover:border-amazonia-gold hover:bg-amazonia-gold hover:text-amazonia-ink"
        >
          <ShoppingBag className="h-4 w-4" />
          Comprar
        </button>
      </div>
    </div>
  );
}
