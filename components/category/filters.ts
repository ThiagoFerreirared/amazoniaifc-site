export const ALL_SIZES = ["P", "M", "G", "GG"] as const;

export const PRICE_BUCKETS = [
  { id: "0-100", label: "Até R$ 100", min: 0, max: 100 },
  { id: "100-200", label: "R$ 100 a R$ 200", min: 100, max: 200 },
  { id: "200-300", label: "R$ 200 a R$ 300", min: 200, max: 300 },
  { id: "300+", label: "Acima de R$ 300", min: 300, max: Infinity },
] as const;

export const SORTS = [
  { id: "relevancia", label: "Relevância" },
  { id: "menor-preco", label: "Menor preço" },
  { id: "maior-preco", label: "Maior preço" },
  { id: "nome", label: "Nome (A-Z)" },
] as const;

export type SortId = (typeof SORTS)[number]["id"];
