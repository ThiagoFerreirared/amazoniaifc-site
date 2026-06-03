import Link from "next/link";
import { Dumbbell, Shield, Shirt, ShoppingBag } from "lucide-react";
import { LINES, LINE_LABELS, type Line } from "@/lib/types";

const icons: Record<Line, typeof Shirt> = {
  "linha-de-jogo": Shirt,
  treino: Dumbbell,
  casual: ShoppingBag,
  acessorios: Shield,
};

export function CategoryStrip() {
  return (
    <section className="container py-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {LINES.map((line) => {
          const Icon = icons[line];
          return (
            <Link
              key={line}
              href={`/categoria/${line}`}
              className="group flex items-center gap-3 rounded-xl border border-black/5 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amazonia-green text-white transition-colors group-hover:bg-amazonia-gold group-hover:text-amazonia-ink">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-base uppercase text-amazonia-ink">
                  {LINE_LABELS[line]}
                </p>
                <p className="text-xs text-zinc-500">Ver produtos</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
