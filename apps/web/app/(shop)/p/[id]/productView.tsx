"use client";

import { useState } from "react";
import QuantityBox from "./_components/quantityBox";
import StarRating from "./_components/reviews/starRating";
import ReviewsContent from "./_components/reviews/reviewsContent";
import DescriptionMore from "./_components/descriptionMore";
import ButtonBase from "@workspace/ui/components/buttonBase";
import Wrapper from "@/app/components/ui/wrapper";
import FormatPrice from "@workspace/ui/components/formatPrice";
import { Button } from "@workspace/ui/components/button";
import { Heart } from "lucide-react";
import { SelectSize } from "./_components/selectSize";
import BreadCrumbs from "@/app/components/ui/breadCrumbs";
import { useCartStore } from "@/app/stores/useCartStore";
import { useCart } from "@/app/hooks/useCart";

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
  const { addItem } = useCart();
  const reviewsGroup: TypeReview[][] = SplitReview(reviews, 3);
  const [rating, setRating] = useState<number>(3.7);
  const [quantity, setQuantity] = useState<number>(1);
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
      unitPrice: data.price,
      totalPrice: data.price * quantity,
      stock: data.stock,
    });
  };

  return (
    <main>
      <Wrapper className="mt-0 md:mt-0 lg:mt-0">
        <BreadCrumbs />
      </Wrapper>
      <Wrapper className="mt-0 lg:mt-6">
        <div className="tablet:grid tablet:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6">
          <div className="relative border-r-0 tablet:border-r tablet:col-span-3 lg:col-span-3 xl:col-span-4">
            <div className="rounded-lg sticky top-2 left-0 right-0">
              <div className="mx-auto h-125 bg-[#eec232]">
                {/* <picture className="w-full h-full object-cover ">
                <img
                  src="/img/man-clothes.webp"
                  alt="Producto 1"
                  className="w-full rounded-2xl"
                />
              </picture> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-5 tablet:mt-0 tablet:pl-5 tablet:col-span-2">
            <TitleProduct
              title={data?.name || "Nombre del producto"}
              rating={rating}
            />
            <div className=" flex justify-start flex-wrap items-baseline gap-y-1 gap-x-3">
              <FormatPrice
                price={data?.price || 0}
                className={"text-black text-3xl"}
              />
              <FormatPrice
                price={350}
                className={" text-muted-foreground line-through text-lg"}
              />
              <p className=" text-red-500 rounded-full text-lg ">
                -25% de descuento
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                {/* <p className="text-base mb-1">Tamaño:</p> */}
                <SelectSize />
              </div>
              <div>
                <p className="text-base">
                  Color:
                  <span className="pl-1 font-medium text-gray-700">Blanco</span>
                </p>
              </div>
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
                <ButtonBase onClick={addToCart} className="cursor-pointer py-6" disabled={data?.stock < quantity}>
                  Agregar al carrito
                </ButtonBase>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="cursor-pointer rounded-full p-6"
                  //   onClick={() => handleFavorite("idProduct")}
                >
                  <Heart
                    color="#c5044b"
                    className="size-5"
                    fill={false ? "#c5044b" : "none"}
                  />
                </Button>
              </div>
            </div>
            {/* <Description /> */}
            {/* <div>
              <div className="w-full py-3">
                <p className="text-lg font-medium">Puntos de entrega</p>
                <ul className="flex gap-4 px-3  flex-wrap text-sm mt-3 list-disc list-inside  ">
                  <li>Las magaritas</li>
                  <li>Villas del campo</li>
                  <li>Plaza sendero</li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </Wrapper>
      <DescriptionMore
        description={data?.description ?? ""}
        details={{ category: data?.category, details: data?.details }}
      />
      <ReviewsContent rating={rating} reviews={reviews} />
    </main>
  );
}

const TitleProduct = ({
  title,
  rating,
  classname,
}: {
  title: string;
  rating: number;
  classname?: string;
}) => {
  //   const handleFavorite = useFavoriteStore((state) => state.toggleProductId);
  // const isFavorite = useFavoriteStore((state)=> state.isFavorite("idProduct"))
  return (
    <div className={`w-full space-y-2 ${classname}`}>
      {/* <p className="mb-2 text-sm font-medium tablet:flex text-gray-600 tablet:mb-0">
        <span className=" w-6 h-6 text-base inline-flex justify-center items-center bg-green-500 rounded-full text-white mr-3">
          H
        </span>
        Moda para hombre
      </p> */}
      <h1 className=" text-2xl font-medium max-w-screen">{title}</h1>
      <div className="inline-flex cursor-pointer gap-2 items-center text-sm tablet:text-base text-gray-700 ">
        <StarRating rating={rating} />
        <span className="tracking-[-0.2px] tablet:text-sm lg:text-base">
          ({reviews.length ?? 0} comentarios)
        </span>
      </div>
    </div>
  );
};
