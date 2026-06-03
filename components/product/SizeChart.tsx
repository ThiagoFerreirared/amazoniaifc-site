"use client";

import { clsx } from "clsx";
import { Ruler, X } from "lucide-react";

const SIZE_ROWS = [
  { size: "P", chest: 50, length: 70 },
  { size: "M", chest: 53, length: 72 },
  { size: "G", chest: 56, length: 74 },
  { size: "GG", chest: 59, length: 76 },
];

export function SizeChartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-[80] bg-black/50 transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-label="Tabela de medidas"
        className={clsx(
          "fixed left-1/2 top-1/2 z-[90] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-xl uppercase text-amazonia-ink">
            <Ruler className="h-5 w-5 text-amazonia-green" />
            Tabela de medidas
          </h3>
          <button onClick={onClose} aria-label="Fechar" className="rounded p-1 hover:bg-black/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="py-2">Tamanho</th>
              <th className="py-2">Largura (cm)</th>
              <th className="py-2">Comprimento (cm)</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_ROWS.map((r) => (
              <tr key={r.size} className="border-b border-black/5">
                <td className="py-2.5 font-bold text-amazonia-ink">{r.size}</td>
                <td className="py-2.5 text-zinc-600">{r.chest}</td>
                <td className="py-2.5 text-zinc-600">{r.length}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 text-xs text-zinc-400">
          Medidas aproximadas com a peça plana. Pode haver variação de 1 a 2 cm.
        </p>
      </div>
    </>
  );
}
