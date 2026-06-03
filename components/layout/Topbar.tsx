import { BadgeCheck, CreditCard, QrCode, Truck } from "lucide-react";

const avisos = [
  { icon: Truck, text: "Frete grátis acima de R$ 299" },
  { icon: QrCode, text: "Pix com 20% de desconto" },
  { icon: BadgeCheck, text: "Produto 100% oficial Muiraquitã" },
  { icon: CreditCard, text: "Em até 10x sem juros" },
];

export function Topbar() {
  return (
    <div className="bg-amazonia-green-dark text-white">
      <div className="container overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 py-2 text-xs font-medium">
          {[...avisos, ...avisos].map((a, i) => {
            const Icon = a.icon;
            return (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap">
                <Icon className="h-3.5 w-3.5 text-amazonia-gold-bright" />
                {a.text}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
