import { type Product } from "@repo/core/types/product";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import {
  Card,
  CardButtonFavorite,
  CardContentImage,
  CardPrice,
  CardTitle,
} from "@workspace/ui/components/cardComponents";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
    const { id, name, price,sales,discount } = product;
    console.log(typeof product.price)
  const { favorite, addFavorite, removeFavorite } = useFavoriteStore(
    (state) => state,
  );
  //   const isFavorite = favorite.includes(id);

  return (
    <Card key={id}>
      <CardContentImage>
        <Link href={""}>
          <Image
            src={
              "https://img.freepik.com/fotos-premium/conjunto-ropa-accesorios-variados-hombre_58460-641.jpg?w=1480"
            }
            alt="imagen de muestra"
            width={300}
            height={350}
            className="w-full h-auto aspect-3/3.5 object-cover group-hover:scale-105 transition-scale duration-300 ease-out"
          />
        </Link>
        <CardButtonFavorite isFavorite={true} handleFavoriteClick={() => {}} />
      </CardContentImage>
      <div className="">
        <CardTitle>{name}</CardTitle>
        <CardPrice price={sales} salePrice={price} discount={discount} />
      </div>
    </Card>
  );
}
