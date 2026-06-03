"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { PawPrint, Shirt } from "lucide-react";
import { productIcon, swatchStyles } from "./ProductMedia";
import type { Product } from "@/lib/types";

interface Personalization {
  name?: string;
  number?: string;
}

const VIEWS = ["frente", "costas", "detalhe", "escudo"] as const;
type View = (typeof VIEWS)[number];
const VIEW_LABELS: Record<View, string> = {
  frente: "Frente",
  costas: "Costas",
  detalhe: "Detalhe",
  escudo: "Escudo",
};

export function ProductGallery({
  product,
  personalization,
}: {
  product: Product;
  personalization?: Personalization;
}) {
  const [view, setView] = useState<View>("frente");
  const s = swatchStyles[product.swatch];
  const Icon = productIcon(product);
  const showPerso = Boolean(personalization && (personalization.name || personalization.number));

  return (
    <div className="flex flex-col gap-3">
      <div
        className={clsx(
          "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br",
          s.wrap,
        )}
      >
        {view === "costas" ? (
          <>
            <Shirt className={clsx("h-56 w-56", s.icon)} strokeWidth={0.8} />
            {showPerso ? (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className={clsx("font-display text-xl uppercase tracking-[0.2em]", s.icon)}>
                  {(personalization?.name || "").slice(0, 12) || "SEU NOME"}
                </span>
                <span className={clsx("font-display text-7xl leading-none", s.icon)}>
                  {(personalization?.number || "").slice(0, 2) || "10"}
                </span>
              </div>
            ) : null}
          </>
        ) : view === "escudo" ? (
          <PawPrint className={clsx("h-48 w-48", s.icon)} strokeWidth={0.8} />
        ) : (
          <Icon
            className={clsx(view === "detalhe" ? "h-64 w-64" : "h-56 w-56", s.icon)}
            strokeWidth={0.8}
          />
        )}
        <span className={clsx("pointer-events-none absolute bottom-4 left-4 select-none font-display text-xs uppercase tracking-[0.3em] opacity-40", s.icon)}>
          Amazônia • {VIEW_LABELS[view]}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {VIEWS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            aria-label={VIEW_LABELS[v]}
            className={clsx(
              "relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br transition",
              s.wrap,
              view === v
                ? "ring-2 ring-amazonia-green ring-offset-2"
                : "opacity-80 hover:opacity-100",
            )}
          >
            {v === "escudo" ? (
              <PawPrint className={clsx("h-8 w-8", s.icon)} />
            ) : (
              <Shirt className={clsx("h-8 w-8", s.icon)} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
