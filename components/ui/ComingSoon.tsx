import Link from "next/link";
import { ArrowLeft, Hammer } from "lucide-react";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="container flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-amazonia-green/10 text-amazonia-green">
        <Hammer className="h-8 w-8" />
      </span>
      <h1 className="font-display text-3xl uppercase text-amazonia-ink">{title}</h1>
      {description ? (
        <p className="mt-2 max-w-md text-zinc-500">{description}</p>
      ) : null}
      <Link href="/" className="btn-outline mt-7">
        <ArrowLeft className="h-4 w-4" />
        Voltar para a Home
      </Link>
    </section>
  );
}
