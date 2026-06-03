"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, PawPrint, ShoppingBag, User, X } from "lucide-react";
import { Topbar } from "./Topbar";
import { SearchBar } from "./SearchBar";
import { MainNav } from "./MainNav";
import { MiniCart } from "@/components/cart/MiniCart";
import { CART_ADD_EVENT } from "@/lib/cart-events";
import { cartCount } from "@/lib/cart";
import { LINES, LINE_LABELS, type CartItem } from "@/lib/types";

export function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    function onAdd(e: Event) {
      const item = (e as CustomEvent<CartItem>).detail;
      setItems((prev) => [...prev, item]);
      setCartOpen(true);
    }
    window.addEventListener(CART_ADD_EVENT, onAdd as EventListener);
    return () => window.removeEventListener(CART_ADD_EVENT, onAdd as EventListener);
  }, []);

  const count = cartCount(items);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <Topbar />

      <div className="border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="container flex items-center gap-3 py-3 sm:gap-4">
          <button
            className="rounded-md p-2 hover:bg-black/5 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-amazonia-green text-amazonia-gold ring-2 ring-amazonia-gold">
              <PawPrint className="h-6 w-6" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg uppercase tracking-wide text-amazonia-green">
                Amazônia
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Independente F.C.
              </span>
            </span>
          </Link>

          <div className="hidden flex-1 md:block">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link
              href="/conta"
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-amazonia-ink hover:bg-black/5"
            >
              <User className="h-5 w-5" />
              <span className="hidden text-left leading-tight lg:block">
                <span className="block text-[11px] text-zinc-500">Olá, entre</span>
                <span className="block font-semibold">Minha conta</span>
              </span>
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-md px-2 py-2 hover:bg-black/5"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="h-6 w-6 text-amazonia-ink" />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-amazonia-gold px-1 text-[11px] font-bold text-amazonia-ink">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        <div className="container pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>

      <MainNav />

      {mobileOpen ? (
        <nav className="border-b border-black/5 bg-white md:hidden">
          <div className="container flex flex-col py-2">
            {LINES.map((line) => (
              <Link
                key={line}
                href={`/categoria/${line}`}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-semibold uppercase tracking-wide text-amazonia-ink hover:text-amazonia-green"
              >
                {LINE_LABELS[line]}
              </Link>
            ))}
            <Link
              href="/categoria/promocoes"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-sm font-bold uppercase tracking-wide text-amazonia-green"
            >
              Promoções
            </Link>
          </div>
        </nav>
      ) : null}

      <MiniCart
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onRemove={(i) => setItems((prev) => prev.filter((_, idx) => idx !== i))}
      />
    </header>
  );
}
