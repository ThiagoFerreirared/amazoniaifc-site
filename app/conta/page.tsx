import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata = { title: "Minha conta" };

export default function ContaPage() {
  return (
    <ComingSoon
      title="Minha conta"
      description="Login e cadastro (autenticação via Supabase) fazem parte do fluxo de checkout, que será construído nas próximas fases."
    />
  );
}
