import { products } from "@/data/products.mock";
import type { Line, Product, ProductBadge } from "@/lib/types";

/**
 * Camada de acesso a dados da loja.
 *
 * HOJE: lê do mock local (`data/products.mock.ts`).
 * AMANHÃ: o corpo destas funções troca para consultas ao Supabase,
 * sem que nenhum componente que as consome precise mudar. Por isso são
 * assíncronas desde já.
 */

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getByBadge(badge: ProductBadge): Promise<Product[]> {
  return products.filter((p) => p.badges.includes(badge));
}

export async function getFeatured(): Promise<Product[]> {
  return getByBadge("lancamento");
}

export async function getBestSellers(): Promise<Product[]> {
  return getByBadge("mais-vendido");
}

export async function getByLine(line: Line): Promise<Product[]> {
  return products.filter((p) => p.line === line);
}

export async function getBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}
