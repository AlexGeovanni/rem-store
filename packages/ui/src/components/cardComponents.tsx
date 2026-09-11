import { ReactNode } from "react";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { Button } from "./button";
import FormatPrice from "@repo/core/utils/formatPrice";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={clsx("group relative ", className)}>{children}</div>;
}

export function CardContentImage({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "overflow-hidden w-full rounded-lg h-auto sm:rounded-[8px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface CardButtonFavorite {
  className?: string;
  isFavorite: boolean;
  handleFavoriteClick: VoidFunction;
}

export function CardButtonFavorite({
  className,
  isFavorite,
  handleFavoriteClick,
}: CardButtonFavorite) {
  return (
    <div className="p-1 inline-flex overflow-hidden rounded-full bg-white absolute top-2 right-2 md:top-3 md:right-3">
      <Button
        size={"icon"}
        variant={"ghost"}
        className={clsx(
          "h-auto w-auto [&_svg]:size-5 transition-transform ease-out duration-200 hover:scale-110  rounded-none md:[&_svg]:size-5.5",
          className,
        )}
        onClick={handleFavoriteClick}
      >
        <Heart color="#c5044b" fill={isFavorite ? "#c5044b" : "none"} />
      </Button>
    </div>
  );
}

export function CardContentDiscount({ discount }: { discount: number }) {
  return (
    <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
      -{discount}%
    </div>
  );
}

export function CardTitleStore({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mt-3 flex items-center gap-2 text-foreground transition-colors hover:text-primary", className)}>
      <span className="truncate text-[12px] tracking-wide">
       {children}
      </span>
    </div>
  );
}

interface CardPriceProps {
  name: string;
  category: string;
  price: number;
  discount?: number; // porcentaje de descuento, opcional
  salePrice: number; // precio rebajado opcional
  className?: string;
}

export function CardPrice({
  name,
  category,
  price,
  discount = 0,
  salePrice,
  className,
}: CardPriceProps) {
  return (
    <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-mono text-[13px] uppercase tracking-wider text-muted-foreground">
            {category}
          </div>
          <h3 className="mt-0.5 truncate text-lg font-medium leading-tight text-foreground">
            {name}
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <div className=" font-semibold text-foreground">{FormatPrice(salePrice ?? price)}</div>
          {discount > 0 && (
            <div className="text-[13px] text-muted-foreground line-through">
              {FormatPrice( price)}
            </div>
          )}
        </div>
      </div>
  );
}
