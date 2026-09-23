"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Settings2, X } from "lucide-react";
import { useState } from "react";
import {
  CATEGORIES,
  getShopCategoryPath,
} from "@repo/core/constants/categories";
import { ItemsFormChecbox } from "./menuMultiple";
import { discount } from "../data/constants";
import { ParamsInter } from "../page";

interface FilterMenuDrawer {
  categoriaActual?: string;
  params: ParamsInter;
}

export function FilterMenuDrawer({
  categoriaActual,
  params,
}: FilterMenuDrawer) {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const query = new URLSearchParams();
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="lg:hidden">
        <Button
          variant={"outline"}
          className="rounded-full block px-6 lg:hidden"
        >
          <Settings2 className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className=" flex justify-end">
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="rounded-full size-9 cursor-pointer "
              >
                <X />
              </Button>
            </DrawerClose>
          </div>
          <DrawerTitle className="text-left text-xl">Filtrar</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <span className="mb-2 text-lg inline-block font-semibold">Categorías</span>
          <div className="space-y-1.5">
            <Link
              href={getCategoryHref("/s")}
              className={`block py-1 text-base hover:text-gray-600 transition-colors ${!categoriaActual ? "font-semibold text-black" : "text-gray-700"}`}
            >
              Todos los productos
            </Link>
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={getCategoryHref(getShopCategoryPath(category.slug))}
                className={`block py-1 text-base hover:text-gray-600 transition-colors ${categoriaActual === category.slug ? "font-semibold text-black" : "text-gray-700"}`}
              >
                {category.label}
              </Link>
            ))}
          </div>

          <ItemsFormChecbox
            title="Rebajas"
            array={discount}
            checked={params.discounted === "true"}
            onCheckedChange={handleDiscountChange}
          />
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
