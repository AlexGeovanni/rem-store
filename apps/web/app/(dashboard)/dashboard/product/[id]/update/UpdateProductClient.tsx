"use client";

import Link from "next/link";

import {  useQuery } from "@tanstack/react-query";

import { ArrowLeft } from "lucide-react";
import { productService } from "@/app/lib/service/product.service";
import UpdateProductForm from "./updateProductForm";

export default function UpdateProductClient({
  productId,
}: {
  productId: string;
}) {
 
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId,
    retry: false,
  });

  if (isLoading) {
    return <h1>Cargando producto...</h1>;
  }

  if (isError || !product) {
    return <h1>No se pudo cargar el producto.</h1>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <header>
        <Link href={"/dashboard"}>
          <button className="flex items-center select-none gap-1 cursor-pointer text-sm hover:underline">
            <ArrowLeft className="size-5" />
            Volver
          </button>
        </Link>
        <div className="mt-6">
          <h2 className="text-lg font-semibold lg:text-2xl">
            Actualizar producto
          </h2>
          <span className="text-sm text-zinc-600 ">
            Actualiza los detalles de tu producto.
          </span>
        </div>
      </header>
      <UpdateProductForm product={product} />
    </div>
  );
}
