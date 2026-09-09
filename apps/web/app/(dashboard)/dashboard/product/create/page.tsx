"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/app/stores/useUserStore";
import {
  TABS_LAYOUT,
  TABS_MENU,
  useTabStore,
} from "@/app/stores/dashboard/tab-dashboard";
import { ArrowLeft } from "lucide-react";
import {
  ProductCreateInput,
  productCreateSchema,
} from "@repo/core/schemas/productCreate.schema";
import FormProduct from "../_components/formProduct";
import { useState } from "react";
import { productService } from "@/app/lib/service/product.service";
import { imageService } from "@/app/lib/service/image.service";
export default function CreatetPage() {
  const dataUser = useUserStore((state) => state.user);
  const [file, setFile] = useState<File | null>(null);
  const { setTabAside } = useTabStore();

  const { mutate } = useMutation({
    mutationFn: productService.postProduct,
    onSuccess: (data) => {
      console.log("page data", data);
      // router.push("/auth/iniciar-sesion"); // Redirigir a la página de inicio de sesión o donde sea necesario
      // Redirigir, guardar token, etc.
    },
    onError: () => {
      console.log("error");
      // setErrorMessage('Error al registrar la cuenta. Por favor, inténtelo de nuevo más tarde.')
    },
  });

  const form = useForm<ProductCreateInput>({
    resolver: zodResolver(productCreateSchema),
    mode: "onChange",
    defaultValues: {
      categoryId: "1",
      subCategory:"",
      name: "",
      url:"",
      sku: "",
      price: 0,
      stock: 0,
      description: "",
      businessId: "",
      active: true,
      details: {
      } as Record<string, string>,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
  try {
    if (!file) {
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
    console.log(payload)

    mutate(payload)
  } catch (error) {
    console.error(error);
    // mostrar toast/error al usuario
  }
});

  const handleClickBack = () => {
    setTabAside(TABS_LAYOUT.PRODUCTS, TABS_MENU.PRODUCTS_LIST);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
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
        <div>
          <h2 className="text-lg font-semibold lg:text-2xl">
            Crear nuevo producto
          </h2>
        </div>
      </header>
      {/* <Separator className="my-3 mt-5" /> */}
      <div>
        <h3 className="text-sm text-gray-600 lg:text-base">
          Ingrese los detalles de su nuevo producto
        </h3>
      </div>

      <FormProduct form={form} onSubmit={onSubmit} onChange={setFile} />

    </div>
  );
}
