import z from "zod";

// 1. Categorías (tipadas correctamente)
export const categoriesValues = ["fashions", "electronic", "home"] as const;
// export type CategoryId = (typeof categoriesValues)[number];

// 2. Schemas de detalles por categoría
const ropaDetailsSchema = z.object({
  size: z.string().min(1, "El tamaño es requerido").toUpperCase(),
  color: z.string().min(3),
  material: z.string().min(1, "El material es requerido"),
});

const electronicosDetailsSchema = z.object({
  brand: z.string(),
  memory: z.string(),
  ram: z.string(),
  model: z.string().min(2),
});

const hogarDetailsSchema = z.object({
  material: z.string(),
  dimensions: z.string(),
  weight: z.number().positive(),
});

// 3. Base común (para no repetir código)
const baseProductSchema = z.object({
  name: z.string().min(5, "El nombre es requerido"),
  url: z
  .string()
  .url("Debe ser una URL válida")
  .or(z.literal(""))
  .optional(),
  sku: z.string().min(5, "El SKU es requerido"),
  discount: z.coerce
    .number()
    .int()
    .min(0, "El descuento no puede ser negativo")
    .max(99, "El descuento no puede ser mayor a 99")
    .default(0),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  stock: z.coerce
    .number()
    .int()
    .nonnegative("El stock no puede ser negativo")
    .default(0),
  active: z.boolean().default(true),
  description: z
    .string()
    .min(20, "La descripción es requerida")
    .max(500, "La descripción no puede tener más de 500 caracteres"),
  businessId: z.string(),
});

// 4. Schema principal (discriminado por categoría)
export const productCreateSchema = z.discriminatedUnion("categoryId", [
  baseProductSchema.extend({
    categoryId: z.literal("1"),
    subCategory:z.string(),
    details: ropaDetailsSchema,
  }),

  baseProductSchema.extend({
    categoryId: z.literal("2"),
    subCategory:z.string(),
    details: electronicosDetailsSchema,
  }),

  baseProductSchema.extend({
    categoryId: z.literal("3"),
    subCategory:z.string(),
    details: hogarDetailsSchema,
  }),
]);

/**
 * 5. Tipo inferido (input)
 */
export type ProductCreateInput = z.input<typeof productCreateSchema>;

/**
 * 6. Tipo validado (output)
 */
export type ProductCreateOutput = z.infer<typeof productCreateSchema>;

/**
 *
 */

export type RopaDetails = z.infer<typeof ropaDetailsSchema>;
export type ElectronicosDetails = z.infer<typeof electronicosDetailsSchema>;
export type HogarDetails = z.infer<typeof hogarDetailsSchema>;

export type ProductDetails =
  | {
      categoryId: "1";
      details: RopaDetails;
    }
  | {
      categoryId: "2";
      details: ElectronicosDetails;
    }
  | {
      categoryId: "3";
      details: HogarDetails;
    };