import { type Product } from "@repo/core/types/product";
import {
  Card,
  CardButtonFavorite,
  CardContentDiscount,
  CardContentImage,
  CardPrice,
  CardTitleStore,
} from "@workspace/ui/components/cardComponents";
import Link from "next/link";
import Image from "next/image";
import { useFavoriteStore } from "../stores/useFavoriteStore";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const { id, idBusiness, name, price, discount, category, url } =
    product;

  const { favorite, addFavorite, removeFavorite } = useFavoriteStore();
  const isFavorite = favorite.includes(id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const finalPrice = Number((price - (price * discount) / 100).toFixed(2));

  return (
    <Card key={id}>
      <CardContentImage>
        <Link href={`/p/${id}`}>
          <Image
            src={url}
            alt={name}
            width={300}
            height={350}
            className="w-full h-auto aspect-3/3.5 object-cover group-hover:scale-105 transition-scale duration-300 ease-out"
          />
        </Link>
        {discount > 0 && <CardContentDiscount discount={discount} />}
        <CardButtonFavorite
          isFavorite={isFavorite}
          handleFavoriteClick={handleFavoriteClick}
        />
      </CardContentImage>
      <div className="">
        <Link href={`/`}>
          <CardTitleStore>@{idBusiness}</CardTitleStore>
        </Link>
        <CardPrice
          name={name}
          category={category.name}
          price={price}
          salePrice={finalPrice}
          discount={discount}
        />
      </div>
    </Card>
  );
}
/**
 * <Link
        href={`/`}
        className="mt-3 flex items-center gap-2 text-foreground transition-colors hover:text-primary"
      >
        <span className="truncate text-[12px] tracking-wide">
          @tienda de ropa
        </span>
      </Link>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {product.category}
          </div>
          <h3 className="mt-0.5 truncate text-lg font-medium leading-tight text-foreground">
            {product.name}
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-sm font-semibold text-foreground">$300.00</div>
          {true && (
            <div className="text-xs text-muted-foreground line-through">
              $50.00
            </div>
          )}
        </div>
      </div>
 * 
 */
