"use client";

import Wrapper from "@/app/components/ui/wrapper";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MenuMultiple } from "./_components/menuMultiple";
import SortBy from "./_components/sortBy";
import { ProductSkeletonCard } from "@/app/components/productCardSkeleton";
import ProductCard from "@/app/components/productCard";
import { Product } from "@repo/core/types/product";
import { productService } from "@/app/lib/service/product.service";

interface TiendaViewProps {
  categoria?: string;
  categoriaUrl?: string;
}

export default function TiendaView({
  categoria,
  categoriaUrl,
}: TiendaViewProps) {
  const [activo, setActivo] = useState(true);
  const [sortActive, setSortActive] = useState<boolean>(false);

  const marginLeftValue = activo ? -270 : 0;

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["productsAll"],
    queryFn: () => productService.getProducts(),
  });

  const productos = data?.content ?? [];
  console.log("data de productos", data);
  // Filtrar productos por categoría
  const productosFiltrados = useMemo(() => {
    if (!categoria) return productos;
    return (
      data?.content?.filter(
        (product: Product) =>
          product.details?.category.toLocaleLowerCase() ===
          categoria.toLocaleLowerCase(),
      ) || []
    );
  }, [categoria, data]);

  // Función para alternar el estado al hacer clic en el botón
  const toggleActivo = useCallback(() => {
    setActivo((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isSuccess || error) {
      setActivo(false);
    }
    // setTimeout(() => {
    //   setSkeleton(true);
    //   setActivo(false);
    // }, 2000);
  }, [isSuccess, error]);

  // Obtener nombre de la categoría para mostrar
  const nombreCategoria = useMemo(() => {
    if (!categoriaUrl) return "Todos los productos";

    const nombres: Record<string, string> = {
      moda: "Moda",
      electronico: "Electrónicos",
      hogar: "Hogar",
    };

    return nombres[categoriaUrl] || "Productos";
  }, [categoriaUrl]);

  return (
    <>
      <Wrapper className="max-w-full xl:px-11">
        <header className="flex flex-col justify-start gap-2 lg:flex-row lg:justify-between">
          <div className="font-title text-black font-semibold text-lg xsm:text-xl lg:text-2xl">
            {nombreCategoria}{" "}
            {productosFiltrados.length > 0 && (
              <span className="hidden lg:inline">
                ({productosFiltrados.length})
              </span>
            )}
          </div>

          <div className="min-h-[60px] border-t border-gray-300 flex justify-between items-center w-full lg:hidden">
            <div className="text-gray-700">
              {productosFiltrados.length > 0 &&
                `${productosFiltrados.length} resultados`}
            </div>
            {/* <FilterMobile /> */}
          </div>
          <div className="hidden relative lg:flex lg:items-center">
            <button onClick={toggleActivo} className="px-2 pr-4 cursor-pointer">
              <span>{marginLeftValue ? "Mostrar " : "Ocultar "}</span>filtros
            </button>
            <SortBy sortActive={sortActive} setSortActive={setSortActive} />
          </div>
        </header>
      </Wrapper>
      <div className="flex lg:mt-5 pb-3 min-h-[calc(100vh-var(--header-height)-2rem)]">
        <motion.div
          initial={{ marginLeft: marginLeftValue }} // Cambia la posición según el estado
          animate={{ marginLeft: marginLeftValue }} // Cambia la animación según el estado
          transition={{
            ease: "linear",
            duration: 0.3,
          }}
          className="hidden custom-scrollbar  w-[270px]  sticky top-3 bottom-5 max-h-[540px] overflow-auto  pl-12 lg:block "
        >
          <div className="pb-4 pr-4">
            <div className="">
              <MenuMultiple categoriaActual={categoriaUrl} />
            </div>
          </div>
        </motion.div>
        <div className="grid w-full gap-3 grid-cols-2 md:gap-4 md:grid-cols-3 xl:grid-cols-4  px-5 lg:pl-10 lg:pr-12">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => {
              return (
                <ProductSkeletonCard 
                  key={index + "index-xd"}
                  sortActive={sortActive}
                />
              );
            })
          ) : productosFiltrados.length > 0 && !isLoading? (
            productosFiltrados.map((product: Product, index: number) => {
              return <ProductCard key={product.id + index} product={product} />;
            })
          ) : (
            <div className="col-span-full min-h-[50svh] text-lg md:text-xl flex justify-center items-center py-10 text-gray-500">
              No se encontraron productos en esta categoría.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
