/** Formata um número como moeda brasileira (R$). */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/** Preço à vista no Pix (desconto padrão de 20%, como na loja real). */
export function precoPix(price: number, pct = 0.2): number {
  return price * (1 - pct);
}

/** Valor de cada parcela no parcelamento sem juros (padrão 10x). */
export function parcela(price: number, installments = 10): number {
  return price / installments;
}

/** Percentual de desconto entre preço "de" e preço "por". */
export function discountPercent(price: number, compareAtPrice?: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round((1 - price / compareAtPrice) * 100);
}
