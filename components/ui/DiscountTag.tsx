import { clsx } from "clsx";

interface DiscountTagProps {
  percent: number;
  className?: string;
}

export function DiscountTag({ percent, className }: DiscountTagProps) {
  if (percent <= 0) return null;
  return (
    <span
      className={clsx(
        "rounded-md bg-amazonia-gold px-2 py-1 text-xs font-bold text-amazonia-ink shadow-sm",
        className,
      )}
    >
      -{percent}%
    </span>
  );
}
