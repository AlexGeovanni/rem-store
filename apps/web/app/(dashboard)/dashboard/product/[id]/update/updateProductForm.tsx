import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import {
  electronicosDetailsSchema,
  hogarDetailsSchema,
  ProductCreateInput,
  productCreateSchema,
  ropaDetailsSchema,
} from "@repo/core/schemas/productCreate.schema";
import { productService } from "@/app/lib/service/product.service";
import { imageService } from "@/app/lib/service/image.service";
import { useState } from "react";
import { Product } from "@repo/core/types/product";
import ProductForm from "../../_components/products/productForm";

export default function UpdateProductForm({ product }: { product: Product }) {
  const [file, setFile] = useState<File | null>(null);

  const updateMutation = useMutation({
    mutationFn: (data: unknown) =>
      productService.updateProduct(product.id, data),
  });

  const form = useForm<ProductCreateInput>({
    resolver: zodResolver(productCreateSchema),
    mode: "onChange",
    defaultValues: mapProductToForm(product),
  });
  const onSubmitDelete = async () => {
    alert("Eliminar producto");
    // mutate(productId);
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

      updateMutation.mutate(payload);
    } catch (error) {
      console.error("No se pudo actualizar la imagen del producto", error);
    }
  });

  return (
    <ProductForm
      form={form}
      isUpdate
      onSubmit={onSubmit}
      onChange={setFile}
      onSubmitDelete={onSubmitDelete}
    />
  );
}

function mapProductToForm(product: any): ProductCreateInput {
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
    businessId: product.idBusiness,
    active: product.active,
    details: product.details,
  };
}

export function validateProductDetails(categoryId: string, details: unknown) {
  switch (categoryId) {
    case "1":
      return ropaDetailsSchema.safeParse(details);
    case "2":
      return electronicosDetailsSchema.safeParse(details);
    case "3":
      return hogarDetailsSchema.safeParse(details);
    default:
      return { success: false, error: new Error("Categoría no válida") };
  }
}
