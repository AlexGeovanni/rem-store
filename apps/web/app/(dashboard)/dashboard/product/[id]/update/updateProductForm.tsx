import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  electronicosDetailsSchema,
  hogarDetailsSchema,
  ProductCreateInput,
  ProductCreateOutput,
  productCreateSchema,
  ropaDetailsSchema,
} from "@repo/core/schemas/productCreate.schema";
import { productService } from "@/app/lib/service/product.service";
import { imageService } from "@/app/lib/service/image.service";
import { useState } from "react";
import { Product } from "@repo/core/types/product";
import ProductForm from "../../_components/products/productForm";
import { toast } from "@workspace/ui/lib/toast";
import { useRouter } from "next/navigation";

export default function UpdateProductForm({ product }: { product: Product }) {
  const [file, setFile] = useState<File | null>(null);

  const route = useRouter();
  const queryClient = useQueryClient()

  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation({
    mutationFn: (data: unknown) =>
      productService.updateProduct(product.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productUpdate"] });
      toast.success("Actualizacion completada");
    },
    onError: () => toast.success("No se pudo actualizar el producto"),
  });

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => {
      route.push("/dashboard/product");
    },
    onError: () => toast.error("No se pudo eliminar el producto"),
  });

  const form = useForm<ProductCreateInput, unknown, ProductCreateOutput>({
    resolver: zodResolver(productCreateSchema),
    mode: "onTouched",
    defaultValues: mapProductToForm(product),
  });

  const onSubmitDelete = async () => {
    const toastId = `confirm-delete-${product.id}`;
    toast("¿Quieres eliminar este producto?", {
      id: toastId,
      action: {
        label: "Eliminar",
        onClick: () => {
          mutateDelete(product.id);
        },
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {
          toast.dismiss(toastId);
        },
      },
    });
  };

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const detailsResult = validateProductDetails(
        data.categoryId,
        data.details,
      );

      if (!detailsResult.success) {
        return;
      }
      const url = file ? await imageService.upload(file) : product.url;
      const payload: Record<string, unknown> = { ...data, url: url };
      delete payload.businessId;
      delete payload.sku;

      mutateUpdate(payload);
    } catch (error) {
      console.error("No se pudo actualizar la imagen del producto", error);
    }
  });

  return (
    <ProductForm
      form={form}
      isUpdate
      isPending={isPendingUpdate || isPendingDelete}
      onSubmit={onSubmit}
      onChange={setFile}
      onSubmitDelete={onSubmitDelete}
    />
  );
}

function mapProductToForm(product: Product): ProductCreateInput {
  return {
    categoryId: product.category.id,
    subCategory: product.subCategory,
    name: product.name,
    url: product.url,
    sku: product.sku,
    price: product.price,
    stock: product.stock,
    discount: product.discount ?? 0,
    description: product.description,
    active: product.active,
    details: product.details,
  };
}

export function validateProductDetails(categoryId: string, details: unknown) {
  switch (categoryId) {
    case "dYW2POjmXKxeVAPe4plwB0kQaNrLg8":
      return ropaDetailsSchema.safeParse(details);
    case "km0XYn3xaD7Z24lNvlPjzNVKQrpL9w":
      return electronicosDetailsSchema.safeParse(details);
    case "W1Dykzwr6oBPlv1K4N0YR5n8ZdmVGb":
      return hogarDetailsSchema.safeParse(details);
    default:
      return { success: false, error: new Error("Categoría no válida") };
  }
}
