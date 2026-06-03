"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Search } from "lucide-react";

export function SearchBar({ className }: { className?: string }) {
  const [q, setQ] = useState("");

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className={clsx(
        "flex w-full items-center overflow-hidden rounded-md border border-zinc-300 bg-white focus-within:ring-2 focus-within:ring-amazonia-green/60",
        className,
      )}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Busque por camisa, treino, acessórios..."
        aria-label="Buscar produtos"
        className="w-full px-4 py-2.5 text-sm text-amazonia-ink outline-none placeholder:text-zinc-400"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="flex h-full items-center justify-center bg-amazonia-green px-4 py-2.5 text-white transition-colors hover:bg-amazonia-green-700"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
