import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
}

export function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-7 w-1.5 rounded-full bg-amazonia-gold" />
          <h2 className="font-display text-2xl uppercase tracking-wide text-amazonia-ink sm:text-3xl">
            {title}
          </h2>
        </div>
        {subtitle ? (
          <p className="mt-1 pl-[18px] text-sm text-zinc-500">{subtitle}</p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-amazonia-green hover:text-amazonia-green-700"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
