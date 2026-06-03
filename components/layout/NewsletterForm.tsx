"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="rounded-md bg-white/10 px-4 py-3 text-sm text-white">
        Pronto! As novidades do Amazônia vão chegar em <strong>{email}</strong>.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setDone(true);
      }}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu melhor e-mail"
        aria-label="E-mail para newsletter"
        className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:ring-2 focus:ring-amazonia-gold"
      />
      <Button type="submit" variant="gold" className="shrink-0">
        Inscrever
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
