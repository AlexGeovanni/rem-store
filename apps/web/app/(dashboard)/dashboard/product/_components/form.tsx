"use client";
import { Controller, UseFormReturn } from "react-hook-form";
import FormCategoryField from "./formCategoryFeld";

import { Label } from "@workspace/ui/components/label";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group";
import ButtonBase from "@workspace/ui/components/buttonBase";
import { Button } from "@workspace/ui/components/button";
import { Trash } from "lucide-react";
import {
  categoriesValues,
  type ProductCreateInput,
} from "@repo/core/schemas/productCreate.schema";
import FormInputField from "../../_components/FormInputField";
import ImageUploader from "./imageUploader";
import { Switch } from "@workspace/ui/components/switch";

interface FormProductProps {
  form: UseFormReturn<ProductCreateInput>;
  isUpdate?: boolean;
  onSubmit: () => void;
  onSubmitDelete?: () => void;
}

// export const styleInput = cva(
//   "border border-gray-300 p-3 py-2 rounded-lg transition-shadow  focus-within:border-ring/40 focus-within:outline-none focus-within:ring-[2px] focus-within:ring-ring/0 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none",
// );

export default function FormProduct({
  form,
  isUpdate,
  onSubmit,
  onSubmitDelete,
}: FormProductProps) {
  const {
    formState: { isValid }} = form;
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-2 w-full space-y-3">
          <div className="space-y-1.5 grid grid-cols-2 gap-2">
            <div className="space-y-3">
              <Label htmlFor="category">* Selecciona la categoria</Label>
              <SelectComponent form={form} isUpdate={isUpdate} />
            </div>
            <div>
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
            </div>
          </div>
          <div className="w-full space-y-3">
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      *Descripcion
                    </FieldLabel>
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
          <FormCategoryField
            category={form.watch("category")}
            form={form}
            keyCategory={form.watch("category")}
          />
        </div>
        <div className="col-span-2">
          <ImageUploader />
        </div>
      </div>
      <div className="mt-5 flex justify-between space-x-2">
        <div className="space-x-2">
          <ButtonBase
            disabled={!isValid}
            type="submit"
            className=" rounded-full text-sm h-9 xsm:h-11.5 px-4 "
          >
            Guardar producto
          </ButtonBase>
          <Button
            variant={"destructive"}
            className="rounded-full text-sm h-9 xsm:h-11.5 px-4 cursor-pointer "
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
  );
}

const SelectComponent = ({
  form,
  isUpdate,
}: {
  form: UseFormReturn<ProductCreateInput>;
  isUpdate?: boolean;
}) => {
  return (
    <Controller
      name="category"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-full">
          <Select
            disabled={isUpdate}
            onValueChange={(e) => {
              field.onChange(e);
              form.setValue("details", {} as any);
            }}
            value={field.value}
          >
            <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0 h-10! ">
              <SelectValue
                className="cursor-pointer"
                placeholder="Categoria*"
              />
            </SelectTrigger>
            <SelectContent>
              {categoriesValues.map((value, i) => (
                <SelectItem key={i} className="cursor-pointer h-10" value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
};
