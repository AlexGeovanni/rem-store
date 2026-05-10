import { type ProductCreateInput } from "@repo/core/schemas/productCreate.schema";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { Controller, UseFormReturn } from "react-hook-form";
import FormInputField from "../../_components/FormInputField";
// import { styleInput } from "./form";
interface FormCategoryFieldProps {
  category: string;
  form: UseFormReturn<ProductCreateInput>;
  keyCategory: string;
}
export default function FormCategoryField({
  category,
  form,
  keyCategory,
}: FormCategoryFieldProps) {

  return (
    <div key={keyCategory} className="space-y-3 pr-2">
      <p>Detalles espeficos del producto</p>
      <div>
        {category === "clothes" && (
          <div>
            <div className="grid grid-cols-2 gap-2">
              <FormInputField
                control={form.control}
                name="details.size"
                label="* Tamaño"
                type="text"
                placeholder="M, L, XL, etc."
              />
              <FormInputField
                control={form.control}
                name="details.material"
                label="* Material"
                type="text"
                placeholder="Algodón, Poliéster, etc."
              />
              
            </div>
          </div>
        )}
        {category === "electronics" && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <FormInputField
                control={form.control}
                name="details.ram"
                label="* RAM"
                type="text"
                placeholder="4, 8, 16, etc."
              />
              <FormInputField
                control={form.control}
                name="details.memory"
                label="* Almacenamiento"
                type="text"
                placeholder="128, 256, 512, etc."
              />
              <FormInputField
                control={form.control}
                name="details.brand"
                label="* Marca"
                type="text"
                placeholder="ASUS, Apple, etc."
              />
              <FormInputField
                control={form.control}
                name="details.model"
                label="* Modelo"
                type="text"
                placeholder="ROG Gaming, iPhone 13, etc."
              />
            </div>
          </div>
        )}
        {category === "home" && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <FormInputField
                control={form.control}
                name="details.material"
                label="* Material"
                type="text"
                placeholder="Madera, Metal, etc."
              />
              <FormInputField
                control={form.control}
                name="details.dimensions"
                label="* Dimensiones"
                type="text"
                placeholder="100x100x100 cm, 200x200x200 cm, etc."
              />
              <FormInputField
                control={form.control}
                name="details.weight"
                label="* Peso"
                type="text"
                placeholder="1Kg, 10Kg, 100Kg, etc."
              />
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
