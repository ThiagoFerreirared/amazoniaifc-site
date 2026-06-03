"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ProductGlyph } from "./ProductMedia";
import { Price } from "@/components/ui/Price";
import { DiscountTag } from "@/components/ui/DiscountTag";
import { useCart } from "@/components/cart/CartProvider";
import { discountPercent } from "@/lib/format";
import { LINE_LABELS, type Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
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
          onClick={() => addItem({ product, qty: 1 })}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-amazonia-green/30 bg-amazonia-green/5 py-2.5 text-sm font-semibold text-amazonia-green transition-colors duration-200 hover:border-amazonia-gold hover:bg-amazonia-gold hover:text-amazonia-ink"
        >
          <ShoppingBag className="h-4 w-4" />
          Comprar
        </button>
      </div>
    </div>
  );
}
