"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { ChevronRight, PackageOpen, SlidersHorizontal, X } from "lucide-react";
import { FilterPanel } from "./FilterPanel";
import { PRICE_BUCKETS, SORTS, type SortId } from "./filters";
import { ProductCard } from "@/components/product/ProductCard";
import { discountPercent } from "@/lib/format";
import type { Line, Product } from "@/lib/types";

type Group = "line" | "size" | "bucket";

interface ProductListingProps {
  title: string;
  products: Product[];
  initialLine: Line | null;
  promoOnly: boolean;
}

export function ProductListing({
  title,
  products,
  initialLine,
  promoOnly,
}: ProductListingProps) {
  const [selectedLines, setSelectedLines] = useState<string[]>(
    initialLine ? [initialLine] : [],
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBuckets, setSelectedBuckets] = useState<string[]>([]);
  const [sort, setSort] = useState<SortId>("relevancia");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const setterFor: Record<Group, React.Dispatch<React.SetStateAction<string[]>>> = {
    line: setSelectedLines,
    size: setSelectedSizes,
    bucket: setSelectedBuckets,
  };

  function onToggle(group: Group, value: string) {
    setterFor[group]((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  function clearFilters() {
    setSelectedLines([]);
    setSelectedSizes([]);
    setSelectedBuckets([]);
  }

  const hasActive =
    selectedLines.length > 0 || selectedSizes.length > 0 || selectedBuckets.length > 0;

  const filtered = useMemo(() => {
    let list = promoOnly
      ? products.filter((p) => discountPercent(p.price, p.compareAtPrice) > 0)
      : products.slice();

    if (selectedLines.length) {
      list = list.filter((p) => selectedLines.includes(p.line));
    }
    if (selectedSizes.length) {
      list = list.filter((p) => (p.sizes ?? []).some((s) => selectedSizes.includes(s)));
    }
    if (selectedBuckets.length) {
      const active = PRICE_BUCKETS.filter((b) => selectedBuckets.includes(b.id));
      list = list.filter((p) => active.some((b) => p.price >= b.min && p.price < b.max));
    }

    switch (sort) {
      case "menor-preco":
        list.sort((a, b) => a.price - b.price);
        break;
      case "maior-preco":
        list.sort((a, b) => b.price - a.price);
        break;
      case "nome":
        list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
        break;
    }
    return list;
  }, [products, promoOnly, selectedLines, selectedSizes, selectedBuckets, sort]);

  return (
    <div className="container py-6 lg:py-10">
      <nav className="mb-5 flex flex-wrap items-center gap-1 text-xs text-zinc-500">
        <Link href="/" className="hover:text-amazonia-green">
          Início
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-700">{title}</span>
      </nav>

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase text-amazonia-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-amazonia-ink hover:border-amazonia-green lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {hasActive ? (
              <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-amazonia-green px-1 text-[11px] font-bold text-white">
                {selectedLines.length + selectedSizes.length + selectedBuckets.length}
              </span>
            ) : null}
          </button>

          <label className="sr-only" htmlFor="sort">
            Ordenar
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-amazonia-ink outline-none focus:ring-2 focus:ring-amazonia-green/60"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <FilterPanel
            selectedLines={selectedLines}
            selectedSizes={selectedSizes}
            selectedBuckets={selectedBuckets}
            onToggle={onToggle}
            onClear={clearFilters}
            hasActive={hasActive}
          />
        </aside>

        <div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 py-20 text-center">
              <PackageOpen className="mb-3 h-12 w-12 text-zinc-300" />
              <p className="font-medium text-amazonia-ink">Nenhum produto encontrado</p>
              <p className="mt-1 text-sm text-zinc-500">
                Tente ajustar ou limpar os filtros.
              </p>
              {hasActive ? (
                <button
                  onClick={clearFilters}
                  className="btn-outline mt-5"
                >
                  Limpar filtros
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div
        aria-hidden
        onClick={() => setDrawerOpen(false)}
        className={clsx(
          "fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 lg:hidden",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-label="Filtros"
        className={clsx(
          "fixed left-0 top-0 z-[70] flex h-full w-full max-w-xs flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <span className="font-display text-lg uppercase text-amazonia-ink">Filtros</span>
          <button onClick={() => setDrawerOpen(false)} aria-label="Fechar filtros" className="rounded p-1 hover:bg-black/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FilterPanel
            selectedLines={selectedLines}
            selectedSizes={selectedSizes}
            selectedBuckets={selectedBuckets}
            onToggle={onToggle}
            onClear={clearFilters}
            hasActive={hasActive}
          />
        </div>
        <div className="border-t border-black/10 p-4">
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-full rounded-md bg-amazonia-green py-3 font-semibold text-white hover:bg-amazonia-green-700"
          >
            Ver {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
          </button>
        </div>
      </aside>
    </div>
  );
}
