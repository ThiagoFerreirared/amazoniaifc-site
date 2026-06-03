import { createBrowserClient } from "@supabase/ssr";

/**
 * Client do Supabase para uso no browser (Client Components).
 * Preparado para as próximas fases; ainda não é usado na Home.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  );
}
