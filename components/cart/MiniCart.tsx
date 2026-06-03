"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { productIcon, swatchStyles } from "@/components/product/ProductMedia";
import { Button } from "@/components/ui/Button";
import { cartSubtotal, lineUnitPrice } from "@/lib/cart";
import { formatBRL } from "@/lib/format";
import type { CartItem } from "@/lib/types";

interface MiniCartProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (index: number) => void;
}

export function MiniCart({ open, items, onClose, onRemove }: MiniCartProps) {
  const subtotal = cartSubtotal(items);

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-label="Meu carrinho"
        className={clsx(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-lg uppercase text-amazonia-ink">
            <ShoppingBag className="h-5 w-5 text-amazonia-green" />
            Meu carrinho
          </h2>
          <button onClick={onClose} aria-label="Fechar carrinho" className="rounded p-1 hover:bg-black/5">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-zinc-500">
              <ShoppingBag className="mb-3 h-12 w-12 text-zinc-300" />
              <p className="font-medium">Seu carrinho está vazio</p>
              <p className="mt-1 text-sm">Adicione produtos clicando em “Comprar”.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item, i) => {
                const s = swatchStyles[item.product.swatch];
                const Icon = productIcon(item.product);
                const perso = item.personalization;
                return (
                  <li key={`${item.product.id}-${i}`} className="flex gap-3 rounded-lg border border-black/5 p-3">
                    <div className={clsx("grid h-14 w-14 shrink-0 place-items-center rounded-md bg-gradient-to-br", s.wrap)}>
                      <Icon className={clsx("h-6 w-6", s.icon)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-amazonia-ink">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {item.size ? `Tam: ${item.size}` : null}
                        {item.size ? " · " : null}
                        {item.qty}x
                      </p>
                      {perso && (perso.name || perso.number) ? (
                        <p className="truncate text-xs text-amazonia-green">
                          {perso.name ? perso.name : null}
                          {perso.name && perso.number ? " · " : null}
                          {perso.number ? `Nº ${perso.number}` : null}
                        </p>
                      ) : null}
                      <p className="mt-0.5 text-sm font-semibold text-amazonia-green">
                        {formatBRL(lineUnitPrice(item) * item.qty)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(i)}
                      aria-label={`Remover ${item.product.name}`}
                      className="h-fit rounded p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-black/10 px-5 py-4">
          <div className="mb-3">
            <label className="mb-1 block text-xs font-medium text-zinc-500">
              Calcular frete (CEP)
            </label>
            <div className="flex gap-2">
              <input
                inputMode="numeric"
                placeholder="00000-000"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amazonia-green/60"
              />
              <button className="shrink-0 rounded-md border border-amazonia-green px-3 py-2 text-sm font-semibold text-amazonia-green hover:bg-amazonia-green hover:text-white">
                Calcular
              </button>
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-500">Subtotal</span>
            <span className="text-lg font-bold text-amazonia-ink">{formatBRL(subtotal)}</span>
          </div>

          <Link href="/checkout" className="block">
            <Button variant="green" className="w-full" disabled={items.length === 0}>
              Finalizar compra
            </Button>
          </Link>
          <p className="mt-2 text-center text-[11px] text-zinc-400">
            Frete e pagamento são calculados no checkout.
          </p>
        </div>
      </aside>
    </>
  );
}
