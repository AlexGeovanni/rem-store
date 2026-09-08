import { type ProductCreateInput } from "@repo/core/schemas/productCreate.schema";
import {
  UseFormReturn,
} from "react-hook-form";
import FormInputField from "../../../_components/FormInputField";
import {
  ELECTRONICS_BRANDS,
  ELECTRONICS_RAM,
  ELECTRONICS_STORAGE,
} from "@repo/core/constants/categories";
import SelectController from "./selectController";

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
        {category === "1" && (
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
               <FormInputField
                control={form.control}
                name="details.color"
                label="* Color"
                type="text"
                placeholder="Negro, Rojo, etc."
              />
            </div>
          </div>
        )}
        {category === "2" && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <SelectController
                control={form.control}
                data={ELECTRONICS_RAM}
                label="* Ram"
                name="details.ram"
              />
              <SelectController
                control={form.control}
                data={ELECTRONICS_STORAGE}
                label="* Almacenamiento"
                name="details.memory"
              />
              <SelectController
                control={form.control}
                data={ELECTRONICS_BRANDS}
                label="* Marca"
                name="details.brand"
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
        {category === "3" && (
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

