"use client";

import { useMemo, useState } from "react";
import QuantityBox from "./_components/quantityBox";
import StarRating from "./_components/reviews/starRating";
import ReviewsContent from "./_components/reviews/reviewsContent";
import {
  DescriptionMore,
  ProductDetailsView,
} from "./_components/descriptionMore";
import ButtonBase from "@workspace/ui/components/buttonBase";
import Wrapper from "@/app/components/ui/wrapper";
import FormatPrice from "@workspace/ui/components/formatPrice";
import { Button } from "@workspace/ui/components/button";
import { Heart } from "lucide-react";
import { SelectSize } from "./_components/selectSize";
import BreadCrumbs from "@/app/components/ui/breadCrumbs";
import { useCart } from "@/app/hooks/useCart";
import { useFavoriteStore } from "@/app/stores/useFavoriteStore";

export type TypeReview = {
  id: number;
  name: string;
  date: string;
  description: string;
};

const reviews: TypeReview[] = [
  {
    id: 1,
    name: "Juan Perez",
    date: "Hace 2 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione.",
  },
  {
    id: 2,
    name: "Juan Perez",
    date: "Hace 3 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione.",
  },
  {
    id: 3,
    name: "Juan Perez",
    date: "Hace 4 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, qu",
  },
  {
    id: 4,
    name: "Juan Perez",
    date: "Hace 5 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione.",
  },
  {
    id: 5,
    name: "Juan Perez",
    date: "Hace 6 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione.",
  },
  {
    id: 6,
    name: "Juan Perez",
    date: "Hace 7 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione.",
  },
  {
    id: 7,
    name: "Juan Perez",
    date: "Hace 8 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione. Quisquam voluptatibus, quae, quod aperiam, nesciunt doloribus quibusdam perferendis voluptatum quas, quia ratione.",
  },
  {
    id: 8,
    name: "Juan Perez",
    date: "Hace 9 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 9,
    name: "Juan Perez",
    date: "Hace 10 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 10,
    name: "Juan Perez",
    date: "Hace 11 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 11,
    name: "Juan Perez",
    date: "Hace 12 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 12,
    name: "Juan Perez",
    date: "Hace 13 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 13,
    name: "Juan Perez",
    date: "Hace 14 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 14,
    name: "Juan Perez",
    date: "Hace 15 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 15,
    name: "Juan Perez",
    date: "Hace 16 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 16,
    name: "Juan Perez",
    date: "Hace 17 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 17,
    name: "Juan Perez",
    date: "Hace 18 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 18,
    name: "Juan Perez",
    date: "Hace 19 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 19,
    name: "Juan Perez",
    date: "Hace 20 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
  {
    id: 20,
    name: "Juan Perez",
    date: "Hace 21 dias",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatibus",
  },
];

const SplitReview = (comentarios: TypeReview[], tamañoGrupo: number) => {
  const grupos: TypeReview[][] = [];
  for (let i = 0; i < comentarios.length; i += tamañoGrupo) {
    grupos.push(comentarios.slice(i, i + tamañoGrupo));
  }
  return grupos;
};

export default function ProductView({ data }: { data: any }) {
  const { addItem, items } = useCart();
  const { favorite, addFavorite, removeFavorite } = useFavoriteStore();

  const reviewsGroup: TypeReview[][] = SplitReview(reviews, 3);
  const [rating, setRating] = useState<number>(3.7);
  const [quantity, setQuantity] = useState<number>(1);

  const isFavorite = favorite.includes(data?.id);

  const item = items.find((item) => item.productId === data?.id);

  const quantityExceeded = item ? item.quantity >= item.stock : false;

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(data?.id);
    } else {
      addFavorite(data?.id);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= 99) return;
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    
    addItem({
      id: data.id,
      productId: data.id,
      quantity: quantity,
      productName: data.name,
      url:data.url,
      unitPrice: data.price,
      totalPrice: data.price * quantity,
      stock: data.stock,
    });

    setQuantity(1);

  };

  const discount = data?.discount > 0;

  return (
    <main>
      <Wrapper className="mt-0 md:mt-0 lg:mt-0">
        <BreadCrumbs />
      </Wrapper>
      <Wrapper className="mt-0 lg:mt-6">
        <div className="tablet:grid tablet:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6">
          <div className="relative border-r-0 tablet:col-span-3 lg:col-span-3 xl:col-span-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 xl:grid-cols-8 tablet:pr-5">
              <div className="order-1 lg:order-0 lg:col-span-2 xl:col-span-1 flex lg:flex-col gap-4 lg:pr-2 xl:pr-0">
                <div className="bg-gray-100 border border-slate-300 h-17 xs:h-20 xl:h-22 w-20 xl:w-full rounded-lg"></div>
                <div className="bg-gray-100 border border-slate-300 h-17 xs:h-20 xl:h-22 w-20 xl:w-full rounded-lg"></div>
                <div className="bg-gray-100 border border-slate-300 h-17 xs:h-20 xl:h-22 w-20 xl:w-full rounded-lg"></div>
                <div className="bg-gray-100 border border-slate-300 h-17 xs:h-20 xl:h-22 w-20 xl:w-full rounded-lg"></div>
              </div>
              <div className="lg:col-span-10 xl:col-span-7 rounded-lg overflow-hidden">
                <div className="mx-auto h-125 bg-[#eec232]">
                  <picture className="w-full h-full object-cover aspect-square">
                    <img
                      src={data?.url}
                      alt={data?.name || "---"}
                      className="w-full h-full object-cover aspect-square "
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-5 tablet:mt-0 tablet:pl-5 tablet:col-span-2">
            <TitleProduct
              storeName={data?.businessName ?? "---"}
              title={data?.name || "---"}
              rating={rating}
              categoryName={data?.category.name ?? ""}
              subCategory={data?.subCategory ?? ""}
            />
            <div className=" flex justify-start flex-wrap items-baseline gap-y-1 gap-x-3">
              <FormatPrice
                price={
                  discount
                    ? data?.price * (1 - data?.discount / 100)
                    : data?.price
                }
                className={"text-black text-3xl"}
              />
              {discount && (
                <>
                  <FormatPrice
                    price={data?.price || 0}
                    className={" text-muted-foreground line-through text-lg"}
                  />
                  <p className=" text-red-500 rounded-full text-lg ">
                    -{data?.discount}% de descuento
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {data?.details?.size && (
                <div>
                  <p>Talla:</p>
                  <SelectSize size={data?.details?.size} />
                </div>
              )}
              {data?.details?.color && (
                <div>
                  <p className="text-base">
                    Color:
                    <span className="pl-1 font-medium text-gray-700">
                      {data?.details?.color}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <QuantityBox
                stock={data?.stock || 0}
                quantity={quantity}
                setQuantity={setQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleIncreaseQuantity={handleIncreaseQuantity}
              />
              <div className="w-full flex gap-2 items-center">
                <ButtonBase
                  onClick={addToCart}
                  className="cursor-pointer py-6"
                  disabled={data?.stock < quantity || quantityExceeded}
                >
                  Agregar al carrito
                </ButtonBase>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="cursor-pointer rounded-full p-6"
                  onClick={handleFavoriteClick}
                >
                  <Heart
                    color="#c5044b"
                    className="size-5"
                    fill={isFavorite ? "#c5044b" : "none"}
                  />
                </Button>
              </div>
              {quantityExceeded && (
                <p className="px-1 md:px-3 text-sm text-muted-foreground">
                  Solo hay {data?.stock} unidades disponibles y ya tienes esa
                  cantidad en tu carrito.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 xlm:gap-0 xlm:grid-cols-2 py-5">
          <div className="col-span-1 ">
            <div className="pb-5">
              <h2 className="text-xl font-medium">Características del producto</h2>
              <ProductDetailsView
                category={data?.category.categoryCode ?? ""}
                details={data?.details}
              />
            </div>
            <div>
              <h2 className="text-xl font-medium">Descripción</h2>
              <p className="">{data?.description ?? ""}</p>
            </div>
          </div>
          <div className="col-span-1">
            <ReviewsContent rating={rating} reviews={reviews} />
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

const TitleProduct = ({
  storeName,
  title,
  rating,
  classname,
  categoryName,
  subCategory,
}: {
  storeName: string;
  title: string;
  rating: number;
  classname?: string;
  categoryName: string;
  subCategory: string;
}) => {
  return (
    <div className={`w-full space-y-2 ${classname}`}>
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground">
          LS
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Vendido por
          </div>
          <div className="truncate text-sm leading-tight text-foreground">
            @{storeName}
          </div>
        </div>
      </div>
      <div>
        <h1 className=" text-2xl font-medium max-w-screen">{title}</h1>
        <p className="font-mono text-[13px] uppercase tracking-wider text-muted-foreground">
          {categoryName} - {subCategory}
        </p>
      </div>
      <div className="inline-flex cursor-pointer gap-2 items-center text-sm tablet:text-base text-gray-700 ">
        <StarRating rating={rating} />
        <span className="tracking-[-0.2px] tablet:text-sm lg:text-base">
          ({reviews.length ?? 0} comentarios)
        </span>
      </div>
    </div>
  );
};
