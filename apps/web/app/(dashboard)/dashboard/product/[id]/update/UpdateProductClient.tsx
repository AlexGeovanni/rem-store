"use client";

import Link from "next/link";

import {  useQuery } from "@tanstack/react-query";

import { ArrowLeft } from "lucide-react";
import { productService } from "@/app/lib/service/product.service";
import UpdateProductForm from "./updateProductForm";
import { Fragment } from "react";
import SkeletonDefault from "../../../_components/skeleton/skeletonDefault";

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

  if ((isError || !product) && !isLoading) {
    return <h1>No se pudo cargar el producto.</h1>;
  }

  return (
    <div className="space-y-4">
      <header>
        <Link href={"/dashboard/product"}>
          <button className="flex items-center select-none gap-1 cursor-pointer text-sm hover:underline">
            <ArrowLeft className="size-5" />
            Volver
          </button>
        </Link>
      </header>
      {isLoading ? <SkeletonDefault />:<Fragment><div className="mt-4">
          <h2 className="text-lg font-semibold lg:text-2xl">
            Actualizar producto
          </h2>
          <p className="text-sm text-zinc-600 ">
            Actualiza los detalles de tu producto.
          </p>
        </div>
      <UpdateProductForm product={product} /></Fragment>}
    </div>
  );
}
