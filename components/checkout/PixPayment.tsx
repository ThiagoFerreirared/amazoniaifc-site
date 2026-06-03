"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy } from "lucide-react";
import { buildPixPayload } from "@/lib/pix";
import { formatBRL } from "@/lib/format";

export function PixPayment({ amount, txid }: { amount: number; txid: string }) {
  const [copied, setCopied] = useState(false);
  const payload = buildPixPayload({
    key: "loja@amazoniaifc.com.br",
    name: "Amazonia IFC",
    city: "Santarem",
    amount,
    txid,
  });

  async function copy() {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível
    }
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-xl border border-black/10 bg-white p-4">
        <QRCodeSVG value={payload} size={196} level="M" />
      </div>
      <p className="mt-4 text-sm text-zinc-600">
        Escaneie o QR Code no app do seu banco
      </p>
      <p className="mt-1 text-2xl font-bold text-amazonia-green">{formatBRL(amount)}</p>

      <div className="mt-5 w-full">
        <p className="mb-1 text-left text-xs font-medium text-zinc-500">
          Pix copia e cola
        </p>
        <div className="flex items-stretch gap-2">
          <code className="block w-full truncate rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-left text-xs text-zinc-600">
            {payload}
          </code>
          <button
            onClick={copy}
            className="inline-flex shrink-0 items-center gap-1 rounded-md bg-amazonia-green px-3 text-sm font-semibold text-white hover:bg-amazonia-green-700"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-400">
        Pagamento simulado. Nenhuma cobrança real é feita.
      </p>
    </div>
  );
}
