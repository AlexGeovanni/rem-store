import { Checkbox } from "@workspace/ui/components/checkbox";
import Link from "next/link";
import {
  CATEGORIES,
  getShopCategoryPath,
} from "@repo/core/constants/categories";
import {
  TypeBuyPrice,
  TypeDiscount,
  TypeCategory,
  buyPrice,
  fashionsCheckbox,
  discount,
  electronicsCheckbox,
  homeCheckbox,
} from "../data/constants";

type Props = {
  title: string;
  array: TypeBuyPrice[] | TypeDiscount[] | TypeCategory[];
};

interface MenuMultipleProps {
  categoriaActual?: string;
}

export function MenuMultiple({ categoriaActual }: MenuMultipleProps) {
  return (
    <>
      <div className="border-t border-gray-400 py-2 font-satoshi">
        <span className="mb-2 inline-block font-semibold">Categorías</span>
        <div className="space-y-1.5">
          <Link
            href="/s"
            className={`block py-1 text-sm hover:text-gray-600 transition-colors ${!categoriaActual ? "font-semibold text-black" : "text-gray-700"}`}
          >
            Todos los productos
          </Link>
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={getShopCategoryPath(category.slug)}
              className={`block py-1 text-sm hover:text-gray-600 transition-colors ${categoriaActual === category.slug ? "font-semibold text-black" : "text-gray-700"}`}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>

      {categoriaActual === "moda" && (
        <ItemsFormChecbox title="Genero" array={fashionsCheckbox} />
      )}
      {categoriaActual === "electronico" && (
        <ItemsFormChecbox title="Electronicos" array={electronicsCheckbox} />
      )}
      {categoriaActual === "hogar" && (
        <ItemsFormChecbox title="Hogar" array={homeCheckbox} />
      )}

      <ItemsFormChecbox title="Comprar por precio" array={buyPrice} />
      <ItemsFormChecbox title="Rebajas" array={discount} />
    </>
  );
}

const ItemsFormChecbox = ({ title, array }: Props) => {
  return (
    <div className="border-t border-gray-400 py-2 font-satoshi">
      <span className="mb-2 inline-block">{title}</span>
      <div className="space-y-1.5">
        {array.map((item, i) => (
          <div
            key={`${item.label}-${i}-${item.id}`}
            className="items-top flex space-x-2 py-1"
          >
            <Checkbox id={`${item.id}-${item.label}`} />
            <div className="flex items-center leading-none">
              <label
                htmlFor={`${item.id}-${item.label}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
