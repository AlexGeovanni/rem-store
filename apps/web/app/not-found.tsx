import Link from "next/link"
import { ArrowLeft, Home, ShoppingBag, Tag, Headphones } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export default function NotFound() {
  const popularCategories = [
    { name: "Electrónicos", href: "/s/electronica" },
    { name: "Moda", href: "/s/moda" },
    { name: "Hogar", href: "/s/hogar" },
  ]

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Main content */}
      <section className="flex-1 mx-auto max-w-6xl w-full px-4 py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: message */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" aria-hidden="true" />
              Error 404
            </span>

            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                Esta página se agotó
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty max-w-xl">
                Lo sentimos, no pudimos encontrar el producto o la página que buscas. Es posible que el enlace haya
                caducado o que el artículo ya no esté disponible en la tienda.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <Link href="/">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Ir al inicio
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/s">
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  Ver productos
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/">
                  <Headphones className="h-4 w-4" aria-hidden="true" />
                  Contactar soporte
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: visual */}
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="flex h-full w-full flex-col items-center justify-center gap-6">
                <div
                  aria-hidden="true"
                  className="text-[8rem] md:text-[10rem] font-bold leading-none tracking-tighter text-foreground"
                >
                  404
                </div>
              </div>

              {/* Decorative price tag */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-background shadow-md rotate-6"
              >
                <Tag className="h-3.5 w-3.5" />
                <span className="text-xs font-semibold">No disponible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular categories */}
        <div className="mt-16 md:mt-24">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Mientras tanto, explora</h2>
              <p className="text-sm text-muted-foreground mt-1">Categorías populares en la tienda</p>
            </div>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularCategories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="group flex h-full items-center justify-between rounded-full border border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <span>{category.name}</span>
                  <ArrowLeft
                    className="h-4 w-4 rotate-[135deg] text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}