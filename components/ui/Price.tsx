import { clsx } from "clsx";
import { discountPercent, formatBRL, parcela, precoPix } from "@/lib/format";

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  installments?: number;
  pixPct?: number;
  className?: string;
}

export function Price({
  price,
  compareAtPrice,
  installments = 10,
  pixPct = 0.2,
  className,
}: PriceProps) {
  const pix = precoPix(price, pixPct);
  const each = parcela(price, installments);
  const off = discountPercent(price, compareAtPrice);

  return (
    <div className={clsx("flex flex-col", className)}>
      {compareAtPrice && off > 0 ? (
        <span className="text-xs text-zinc-400 line-through">
          {formatBRL(compareAtPrice)}
        </span>
      ) : null}

      <div className="flex items-baseline gap-1.5">
        <span className="text-xl font-bold text-amazonia-green">
          {formatBRL(pix)}
        </span>
        <span className="text-xs font-medium text-zinc-500">no Pix</span>
      </div>

      <span className="mt-0.5 text-xs text-zinc-500">
        ou {formatBRL(price)} em {installments}x de {formatBRL(each)} sem juros
      </span>
    </div>
  );
}
