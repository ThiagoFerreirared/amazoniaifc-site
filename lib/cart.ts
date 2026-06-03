import type { CartItem } from "@/lib/types";

/** Valor adicional cobrado pela personalização (nome + número nas costas). */
export const PERSONALIZATION_PRICE = 39.9;

export function isPersonalized(p?: { name?: string; number?: string }): boolean {
  return Boolean(p && ((p.name && p.name.trim()) || (p.number && p.number.trim())));
}

/** Preço unitário da linha: preço do produto mais a personalização, se houver. */
export function lineUnitPrice(item: CartItem): number {
  return item.product.price + (isPersonalized(item.personalization) ? PERSONALIZATION_PRICE : 0);
}

export function lineTotal(item: CartItem): number {
  return lineUnitPrice(item) * item.qty;
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + lineTotal(item), 0);
}

/** Quantidade total de peças (soma das quantidades), para o badge do header. */
export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0);
}
