"use client";
// import { notFound } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProduct from "../../_components/form";
import Link from "next/link";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ProductCreateInput, productCreateSchema } from "@repo/core/schemas/productCreate.schema";
import { ArrowLeft } from "lucide-react";

export default function UpdateProductClient({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => {
      // productService.getDetailProduct(productId)
    },
    enabled: !!productId,
    retry: false,
  });
  const { mutate, isPending, isError } = useMutation({
    // mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => {
      router.push("/dashboard/");
    },
    onError: (_) => {
      // toast.error("Error al eliminar el producto");
      console.log("error");
    },
  });
  const form = useForm<ProductCreateInput>({
    resolver: zodResolver(productCreateSchema),
    mode: "onChange",
    defaultValues: {
      category: "electronics",
      name: "Camisa de prueba",
      sku: "1234567890",
      price: 100000,
      stock: 10,
      description: "Camisa de prueba",
      // url: "https://www.google.com",
      status: true,
      details: {
        ram: "4GB",
        memory: "128GB",
        brand: "Samsung",
        model: "Galaxy S21",
      } as Record<string, string>,
    },
  });

  const onSubmitDelete = async () => {
    alert("Eliminar producto");
    // mutate(productId);
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <header>
        <Link href={"/dashboard"}>
          <button className="flex items-center select-none gap-1 cursor-pointer text-sm hover:underline">
            <ArrowLeft className="size-5" />
            Volver
          </button>
        </Link>
        <div>
          <h2 className="text-lg font-semibold lg:text-2xl">
            Actualizar producto
          </h2>
          <span className="text-xs text-gray-600 lg:text-base">
            Actualiza los detalles de tu producto.
          </span>
        </div>
      </header>
      {/* <Separator className="my-3 mt-5" /> */}
      {/* <FormProduct
        form={form}
        isUpdate={true}
        onSubmitDelete={onSubmitDelete}
      /> */}
    </div>
  );
}
