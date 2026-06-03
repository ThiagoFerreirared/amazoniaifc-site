"use client";

import { clsx } from "clsx";
import { Check } from "lucide-react";

const STEPS = ["Identificação", "Entrega", "Pagamento"];

export function Stepper({ current }: { current: number }) {
  return (
    <ol className="mb-8 flex items-center">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold",
                  done
                    ? "bg-amazonia-green text-white"
                    : active
                      ? "bg-amazonia-green text-white ring-4 ring-amazonia-green/20"
                      : "bg-zinc-200 text-zinc-500",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={clsx(
                  "hidden text-sm font-semibold sm:block",
                  active || done ? "text-amazonia-ink" : "text-zinc-400",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 ? (
              <span
                className={clsx(
                  "mx-3 h-0.5 flex-1",
                  done ? "bg-amazonia-green" : "bg-zinc-200",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
