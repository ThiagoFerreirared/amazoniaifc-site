import type { CartItem } from "@/lib/types";

/**
 * Ponte leve entre quem adiciona ao carrinho (ProductCard, PDP) e o Header,
 * que mantém o estado e abre o MiniCart. Na fase de carrinho isto é
 * substituído por um store real (Context/Zustand) sem mexer na UI.
 */
export const CART_ADD_EVENT = "amazonia:cart-add";

export function emitAddToCart(item: CartItem): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<CartItem>(CART_ADD_EVENT, { detail: item }));
}
