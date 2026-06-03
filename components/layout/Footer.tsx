import Link from "next/link";
import { Instagram, Lock, Mail, MessageCircle, PawPrint, ShieldCheck } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";

const institucional = [
  { label: "Sobre o clube", href: "#" },
  { label: "Nossas lojas", href: "#" },
  { label: "Trabalhe conosco", href: "#" },
  { label: "Sustentabilidade", href: "#" },
];

const ajuda = [
  { label: "Trocas e devoluções", href: "#" },
  { label: "Política de privacidade", href: "#" },
  { label: "Termos de uso", href: "#" },
  { label: "Perguntas frequentes", href: "#" },
];

const pagamentos = ["Pix", "Visa", "Mastercard", "Elo", "Boleto"];

export function Footer() {
  return (
    <footer className="mt-16 bg-amazonia-ink text-zinc-300">
      <div className="bg-amazonia-green-dark">
        <div className="container flex flex-col items-start justify-between gap-5 py-8 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl uppercase text-white">
              Entre para a torcida
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Receba lançamentos e ofertas exclusivas antes de todo mundo.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="container grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-amazonia-green text-amazonia-gold ring-2 ring-amazonia-gold">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="font-display text-lg uppercase tracking-wide text-white">
              Amazônia IFC
            </span>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            Loja do Amazônia Independente Futebol Clube, o Muiraquitã da Amazônia.
            Santarém, Pará.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.instagram.com/amazoniaifc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-amazonia-gold hover:text-amazonia-ink"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-amazonia-gold hover:text-amazonia-ink"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="E-mail"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-amazonia-gold hover:text-amazonia-ink"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            Institucional
          </h4>
          <ul className="space-y-2 text-sm">
            {institucional.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-zinc-400 hover:text-amazonia-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            Ajuda
          </h4>
          <ul className="space-y-2 text-sm">
            {ajuda.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-zinc-400 hover:text-amazonia-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            Atendimento
          </h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>Seg a Sex, 9h às 18h</li>
            <li>(93) 0000-0000</li>
            <li>loja@amazoniaifc.com.br</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs uppercase tracking-wide text-zinc-500">
              Formas de pagamento
            </span>
            {pagamentos.map((p) => (
              <span
                key={p}
                className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-amazonia-ink"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amazonia-gold" />
              Compra 100% segura
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-amazonia-gold" />
              Ambiente protegido
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-1 py-4 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Amazônia Independente F.C. CNPJ 00.000.000/0001-00</p>
          <p>Projeto demonstrativo de e-commerce. Não é a loja oficial do clube.</p>
        </div>
      </div>
    </footer>
  );
}
