import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Store } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import ButtonBase from "@workspace/ui/components/buttonBase"
import Wrapper from "@/app/components/ui/wrapper"
import FormatoPrice from "@repo/core/utils/FormatPrice"

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border/60"
    >
      <Wrapper className="mx-auto grid w-full grid-cols-1 gap-8 px-4 pb-3 mt-0 md:mt-1 lg:mt-2  sm:px-6 lg:grid-cols-12 lg:gap-4 lg:px-8 lg:pb-6 ">
        {/* Left: Copy */}
        <div className="flex flex-col lg:col-span-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent-foreground">
              {/* <Sparkles className="size-3" aria-hidden="true" /> */}
              +2,400 creadores · 38k productos
            </span>
          </div>

          <div className="mt-8 flex-1 flex flex-col justify-between">
            <div>
              <h1
              id="hero-title"
              className="font-medium text-6xl leading-[0.9] tracking-tight text-balance text-foreground sm:text-7xl lg:text-[5rem] xl:text-[6rem] lg:leading-[0.85]"
            >
              Moda <em className="text-primary">independiente</em>, comprada directo al creador.
            </h1>
            <p className="mt-6 max-w-md text-base leading-tight text-muted-foreground ">
              REM/STORE es el marketplace donde marcas pequeñas 
              venden sus piezas. Descubre, compra y conecta con quien hace lo que vistes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 max-w-max">
              <ButtonBase  className=" h-11 px-7">
                <Link href="/s" className="flex items-center gap-2">
                  Explorar marketplace
                  <ArrowUpRight className="size-4" />
                </Link>
              </ButtonBase>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full h-11 px-7"
              >
                <Link href="">
                  <Store className="size-4" />
                  Vender en REM/STORE
                </Link>
              </Button>
            </div>
            </div>

            <div className="mt-10 flex items-center gap-6 border-t border-border/60 pt-6">
              <div>
                <div className="text-3xl text-foreground">2.4k+</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Vendedores
                </div>
              </div>
              <div className="h-10 w-px bg-border" aria-hidden="true" />
              <div>
                <div className="text-3xl text-foreground">38k</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Productos
                </div>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block" aria-hidden="true" />
              <div className="hidden sm:block">
                <div className="text-3xl text-foreground">4.9★</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Rating promedio
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl  lg:aspect-[5/6]">
            <Image
              src="/img/hero-fashion.jpg"
              alt="Pieza destacada de un creador independiente en REM/STORE"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />

            {/* Floating product card with seller */}
            <div className="absolute bottom-4 left-4 max-w-70 w-full rounded-xl bg-background/95 p-4 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground">
                  B
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Vendido por
                  </div>
                  <div className="truncate text-base leading-tight text-foreground">
                    @Backdrom
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
                <div className=" text-sm text-foreground">Blazer Solana</div>
                <div className="text-sm font-semibold text-primary">{FormatoPrice(200)}</div>
              </div>
            </div>

            {/* Floating tag */}
            <div className="absolute right-4 top-4 rotate-6 rounded-full bg-primary px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg sm:right-6 sm:top-6">
              Pieza única
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}
