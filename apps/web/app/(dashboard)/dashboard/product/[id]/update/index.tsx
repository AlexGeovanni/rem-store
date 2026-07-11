"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  ProductCreateInput,
  productCreateSchema,
} from "@repo/core/schemas/productCreate.schema";
import { ArrowLeft } from "lucide-react";
import { productService } from "@/app/lib/service/product.service";
import { useEffect, useState } from "react";
import FormProduct from "../../_components/formProduct";

export default function UpdateProductClient({
  productId,
}: {
  productId: string;
}) {
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const form = useForm<ProductCreateInput>({
    resolver: zodResolver(productCreateSchema),
    mode: "onChange",
  });

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId,
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: (data:unknown) =>
      productService.updateProduct(productId, data),
      
  });
  
  const deleteMutation = useMutation({
    // mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => {
      router.push("/dashboard/");
    },
    onError: (_) => {
      // toast.error("Error al eliminar el producto");
      console.log("error");
    },
  });

  const onSubmitDelete = async () => {
    alert("Eliminar producto");
    // mutate(productId);
  };

  useEffect(() => {
    if (!product) return;

    form.reset({
      categoryId: product.category.id,
      subCategory: product.subCategory,
      name: product.name,
      url: product.url,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      description: product.description,
      businessId: product.idBusiness,
      active: product.active,
      details: product.details,
    });
  }, [product, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    const {businessId, categoryId, sku, ...res}= data;
    console.log("data", res);
    updateMutation.mutate(res)
  });

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
      <FormProduct form={form} isUpdate={!!product} onSubmit={onSubmit} onChange={setFile} onSubmitDelete={onSubmitDelete} />
    </div>
  );
}
