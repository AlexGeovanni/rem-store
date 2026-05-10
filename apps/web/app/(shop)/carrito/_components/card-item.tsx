import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
// import { TrashIcon, MinusIcon, PlusIcon, HeartLineIcon } from "@/icons/icon";
import { Heart, Minus, Plus, Trash } from "lucide-react";
import { CartItem } from "@/app/stores/useCartStore";
import FormatoPrice from "@repo/core/utils/FormatPrice";

interface CardItemProps {
  item: CartItem;
  onclickCountMinus: (id: CartItem) => void;
  onclickCountPlus: (id: CartItem) => void;
}

export default function CardItem({
  item,
  onclickCountMinus,
  onclickCountPlus,
}: CardItemProps) {
  const { id, productName:name,unitPrice:price, quantity, image, stock } = item;
  return (
    <div className="py-3 md:py-6 relative">
      <div className="flex items-start font-satoshi">
        <div className="mr-4">
          <Image
            src={
              "https://static.nike.com/a/images/t_PDP_1728_v1/w_318,f_auto,q_auto:eco,b_rgb:f5f5f5/67457474-ff55-42f6-8c5d-b9d189793aef/shorts-de-correr-dri-fit-de-13-900-con-forro-de-ropa-interior-challenger-flash-YFeHZqPR.png"
            }
            alt="nike"
            width={160}
            height={160}
            className="aspect-square object-cover rounded-xl"
          />
        </div>
        <div className="flex-1 flex flex-col-reverse md:justify-between md:flex-row w-full">
          <div className="text-sm max-w-[20ch] md:max-w-full md:text-base">
            <div className="text-black text-base md:mb-3">{name}</div>
            <div className="text-gray-600">
              <p className="truncate">
                Falda de tenis Dri-FIT corta con volantes para mujer
              </p>
              <p className="hidden md:block">Azul marino militar/Blanco</p>
              <p>Talla XS</p>
            </div>
          </div>
          <div>{FormatoPrice(price)}</div>
        </div>
      </div>
      <div className="mb-2.5 mt-2 flex gap-2 md:mb-0  md:gap-3 items-center">
        <div className="border border-gray-200  rounded-full flex justify-center items-stretch gap-0.5 md:gap-2 ">
          <Button
            onClick={() => onclickCountMinus(item)}
            variant={"outline"}
            size={"icon"}
            className="cursor-pointer rounded-full border-none border-gray-200 transition-colors ease-out duration-200 hover:bg-gray-200 "
          >
            {quantity <= 1 ? <Trash /> : <Minus />}
          </Button>
          <div className="w-6 flex items-center justify-center">{quantity}</div>
          <Button
            onClick={() => onclickCountPlus(item)}
            disabled={quantity >= stock}
            variant={"outline"}
            size={"icon"}
            className="cursor-pointer rounded-full border-none border-gray-200 transition-colors ease-out duration-200 hover:bg-gray-200"
          >
            <Plus />
          </Button>
        </div>
        <Button
          variant={"outline"}
          size={"icon"}
          className="cursor-pointer rounded-full border-gray-200 transition-colors ease-out duration-200 hover:bg-gray-200 "
        >
          <Heart />
        </Button>
      </div>
      {quantity >= 10 && (
        <div className="absolute bottom-0.5 left-0 right-0 text-xs mt-2 text-gray-600">
          * Cantidad maxima de cada producto es de 10
        </div>
      )}
    </div>
  );
}
