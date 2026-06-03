import Link from "next/link";
import { ArrowRight, Shirt, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-amazonia-green-dark text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amazonia-green/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-amazonia-gold/20 blur-3xl" />

      <div className="container relative grid items-center gap-10 py-12 md:grid-cols-2 md:py-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amazonia-gold-bright">
            <Sparkles className="h-3.5 w-3.5" />
            Novo • Temporada 2025/26
          </span>

          <h1 className="mt-4 font-display text-4xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
            Camisa I Oficial
            <span className="mt-1 block text-amazonia-gold">Muiraquitã da Amazônia</span>
          </h1>

          <p className="mt-4 max-w-md text-white/80">
            A nova camisa verde e preta já está disponível. Garanta a sua com
            personalização de nome e número nas costas.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/produto/camisa-oficial-i-2025-26"
              className="inline-flex items-center gap-2 rounded-md bg-amazonia-gold px-7 py-3.5 font-semibold text-amazonia-ink transition-all hover:bg-amazonia-gold-bright hover:shadow-lg active:scale-[0.98]"
            >
              Comprar agora
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/categoria/linha-de-jogo"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white hover:text-amazonia-green-dark"
            >
              Ver coleção
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square rotate-2 rounded-2xl bg-gradient-to-br from-amazonia-green to-amazonia-black p-8 shadow-2xl ring-1 ring-white/10">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Shirt className="h-40 w-40 text-amazonia-gold" strokeWidth={1} />
              <span className="mt-4 font-display text-xl uppercase tracking-wide text-white">
                Camisa I • 25/26
              </span>
              <span className="text-sm text-white/70">a partir de R$ 183,92 no Pix</span>
            </div>
            <span className="absolute -left-3 top-6 -rotate-6 rounded-md bg-amazonia-gold px-3 py-1 text-sm font-bold text-amazonia-ink shadow-lg">
              Lançamento
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
