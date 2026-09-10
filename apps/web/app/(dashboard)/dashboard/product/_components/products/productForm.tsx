"use client";
import { Controller, UseFormReturn } from "react-hook-form";
import FormCategoryField from "./formCategoryFeld";

import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group";
import ButtonBase from "@workspace/ui/components/buttonBase";
import { Button } from "@workspace/ui/components/button";
import { Trash } from "lucide-react";
import { type ProductCreateInput } from "@repo/core/schemas/productCreate.schema";
import FormInputField from "../../../_components/FormInputField";
import ImageUploader from "./imageUploader";
import SelectController from "./selectController";
import {
  DASHBOARD_CATEGORIES,
  SUB_CATEGORIES_ELECTRONIC,
  SUB_CATEGORIES_FASHION,
  SUB_CATEGORIES_HOME,
} from "@repo/core/constants/categories";
import { useMemo } from "react";
import { useFormState, useWatch } from "react-hook-form";

interface FormProductProps {
  form: UseFormReturn<ProductCreateInput>;
  isUpdate?: boolean;
  onChange?: (file: File | null) => void;
  onSubmit: () => void;
  onSubmitDelete?: () => void;
}

export default function ProductForm({
  form,
  isUpdate,
  onChange,
  onSubmit,
  onSubmitDelete,
}: FormProductProps) {
  
  const category = useWatch({
    control: form.control,
    name: "categoryId",
  });
  const imageUrl = useWatch({
    control: form.control,
    name: "url",
  });
  const { isDirty, isValid, isSubmitting } = useFormState({
    control: form.control,
  });
  const SUB_CATEGORIES = useMemo(() => {
    switch (category) {
      case "1":
        return SUB_CATEGORIES_FASHION;
      case "2":
        return SUB_CATEGORIES_ELECTRONIC;
      case "3":
        return SUB_CATEGORIES_HOME;
      default:
        return [];
    }
  }, [category]);

  const handleImageChange = (selectedFile: File | null) => {
    // A null value here means the user explicitly removed the image.
    // An invalid file is ignored by InputImage and does not clear the current URL.
    if (selectedFile === null) {
      form.setValue("url", "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    onChange?.(selectedFile);
  };

  return (
    <div className="pt-6">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 w-full space-y-5">
            <div className="mb-6">
              <p className="text-lg font-medium">Informacion basica</p>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <SelectController
                control={form.control}
                data={DASHBOARD_CATEGORIES}
                label="* Categoria"
                disabled={isUpdate}
                name="categoryId"
              />
              <SelectController
                control={form.control}
                data={SUB_CATEGORIES}
                label="* Subcategoria"
                disabled={isUpdate}
                name="subCategory"
              />
              {/* <div>
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <Field
                    orientation="responsive"
                  >
                    <FieldLabel htmlFor="status">
                      Estado: {field.value ? "Activo" : "Inactivo"}
                    </FieldLabel>
                    <Switch
                      id="status"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    
                  </Field>
                )}
              />
            </div> */}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <FormInputField
                control={form.control}
                name="name"
                label="* Nombre del producto"
                type="text"
                placeholder="Ingresa el nombre del producto"
              />
              <FormInputField
                control={form.control}
                name="sku"
                label="* Codigo del producto"
                type="text"
                placeholder="WH-001"
                required={false}
                disabled={isUpdate}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <FormInputField
                control={form.control}
                name="price"
                label="* Precio"
                type="number"
                placeholder="0"
              />
              <FormInputField
                control={form.control}
                name="stock"
                label="* Cantidad"
                type="number"
                placeholder="0"
              />
              <FormInputField
                control={form.control}
                name="discount"
                label="Descuento"
                type="number"
                placeholder="0"
                required={false}
              />
            </div>
            <div>
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-0.5">
                    <FieldLabel htmlFor={field.name}>*Descripcion</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-rhf-demo-description"
                        placeholder="Describe el producto..."
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value?.length}/100 caracteres
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <div className="col-span-2 space-y-5">
            <ImageUploader value={imageUrl} onChange={handleImageChange} />
            <FormCategoryField
              category={category ?? ""}
              form={form}
              keyCategory={category ?? "empty"}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between space-x-2">
          <div className="space-x-2">
            <ButtonBase
              disabled={
                // isPending ||
                !isDirty ||
                !isValid ||
                isSubmitting
              }
              type="submit"
              className=" rounded-full text-sm h-9 xsm:h-11.5 px-4 "
            >
              Guardar producto
            </ButtonBase>
            <Button
              variant={"destructive"}
              className="rounded-full text-sm h-9 xsm:h-11.5 px-4 cursor-pointer "
              type="button"
              onClick={() => form.reset()}
            >
              Cancelar
            </Button>
          </div>
          {onSubmitDelete && isUpdate && (
            <Button
              type="button"
              variant={"outline"}
              className="w-auto rounded-full text-sm cursor-pointer text-gray-600"
              onClick={onSubmitDelete}
            >
              <Trash className="size-5" />
              Eliminar producto
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
