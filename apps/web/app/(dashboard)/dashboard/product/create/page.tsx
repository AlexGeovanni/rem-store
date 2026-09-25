"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useBusinessUser } from "@/app/hooks/useUser";
import {
  TABS_LAYOUT,
  TABS_MENU,
  useTabStore,
} from "@/app/stores/dashboard/UseTabStore";
import { ArrowLeft } from "lucide-react";
import {
  ProductCreateInput,
  ProductCreateOutput,
  productCreateSchema,
} from "@repo/core/schemas/productCreate.schema";
import { useState } from "react";
import { productService } from "@/app/lib/service/product.service";
import { imageService } from "@/app/lib/service/image.service";
import ProductForm from "../_components/products/productForm";
import { toast } from "@workspace/ui/lib/toast";
import { useRouter } from "next/navigation";
export default function CreatetPage() {
  const { data: dataUser } = useBusinessUser();
  const [file, setFile] = useState<File | null>(null);
  const { setTabAside } = useTabStore();

  const route = useRouter()
  
  const { mutate,isPending } = useMutation({
    mutationFn: productService.postProduct,
    onSuccess: () => {
      toast.success("Producto creado")
      route.push("/dashboard/product");
    },
    onError: () => {
      toast.error("No se pudo guardar el producto intenta de nuevo o mas tarde!")
    },
  });

  const form = useForm<ProductCreateInput, unknown, ProductCreateOutput>({
    resolver: zodResolver(productCreateSchema),
    mode: "onChange",
    defaultValues: {
      categoryId: "dYW2POjmXKxeVAPe4plwB0kQaNrLg8",
      subCategory:"",
      name: "",
      url:"",
      sku: "",
      price: 1,
      stock: 1,
      discount: 0,
      description: "",
      active: true,
      details: {
      } as Record<string, string>,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
  try {
    if (!file) {
      toast.error("Debes seleccionar una imagen")
      throw new Error("Debes seleccionar una imagen");
    }

    const url = await imageService.upload(file);

    if (!dataUser?.id) {
      throw new Error("id failed");
    }

    const payload = {
      ...data,
      businessId: dataUser.id,
      url,
    };

    mutate(payload)
  } catch (error) {
    console.error(error);
  }
});

  const handleClickBack = () => {
    setTabAside(TABS_LAYOUT.PRODUCTS, TABS_MENU.PRODUCTS_LIST);
  };

  return (
    <div className="space-y-4">
      <header>
        <Link href={"/dashboard/product"}>
          <button
            className="cursor-pointer text-sm flex items-center select-none gap-1 hover:underline-offset-2"
            onClick={handleClickBack}
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </Link>
        <div className="mt-4">
          <h2 className="text-lg font-medium lg:text-2xl">
            Agregar nuevo producto
          </h2>
          <p className="text-sm text-zinc-600">
          Ingrese los detalles de su nuevo producto
        </p>
        </div>
      </header>

      <ProductForm form={form} isPending={isPending} onSubmit={onSubmit} onChange={setFile}  />

    </div>
  );
}
