"use client";

import { clsx } from "clsx";
import { ALL_SIZES, PRICE_BUCKETS } from "./filters";
import { LINES, LINE_LABELS } from "@/lib/types";

type Group = "line" | "size" | "bucket";

interface FilterPanelProps {
  selectedLines: string[];
  selectedSizes: string[];
  selectedBuckets: string[];
  onToggle: (group: Group, value: string) => void;
  onClear: () => void;
  hasActive: boolean;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-black/5 py-5 first:border-t-0 first:pt-0">
      <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-amazonia-ink">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Check({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-zinc-700 hover:text-amazonia-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-amazonia-green"
      />
      {label}
    </label>
  );
}

export function FilterPanel({
  selectedLines,
  selectedSizes,
  selectedBuckets,
  onToggle,
  onClear,
  hasActive,
}: FilterPanelProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-lg uppercase text-amazonia-ink">Filtros</span>
        {hasActive ? (
          <button
            onClick={onClear}
            className="text-xs font-semibold text-amazonia-green hover:text-amazonia-green-700"
          >
            Limpar
          </button>
        ) : null}
      </div>

      <Section title="Linha">
        {LINES.map((line) => (
          <Check
            key={line}
            label={LINE_LABELS[line]}
            checked={selectedLines.includes(line)}
            onChange={() => onToggle("line", line)}
          />
        ))}
      </Section>

      <Section title="Tamanho">
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => onToggle("size", sz)}
              className={clsx(
                "h-9 w-10 rounded-md border text-sm font-semibold transition-colors",
                selectedSizes.includes(sz)
                  ? "border-amazonia-green bg-amazonia-green text-white"
                  : "border-zinc-300 text-amazonia-ink hover:border-amazonia-green",
              )}
            >
              {sz}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Preço">
        {PRICE_BUCKETS.map((b) => (
          <Check
            key={b.id}
            label={b.label}
            checked={selectedBuckets.includes(b.id)}
            onChange={() => onToggle("bucket", b.id)}
          />
        ))}
      </Section>
    </div>
  );
}
