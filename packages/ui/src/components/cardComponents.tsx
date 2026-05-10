import { ReactNode } from "react";
import FormatPrice from "./formatPrice";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { Button } from "./button";



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

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={clsx(
        "text-black font-medium text-sm line-clamp-1 sm:text-base",
        className,
      )}
    >
      {children}
    </h3>
  );
}

interface CardPriceProps {
  price: number;
  discount?: number; // porcentaje de descuento, opcional
  salePrice: number; // precio rebajado opcional
  className?: string;
}

export function CardPrice({
  price,
  discount = 0,
  salePrice,
  className,
}: CardPriceProps) {
  console.log(price)
  return (
    <div
      className={clsx(
        "flex items-center flex-wrap gap-x-1 sm:gap-x-2",
        className,
      )}
    >
      {/* Precio original */}
      <FormatPrice
        price={salePrice}
        className="text-black font-medium text-base sm:text-lg"
      />

      {/* Precio en oferta */}
      {discount > 0 && (
        <>
          <FormatPrice
            price={salePrice ?? price}
            className="text-muted-foreground font-medium line-through text-[13px] sm:text-sm"
          />
          <div className="text-red-600 font-medium text-[13px] sm:text-sm">
            -{discount}% de descuento
          </div>
        </>
      )}
    </div>
  );
}
