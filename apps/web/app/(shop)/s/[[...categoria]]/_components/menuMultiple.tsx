"use client";

import { Checkbox } from "@workspace/ui/components/checkbox";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CATEGORIES,
  getShopCategoryPath,
} from "@repo/core/constants/categories";
import {
  type TypeBuyPrice,
  type TypeDiscount,
  type TypeCategory,
  discount,
} from "../data/constants";
import type { ParamsInter } from "../page";
import { Fragment } from "react";

type Props = {
  title: string;
  array: TypeBuyPrice[] | TypeDiscount[] | TypeCategory[];
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

interface MenuMultipleProps {
  categoriaActual?: string;
  params: ParamsInter;
}

export function MenuMultiple({ categoriaActual, params }: MenuMultipleProps) {
  
  const router = useRouter();
  const pathname = usePathname();
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  const getCategoryHref = (path: string) =>
    queryString ? `${path}?${queryString}` : path;

  const handleDiscountChange = (checked: boolean) => {
    const nextParams = new URLSearchParams(window.location.search);

    if (checked) {
      nextParams.set("discounted", "true");
    } else {
      nextParams.delete("discounted");
    }

    const nextQuery = nextParams.toString();
    router.push(`${pathname}${nextQuery ? `?${nextQuery}` : ""}`);
  };

  return (
    <Fragment>
      <div className="border-t border-gray-400 py-2">
        <span className="mb-2 inline-block font-semibold">Categorías</span>
        <div className="space-y-1.5">
          <Link
            href={getCategoryHref("/s")}
            className={`block py-1 text-sm hover:text-gray-600 transition-colors ${!categoriaActual ? "font-semibold text-black" : "text-gray-700"}`}
          >
            Todos los productos
          </Link>
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={getCategoryHref(getShopCategoryPath(category.slug))}
              className={`block py-1 text-sm hover:text-gray-600 transition-colors ${categoriaActual === category.slug ? "font-semibold text-black" : "text-gray-700"}`}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>

      <ItemsFormChecbox
        title="Rebajas"
        array={discount}
        checked={params.discounted === "true"}
        onCheckedChange={handleDiscountChange}
      />
    </Fragment>
  );
}

export const ItemsFormChecbox = ({
  title,
  array,
  checked,
  onCheckedChange,
}: Props) => {
  return (
    <div className="lg:border-t border-gray-400 py-2 font-satoshi">
      <span className="font-medium mb-2 text-lg inline-block lg:text-base">{title}</span>
      <div className="space-y-1.5">
        {array.map((item, i) => (
          <div
            key={`${item.label}-${i}-${item.id}`}
            className="items-top flex space-x-2 py-1"
          >
            <Checkbox
              id={`${item.id}-${item.label}`}
              checked={checked}
              onCheckedChange={(value) => onCheckedChange?.(value === true)}
            />
            <div className="flex items-center leading-none">
              <label
                htmlFor={`${item.id}-${item.label}`}
                className="text-base lg:text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
