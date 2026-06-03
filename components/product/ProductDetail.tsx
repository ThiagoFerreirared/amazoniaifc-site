"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import {
  ChevronRight,
  Minus,
  Plus,
  RefreshCw,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { ProductGallery } from "./ProductGallery";
import { SizeChartModal } from "./SizeChart";
import { Price } from "@/components/ui/Price";
import { DiscountTag } from "@/components/ui/DiscountTag";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { PERSONALIZATION_PRICE, isPersonalized } from "@/lib/cart";
import { discountPercent, formatBRL } from "@/lib/format";
import { LINE_LABELS, type Product } from "@/lib/types";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const sizes = product.sizes ?? [];
  const hasRealSizes = sizes.length > 0 && !(sizes.length === 1 && sizes[0] === "Único");
  const canPersonalize = product.line === "linha-de-jogo";

  const [size, setSize] = useState<string | null>(hasRealSizes ? null : sizes[0] ?? null);
  const [qty, setQty] = useState(1);
  const [personalize, setPersonalize] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [chartOpen, setChartOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const personalization =
    personalize && canPersonalize
      ? { name: name.trim() || undefined, number: number.trim() || undefined }
      : undefined;
  const personalized = isPersonalized(personalization);
  const unit = product.price + (personalized ? PERSONALIZATION_PRICE : 0);
  const total = unit * qty;
  const off = discountPercent(product.price, product.compareAtPrice);

  function handleAdd() {
    if (hasRealSizes && !size) {
      setError("Selecione um tamanho para continuar.");
      return;
    }
    setError(null);
    addItem({
      product,
      qty,
      size: size ?? undefined,
      personalization: personalized ? personalization : undefined,
    });
  }

  return (
    <div className="container py-6 lg:py-10">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-zinc-500">
        <Link href="/" className="hover:text-amazonia-green">
          Início
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/categoria/${product.line}`} className="hover:text-amazonia-green">
          {LINE_LABELS[product.line]}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-700">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative">
          {off > 0 ? (
            <DiscountTag percent={off} className="absolute left-3 top-3 z-10 text-sm" />
          ) : null}
          <ProductGallery
            product={product}
            personalization={personalized ? personalization : undefined}
          />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-amazonia-green">
            {product.brand}
          </span>
          <h1 className="mt-1 font-display text-3xl uppercase leading-tight text-amazonia-ink sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-amazonia-green/10 px-2 py-0.5 font-medium text-amazonia-green">
              <ShieldCheck className="h-3.5 w-3.5" /> Produto oficial
            </span>
            <span>{LINE_LABELS[product.line]}</span>
          </div>

          <div className="mt-5 rounded-xl border border-black/5 bg-white p-5 shadow-card">
            <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
          </div>

          {hasRealSizes ? (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-amazonia-ink">
                  Tamanho{size ? `: ${size}` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => setChartOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amazonia-green hover:text-amazonia-green-700"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  Tabela de medidas
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => {
                      setSize(sz);
                      setError(null);
                    }}
                    className={clsx(
                      "min-w-[3rem] rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors",
                      size === sz
                        ? "border-amazonia-green bg-amazonia-green text-white"
                        : "border-zinc-300 text-amazonia-ink hover:border-amazonia-green",
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-zinc-500">Tamanho único</p>
          )}

          {canPersonalize ? (
            <div className="mt-6 rounded-xl border border-black/10 p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={personalize}
                  onChange={(e) => setPersonalize(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-amazonia-green"
                />
                <span>
                  <span className="block text-sm font-semibold text-amazonia-ink">
                    Personalizar nome e número
                    <span className="ml-2 rounded bg-amazonia-gold/20 px-1.5 py-0.5 text-xs font-bold text-amazonia-ink">
                      + {formatBRL(PERSONALIZATION_PRICE)}
                    </span>
                  </span>
                  <span className="block text-xs text-zinc-500">
                    Seu nome e número impressos nas costas da camisa.
                  </span>
                </span>
              </label>

              {personalize ? (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="mb-1 block text-xs font-medium text-zinc-500">
                      Nome
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value.toUpperCase().slice(0, 12))}
                      placeholder="SEU NOME"
                      maxLength={12}
                      className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm uppercase tracking-wide outline-none focus:ring-2 focus:ring-amazonia-green/60"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-500">
                      Número
                    </label>
                    <input
                      value={number}
                      inputMode="numeric"
                      onChange={(e) => setNumber(e.target.value.replace(/\D/g, "").slice(0, 2))}
                      placeholder="10"
                      className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amazonia-green/60"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-md border border-zinc-300">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="px-3 py-2.5 text-zinc-600 hover:text-amazonia-green disabled:opacity-40"
                disabled={qty <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                aria-label="Aumentar quantidade"
                className="px-3 py-2.5 text-zinc-600 hover:text-amazonia-green disabled:opacity-40"
                disabled={qty >= 10}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="text-sm text-zinc-500">
              Total:{" "}
              <span className="text-lg font-bold text-amazonia-ink">{formatBRL(total)}</span>
            </div>
          </div>

          {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

          <Button onClick={handleAdd} variant="gold" size="lg" className="mt-4 w-full">
            <ShoppingBag className="h-5 w-5" />
            Adicionar ao carrinho
          </Button>

          <ul className="mt-6 grid gap-2 text-sm text-zinc-600 sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-amazonia-green" /> Entrega Brasil
            </li>
            <li className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-amazonia-green" /> Troca em 30 dias
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amazonia-green" /> Compra segura
            </li>
          </ul>
        </div>
      </div>

      {product.description ? (
        <div className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl uppercase text-amazonia-ink">Descrição</h2>
          <p className="mt-3 leading-relaxed text-zinc-600">{product.description}</p>
        </div>
      ) : null}

      <SizeChartModal open={chartOpen} onClose={() => setChartOpen(false)} />
    </div>
  );
}
