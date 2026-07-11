"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      aria-labelledby="newsletter-title"
      className="relative overflow-hidden bg-foreground py-16 sm:py-20 lg:py-24"
    >
      {/* Big background type */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-12 select-none text-center font-serif text-[20vw] leading-none text-background/[0.04] sm:-bottom-15 sm:text-[16vw]"
        aria-hidden="true"
      >
        REM/STORE
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Únete al club
          </div>
          <h2
            id="newsletter-title"
            className="mt-4 text-4xl tracking-tight text-balance text-background sm:text-5xl lg:text-6xl"
          >
            Sé la primera en saberlo.
            <br />
            <em className="text-accent">Y obtén 15% de descuento.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-background/70 sm:text-lg">
            Suscríbete y recibe acceso anticipado a nuevos productos, invitaciones
            exclusivas a eventos y un descuento de bienvenida en tu primera
            compra.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex w-full max-w-md flex-col items-stretch gap-2 sm:flex-row"
            aria-label="Suscripción al newsletter"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <Input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="h-12 flex-1 rounded-full border-background/20 bg-background/10 px-5 text-background placeholder:text-background/50 focus-visible:border-accent focus-visible:ring-accent/30"
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
            >
              {submitted ? (
                <>
                  <Check className="size-4" />
                  Listo
                </>
              ) : (
                <>
                  Suscribirme
                  <ArrowUpRight className="size-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-background/50">
            Sin spam. Cancela cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
}
