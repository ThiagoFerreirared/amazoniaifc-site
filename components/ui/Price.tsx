import { clsx } from "clsx";
import { discountPercent, formatBRL, parcela, precoPix } from "@/lib/format";

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  installments?: number;
  pixPct?: number;
  size?: "md" | "lg";
  className?: string;
}

export function Price({
  price,
  compareAtPrice,
  installments = 10,
  pixPct = 0.2,
  size = "md",
  className,
}: PriceProps) {
  const pix = precoPix(price, pixPct);
  const each = parcela(price, installments);
  const off = discountPercent(price, compareAtPrice);
  const mainCls = size === "lg" ? "text-3xl" : "text-xl";
  const subCls = size === "lg" ? "text-sm" : "text-xs";

  return (
    <div className={clsx("flex flex-col", className)}>
      {compareAtPrice && off > 0 ? (
        <span className={clsx("text-zinc-400 line-through", subCls)}>
          {formatBRL(compareAtPrice)}
        </span>
      ) : null}

      <div className="flex items-baseline gap-1.5">
        <span className={clsx("font-bold text-amazonia-green", mainCls)}>
          {formatBRL(pix)}
        </span>
        <span className={clsx("font-medium text-zinc-500", subCls)}>no Pix</span>
      </div>

      <span className={clsx("mt-0.5 text-zinc-500", subCls)}>
        ou {formatBRL(price)} em {installments}x de {formatBRL(each)} sem juros
      </span>
    </div>
  );
}
