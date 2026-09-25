"use client";

import Wrapper from "@/app/components/ui/wrapper";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProductCarousel } from "@/app/components/ProductCarousel";
import { categories } from "@/app/constants/deals";
import { productService } from "@/app/lib/service/product.service";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@repo/core/types/product";

export default function DealsCarousel() {
  const [selectCategory, setSelectCategory] = useState<string>("all");

  const { data, isLoading } = useQuery({
    queryKey: ["productsAll"],
    queryFn: () =>
      productService.getProducts({
        direction: "desc",
        discounted: "true",
      }),
  });

  const products = useMemo(() => data?.content ?? [], [data]);

  const filteredProducts = useMemo(() => {
    if (selectCategory === "all") {
      return products;
    }
    return (
      products?.filter(
        (product: Product) =>
          product.category?.name?.toLocaleLowerCase() ===
          selectCategory.toLocaleLowerCase(),
      ) || []
    );
  }, [selectCategory, products]);

  if (products.length <= 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden">
      <Wrapper className="space-y-2">
        <div className=" space-y-2 pb-2 md:mb-4 md:space-y-2.5">
          <div>
            <h2
              className="text-3xl font-medium pb-1 tracking-tight text-balance text-foreground tablet:text-4xl"
              // className="font-semibold pb-1 text-xl leading-8 md:pb-2 sm:text-4xl tablet:text-5xl"
            >
              Compra lo esencial
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Marcas pequeñas que comparten su producto en REM/STORE. Compra
              directo de su tienda.
            </p>
          </div>
          <div className="inline-flex flex-wrap gap-1 p-1 border border-black/10 rounded-full">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setSelectCategory(id)}
                // variant={"outline"}
                className={`${
                  id === selectCategory ? "" : "hover:text-opacity-50"
                }  text-black cursor-pointer relative rounded-full font-medium bg-transparent h-auto text-[12.8px] py-1.5 pb-[7px] px-3 xs:px-5 sm:px-6 xs:text-sm `}
              >
                {id === selectCategory && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute h-full inset-0 z-10 bg-gray-200 mix-blend-difference"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  ></motion.div>
                )}
                {label}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ProductCarousel
              filteredProducts={filteredProducts}
              isLoading={isLoading}
            />
          </motion.div>
        </AnimatePresence>
      </Wrapper>
    </div>
  );
}
