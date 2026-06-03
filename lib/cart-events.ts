import type { Product } from "@/lib/types";

/**
 * Ponte leve para a Fase 1: o ProductCard emite um evento ao clicar em
 * "Comprar" e o Header abre o MiniCart. Na fase de carrinho isto é
 * substituído por um store real (Context/Zustand) sem mexer na UI.
 */
export const CART_ADD_EVENT = "amazonia:cart-add";

export function emitAddToCart(product: Product): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<Product>(CART_ADD_EVENT, { detail: product }));
}
