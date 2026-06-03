import Link from "next/link";
import { Flame } from "lucide-react";
import { LINES, LINE_LABELS } from "@/lib/types";

export function MainNav() {
  return (
    <nav className="hidden border-t border-black/5 bg-white md:block">
      <div className="container flex items-center">
        {LINES.map((line) => (
          <Link
            key={line}
            href={`/categoria/${line}`}
            className="px-4 py-3 text-sm font-semibold uppercase tracking-wide text-amazonia-ink transition-colors hover:text-amazonia-green"
          >
            {LINE_LABELS[line]}
          </Link>
        ))}
        <Link
          href="/categoria/promocoes"
          className="ml-auto flex items-center gap-1.5 px-4 py-3 text-sm font-bold uppercase tracking-wide text-amazonia-green hover:text-amazonia-green-700"
        >
          <Flame className="h-4 w-4 text-amazonia-gold" />
          Promoções
        </Link>
      </div>
    </nav>
  );
}
