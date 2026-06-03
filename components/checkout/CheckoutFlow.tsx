"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowLeft, CheckCircle2, CreditCard, QrCode, ShoppingBag } from "lucide-react";
import { Stepper } from "./Stepper";
import { OrderSummary } from "./OrderSummary";
import { PixPayment } from "./PixPayment";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { formatBRL } from "@/lib/format";

const SHIPPING = {
  pac: { label: "PAC", price: 24.9, prazo: "5 a 8 dias úteis" },
  sedex: { label: "Sedex", price: 39.9, prazo: "2 a 3 dias úteis" },
} as const;
type ShippingId = keyof typeof SHIPPING;

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-500">{label}</span>
      <input
        {...props}
        className="w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amazonia-green/60"
      />
    </label>
  );
}

export function CheckoutFlow() {
  const { items, subtotal, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [orderRef] = useState(() => Date.now().toString().slice(-8));

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [receipt, setReceipt] = useState<{
    total: number;
    method: string;
    email: string;
  } | null>(null);

  const [ident, setIdent] = useState({ nome: "", email: "", cpf: "", telefone: "" });
  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  });
  const [shipping, setShipping] = useState<ShippingId>("pac");
  const [payment, setPayment] = useState<"pix" | "cartao">("pix");
  const [card, setCard] = useState({ numero: "", nome: "", validade: "", cvv: "" });
  const [parcelas, setParcelas] = useState(1);

  useEffect(() => setMounted(true), []);

  const showFrete = step >= 1;
  const freteGratis = shipping === "pac" && subtotal >= 299;
  const frete = freteGratis ? 0 : SHIPPING[shipping].price;
  const pixDiscount = step === 2 && payment === "pix" ? subtotal * 0.2 : 0;
  const total = subtotal - pixDiscount + (showFrete ? frete : 0);

  function finalize() {
    setReceipt({
      total,
      method: payment === "pix" ? "Pix" : `Cartão de crédito (${parcelas}x)`,
      email: ident.email,
    });
    setOrderId("AIFC-" + orderRef.slice(-6));
    setDone(true);
    clear();
    window.scrollTo({ top: 0 });
  }

  if (!mounted) {
    return <div className="container py-24 text-center text-zinc-400">Carregando...</div>;
  }

  if (done && receipt) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <CheckCircle2 className="mb-4 h-20 w-20 text-amazonia-green" />
        <h1 className="font-display text-3xl uppercase text-amazonia-ink">
          Pedido confirmado!
        </h1>
        <p className="mt-2 text-zinc-600">
          Seu pedido <strong>{orderId}</strong> foi recebido com sucesso.
        </p>
        <div className="mt-6 w-full max-w-sm rounded-xl border border-black/5 bg-white p-5 text-left shadow-card">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Pagamento</span>
            <span className="font-medium text-amazonia-ink">{receipt.method}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-black/5 pt-2">
            <span className="text-sm text-zinc-500">Total</span>
            <span className="font-display text-xl text-amazonia-green">
              {formatBRL(receipt.total)}
            </span>
          </div>
        </div>
        <p className="mt-4 max-w-md text-sm text-zinc-500">
          Enviamos a confirmação para {receipt.email || "seu e-mail"}. Acompanhe o
          status em Minha Conta.
        </p>
        <Link href="/" className="btn-gold mt-7">
          Continuar comprando
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
        <ShoppingBag className="mb-4 h-16 w-16 text-zinc-300" />
        <h1 className="font-display text-2xl uppercase text-amazonia-ink">
          Seu carrinho está vazio
        </h1>
        <p className="mt-2 text-zinc-500">Adicione produtos para finalizar a compra.</p>
        <Link href="/" className="btn-outline mt-6">
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 lg:py-12">
      <Stepper current={step} />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          {step === 0 ? (
            <section className="rounded-xl border border-black/5 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl uppercase text-amazonia-ink">
                Identificação
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Já tem conta?{" "}
                <span className="cursor-pointer font-semibold text-amazonia-green">
                  Entrar
                </span>
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field
                    label="Nome completo"
                    value={ident.nome}
                    onChange={(e) => setIdent((p) => ({ ...p, nome: e.target.value }))}
                    placeholder="Seu nome"
                  />
                </div>
                <Field
                  label="E-mail"
                  type="email"
                  value={ident.email}
                  onChange={(e) => setIdent((p) => ({ ...p, email: e.target.value }))}
                  placeholder="voce@email.com"
                />
                <Field
                  label="Telefone"
                  value={ident.telefone}
                  onChange={(e) => setIdent((p) => ({ ...p, telefone: e.target.value }))}
                  placeholder="(93) 99999-9999"
                />
                <Field
                  label="CPF"
                  value={ident.cpf}
                  onChange={(e) => setIdent((p) => ({ ...p, cpf: e.target.value }))}
                  placeholder="000.000.000-00"
                />
              </div>
              {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
              <div className="mt-6 flex justify-end">
                <Button
                  variant="gold"
                  onClick={() => {
                    if (!ident.nome || !ident.email) {
                      setError("Preencha nome e e-mail para continuar.");
                      return;
                    }
                    setError(null);
                    setStep(1);
                  }}
                >
                  Continuar para entrega
                </Button>
              </div>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="rounded-xl border border-black/5 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl uppercase text-amazonia-ink">
                Endereço de entrega
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <Field
                    label="CEP"
                    value={endereco.cep}
                    onChange={(e) => setEndereco((p) => ({ ...p, cep: e.target.value }))}
                    onBlur={() =>
                      setEndereco((p) =>
                        p.cep.replace(/\D/g, "").length >= 8 && !p.cidade
                          ? { ...p, cidade: "Santarém", uf: "PA" }
                          : p,
                      )
                    }
                    placeholder="00000-000"
                  />
                </div>
                <div className="sm:col-span-4">
                  <Field
                    label="Rua"
                    value={endereco.rua}
                    onChange={(e) => setEndereco((p) => ({ ...p, rua: e.target.value }))}
                    placeholder="Nome da rua"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    label="Número"
                    value={endereco.numero}
                    onChange={(e) => setEndereco((p) => ({ ...p, numero: e.target.value }))}
                    placeholder="123"
                  />
                </div>
                <div className="sm:col-span-4">
                  <Field
                    label="Complemento"
                    value={endereco.complemento}
                    onChange={(e) =>
                      setEndereco((p) => ({ ...p, complemento: e.target.value }))
                    }
                    placeholder="Apto, bloco (opcional)"
                  />
                </div>
                <div className="sm:col-span-3">
                  <Field
                    label="Bairro"
                    value={endereco.bairro}
                    onChange={(e) => setEndereco((p) => ({ ...p, bairro: e.target.value }))}
                    placeholder="Bairro"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    label="Cidade"
                    value={endereco.cidade}
                    onChange={(e) => setEndereco((p) => ({ ...p, cidade: e.target.value }))}
                    placeholder="Cidade"
                  />
                </div>
                <div className="sm:col-span-1">
                  <Field
                    label="UF"
                    maxLength={2}
                    value={endereco.uf}
                    onChange={(e) =>
                      setEndereco((p) => ({ ...p, uf: e.target.value.toUpperCase() }))
                    }
                    placeholder="PA"
                  />
                </div>
              </div>

              <h3 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide text-amazonia-ink">
                Forma de envio
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {(Object.keys(SHIPPING) as ShippingId[]).map((id) => {
                  const opt = SHIPPING[id];
                  const free = id === "pac" && subtotal >= 299;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setShipping(id)}
                      className={clsx(
                        "flex items-center justify-between rounded-lg border p-3 text-left transition-colors",
                        shipping === id
                          ? "border-amazonia-green ring-1 ring-amazonia-green"
                          : "border-zinc-300 hover:border-amazonia-green",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-semibold text-amazonia-ink">
                          {opt.label}
                        </span>
                        <span className="block text-xs text-zinc-500">{opt.prazo}</span>
                      </span>
                      <span className="text-sm font-bold text-amazonia-green">
                        {free ? "Grátis" : formatBRL(opt.price)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => {
                    setError(null);
                    setStep(0);
                  }}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-500 hover:text-amazonia-ink"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </button>
                <Button
                  variant="gold"
                  onClick={() => {
                    if (
                      !endereco.cep ||
                      !endereco.rua ||
                      !endereco.numero ||
                      !endereco.cidade ||
                      !endereco.uf
                    ) {
                      setError("Preencha o endereço de entrega.");
                      return;
                    }
                    setError(null);
                    setStep(2);
                  }}
                >
                  Ir para pagamento
                </Button>
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="rounded-xl border border-black/5 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl uppercase text-amazonia-ink">
                Pagamento
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPayment("pix")}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                    payment === "pix"
                      ? "border-amazonia-green ring-1 ring-amazonia-green"
                      : "border-zinc-300 hover:border-amazonia-green",
                  )}
                >
                  <QrCode className="h-6 w-6 text-amazonia-green" />
                  <span>
                    <span className="block text-sm font-semibold text-amazonia-ink">
                      Pix
                    </span>
                    <span className="block text-xs text-amazonia-green">
                      20% de desconto
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPayment("cartao")}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                    payment === "cartao"
                      ? "border-amazonia-green ring-1 ring-amazonia-green"
                      : "border-zinc-300 hover:border-amazonia-green",
                  )}
                >
                  <CreditCard className="h-6 w-6 text-amazonia-green" />
                  <span>
                    <span className="block text-sm font-semibold text-amazonia-ink">
                      Cartão
                    </span>
                    <span className="block text-xs text-zinc-500">até 10x sem juros</span>
                  </span>
                </button>
              </div>

              <div className="mt-6">
                {payment === "pix" ? (
                  <PixPayment amount={total} txid={"AIFC" + orderRef} />
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field
                        label="Número do cartão"
                        inputMode="numeric"
                        maxLength={19}
                        value={card.numero}
                        onChange={(e) => setCard((p) => ({ ...p, numero: e.target.value }))}
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        label="Nome impresso no cartão"
                        value={card.nome}
                        onChange={(e) => setCard((p) => ({ ...p, nome: e.target.value }))}
                        placeholder="Como está no cartão"
                      />
                    </div>
                    <Field
                      label="Validade"
                      value={card.validade}
                      onChange={(e) => setCard((p) => ({ ...p, validade: e.target.value }))}
                      placeholder="MM/AA"
                    />
                    <Field
                      label="CVV"
                      inputMode="numeric"
                      maxLength={4}
                      value={card.cvv}
                      onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value }))}
                      placeholder="123"
                    />
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs font-medium text-zinc-500">
                        Parcelas
                      </label>
                      <select
                        value={parcelas}
                        onChange={(e) => setParcelas(Number(e.target.value))}
                        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amazonia-green/60"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}x de {formatBRL(total / n)} {n === 1 ? "à vista" : "sem juros"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => {
                    setError(null);
                    setStep(1);
                  }}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-500 hover:text-amazonia-ink"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </button>
                <Button variant="gold" onClick={finalize}>
                  {payment === "pix"
                    ? "Confirmar pagamento"
                    : `Pagar ${formatBRL(total)}`}
                </Button>
              </div>
            </section>
          ) : null}
        </div>

        <OrderSummary
          items={items}
          subtotal={subtotal}
          frete={showFrete ? frete : null}
          pixDiscount={pixDiscount}
          total={total}
          freteGratis={freteGratis}
        />
      </div>
    </div>
  );
}
