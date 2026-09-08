import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Minus, Plus } from "lucide-react";
import React from "react";

interface QuantityBoxProps {
  stock: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleDecreaseQuantity: () => void;
  handleIncreaseQuantity: () => void;
  classname?: string;
}

export default function QuantityBox({
  stock ,
  quantity,
  setQuantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  classname,
}: QuantityBoxProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= stock) {
      if (value.toString().length > 2) return;
      setQuantity(value);
    } else {
      setQuantity(0);
    }
  };
  const handleBlur = () => {
    if (quantity < 1) {
      setQuantity(1);
    }
  };

  return (
    <div className="relative">
      {stock <= 10 &&  <span className="absolute px-3 text-xs bg-destructive z-10 -top-2 left-4 text-white rounded-full w-auto h-5 flex items-center justify-center">
        Ultimas {stock} unidades
      </span>}

      <div
        className={cn(
          "flex border rounded-full border-gray-300 overflow-hidden w-full md:w-full relative",
          classname,
        )}
      >
        <Button
          variant={"outline"}
          disabled={quantity <= 1}
          className="group cursor-pointer rounded-full border-none h-auto py-3 hover:bg-transparent "
          onClick={handleDecreaseQuantity}
        >
          <Minus className="text-gray-700 group-hover:text-black" />
        </Button>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleBlur}
          value={quantity}
          name=""
          id=""
          className=" w-full h-auto text-center outline-none border-none"
        />
        <Button
          variant={"outline"}
          className="group cursor-pointer rounded-full border-none h-auto py-3 hover:bg-transparent "
          onClick={handleIncreaseQuantity}
          disabled={quantity >= stock}
        >
          <Plus className="text-gray-700 group-hover:text-black" />
        </Button>
      </div>
    </div>
  );
}
