import z from "zod";
import { CATEGORY_IDS } from "../constants/categories";

export const categoriesValues = CATEGORY_IDS;

// Detalless por categoria

export const ropaDetailsSchema = z.object({
  size: z
    .string()
    .min(1, "El tamaño es requerido")
    .toUpperCase(),

  color: z
    .string()
    .min(3, "El color debe tener al menos 3 caracteres"),

  material: z
    .string()
    .min(1, "El material es requerido"),
});

export const electronicosDetailsSchema = z.object({
  brand: z.string(),

  memory: z.string(),

  ram: z.string(),

  model: z
    .string()
    .min(2, "El modelo es requerido"),
});

export const hogarDetailsSchema = z.object({
  material: z.string(),

  dimensions: z.string(),

  weight: z.coerce
    .number()
    .min(0.1, "El peso debe ser mayor que 0"),
});


// Schema del formulario 

export const productCreateSchema = z.object({
  categoryId: z
    .string()
    .min(1, "Selecciona una categoría"),

  subCategory: z
    .string()
    .min(1, "Selecciona una subcategoría"),

  name: z
    .string()
    .min(5, "El nombre es requerido"),

  url: z
    .string()
    .url("Debe ser una URL válida")
    .or(z.literal(""))
    .optional(),

  sku: z
    .string()
    .min(5, "El SKU es requerido"),

  discount: z.coerce
    .number()
    .int()
    .min(0, "El descuento no puede ser negativo")
    .max(99, "El descuento no puede ser mayor a 99")
    .default(0),

  price: z.coerce
    .number()
    .positive("El precio debe ser mayor a 0"),

  stock: z.coerce
    .number()
    .int()
    .nonnegative("El stock no puede ser negativo")
    .default(1),

  active: z
    .boolean()
    .default(true),

  description: z
    .string()
    .min(20, "La descripción es requerida")
    .max(
      500,
      "La descripción no puede tener más de 500 caracteres",
    ),

  businessId: z.string(),

  /*
   * Los details dependen de categoryId,
   * por eso aquí no hacemos el discriminatedUnion.
   */
  details: z.record(z.string(), z.unknown()),
});


//  types

export type ProductCreateInput =
  z.input<typeof productCreateSchema>;

export type ProductCreateOutput =
  z.output<typeof productCreateSchema>;

export type RopaDetails =
  z.infer<typeof ropaDetailsSchema>;

export type ElectronicosDetails =
  z.infer<typeof electronicosDetailsSchema>;

export type HogarDetails =
  z.infer<typeof hogarDetailsSchema>;