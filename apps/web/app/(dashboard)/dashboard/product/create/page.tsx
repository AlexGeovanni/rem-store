"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import FormProduct from "../_components/form";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/app/stores/useUserStore";
import { TABS_LAYOUT, TABS_MENU, useTabStore } from "@/app/stores/dashboard/tab-dashboard";
import { ArrowLeft } from "lucide-react";
import { Field } from "@workspace/ui/components/field";
import { ProductCreateInput, productCreateSchema } from "@repo/core/schemas/productCreate.schema";
export default function CreateProductPage() {
  const dataUser = useUserStore((state) => state.user);
  const {setTabAside}=useTabStore()
  const { mutate, isPending, isError } = useMutation({
    // mutationFn: productService.postProduct,
    onSuccess: (data) => {
      console.log("page data", data);
      // router.push("/auth/iniciar-sesion"); // Redirigir a la página de inicio de sesión o donde sea necesario
      // Redirigir, guardar token, etc.
    },
    onError: (_) => {
      console.log("error");
      // setErrorMessage('Error al registrar la cuenta. Por favor, inténtelo de nuevo más tarde.')
    },
  });
  // console.log("dataUser", dataUser);
  const form = useForm<ProductCreateInput>({
    resolver: zodResolver(productCreateSchema),
    mode: "onChange",
    defaultValues: {
      category: "electronics" as const,
      name: "",
      sku: "",
      price: 0,
      stock: 0,
      description: "",
      businessId:"",
      // url: "",
      status: true,
      details: {} as Record<string, string>,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    data.businessId = dataUser?.id || "xddd";
    // mutate(data);
    console.log("data submit", data);
  });
    
  const handleClickBack = () => {
    setTabAside(TABS_LAYOUT.PRODUCTS, TABS_MENU.PRODUCTS_LIST);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <header>
          <Link href={"/dashboard/product"}>
        <button className="cursor-pointer text-sm flex items-center select-none gap-1 hover:underline-offset-2" onClick={handleClickBack}>
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
      <FormProduct form={form} onSubmit={onSubmit} />
    </div>
  );
}
