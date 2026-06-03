import { BadgeCheck, CreditCard, QrCode, Truck } from "lucide-react";

const badges = [
  { icon: CreditCard, title: "Parcele em até 10x", text: "sem juros no cartão" },
  { icon: Truck, title: "Entrega rápida", text: "para todo o Brasil" },
  { icon: BadgeCheck, title: "Produto 100% oficial", text: "licenciado Muiraquitã" },
  { icon: QrCode, title: "Pix com desconto", text: "20% à vista" },
];

export function TrustBadges() {
  return (
    <section className="container">
      <div className="relative z-10 -mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-black/5 shadow-card md:grid-cols-4">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.title} className="flex items-center gap-3 bg-white p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amazonia-green/10 text-amazonia-green">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight text-amazonia-ink">
                  {b.title}
                </p>
                <p className="text-xs text-zinc-500">{b.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
