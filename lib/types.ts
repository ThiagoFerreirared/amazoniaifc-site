export type Line = "linha-de-jogo" | "treino" | "casual" | "acessorios";

export type ProductBadge = "lancamento" | "mais-vendido";

/** Cor base do placeholder visual do produto (até termos as fotos reais). */
export type Swatch = "green" | "white" | "gold" | "graphite";

export interface Product {
  id: string;
  slug: string;
  name: string;
  line: Line;
  /** Preço de tabela em BRL (ex.: 229.9). */
  price: number;
  /** Preço "de" para cálculo de desconto, quando houver. */
  compareAtPrice?: number;
  brand: string;
  badges: ProductBadge[];
  sizes?: string[];
  swatch: Swatch;
  /** true = dado conferido nas fontes oficiais; false = extrapolação coerente. */
  verified: boolean;
  description?: string;
}

export interface CartItem {
  product: Product;
  qty: number;
  size?: string;
  personalization?: { name?: string; number?: string };
}

export const LINE_LABELS: Record<Line, string> = {
  "linha-de-jogo": "Linha de Jogo",
  treino: "Treino",
  casual: "Casual",
  acessorios: "Acessórios",
};

export const LINES: Line[] = ["linha-de-jogo", "treino", "casual", "acessorios"];
