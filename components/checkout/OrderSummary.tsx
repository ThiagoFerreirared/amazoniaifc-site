"use client";

import { clsx } from "clsx";
import { productIcon, swatchStyles } from "@/components/product/ProductMedia";
import { lineUnitPrice } from "@/lib/cart";
import { formatBRL } from "@/lib/format";
import type { CartItem } from "@/lib/types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  frete: number | null;
  pixDiscount: number;
  total: number;
  freteGratis?: boolean;
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className={accent ? "font-medium text-amazonia-green" : "text-amazonia-ink"}>
        {value}
      </span>
    </div>
  );
}

export function OrderSummary({
  items,
  subtotal,
  frete,
  pixDiscount,
  total,
  freteGratis,
}: OrderSummaryProps) {
  return (
    <aside className="h-fit rounded-xl border border-black/5 bg-white p-5 shadow-card lg:sticky lg:top-44">
      <h2 className="mb-4 font-display text-lg uppercase text-amazonia-ink">
        Resumo do pedido
      </h2>

      <ul className="mb-4 flex flex-col gap-3">
        {items.map((item, i) => {
          const s = swatchStyles[item.product.swatch];
          const Icon = productIcon(item.product);
          const perso =
            item.personalization &&
            (item.personalization.name || item.personalization.number);
          return (
            <li key={i} className="flex gap-3">
              <div className={clsx("relative grid h-12 w-12 shrink-0 place-items-center rounded-md bg-gradient-to-br", s.wrap)}>
                <Icon className={clsx("h-5 w-5", s.icon)} />
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-amazonia-green px-1 text-[11px] font-bold text-white">
                  {item.qty}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-amazonia-ink">
                  {item.product.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {item.size ? `Tam ${item.size}` : "Tam único"}
                  {perso ? " · personalizado" : ""}
                </p>
              </div>
              <span className="text-sm font-semibold text-amazonia-ink">
                {formatBRL(lineUnitPrice(item) * item.qty)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="space-y-1.5 border-t border-black/5 pt-4 text-sm">
        <Row label="Subtotal" value={formatBRL(subtotal)} />
        {pixDiscount > 0 ? (
          <Row label="Desconto Pix (20%)" value={`- ${formatBRL(pixDiscount)}`} accent />
        ) : null}
        <Row
          label="Frete"
          value={
            frete === null ? "a calcular" : freteGratis ? "Grátis" : formatBRL(frete)
          }
        />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
        <span className="font-semibold text-amazonia-ink">Total</span>
        <span className="font-display text-2xl text-amazonia-green">
          {formatBRL(total)}
        </span>
      </div>
    </aside>
  );
}
