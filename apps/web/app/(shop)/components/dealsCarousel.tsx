"use client";

import Wrapper from "@/app/components/ui/wrapper";
import { useMemo, useState } from "react";
import {AnimatePresence, motion} from "motion/react"
import { ProductCarousel } from "@/app/components/ProductCarousel";
import { DealsProduct } from "@repo/core/types/product";
import { categories } from "@/app/constants/deals";

export default function DealsCarousel(){
    const [selectCategory, setSelectCategory] = useState<string | undefined>("all");
  
  // Filtrar productos según la categoría seleccionada
  const filteredProducts = useMemo(() => {
    if (selectCategory === "all") {
      return DealsProduct;
    }
    return DealsProduct.filter((product) => product.category === selectCategory);
  }, [selectCategory]);
    return(<div className="w-full overflow-hidden">
    <Wrapper className="space-y-2">
      <div className=" space-y-2 pb-2 md:mb-4 md:space-y-2.5">
        <h2 className="font-semibold pb-1 text-xl leading-8 md:pb-2 md:text-3xl">
          Compra lo esencial
        </h2>
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
          initial={{ opacity: 0}}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ProductCarousel products={filteredProducts} />
        </motion.div>
      </AnimatePresence>
    </Wrapper>
    </div>)
}
