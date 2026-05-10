import z from "zod";

// 1. Categorías (tipadas correctamente)
export const categoriesValues = ["clothes", "electronics", "home"] as const;
export type Category = (typeof categoriesValues)[number];

// 2. Schemas de detalles por categoría
const ropaDetailsSchema = z.object({
  size: z.string().min(1, "El tamaño es requerido").toUpperCase(),
  color: z.string().min(3),
  material: z.string().min(1, "El material es requerido"),
});

const electronicosDetailsSchema = z.object({
  brand: z.string().min(2),
  memory: z.string().min(1),
  ram: z.string().min(2),
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
  status: z.boolean().default(true),
  description: z
    .string()
    .min(20, "La descripción es requerida")
    .max(500, "La descripción no puede tener más de 500 caracteres"),
  businessId: z.string(),
});

// 4. Schema principal (discriminado por categoría)
export const productCreateSchema = z.discriminatedUnion("category", [
  baseProductSchema.extend({
    category: z.literal("clothes"),
    details: ropaDetailsSchema,
  }),

  baseProductSchema.extend({
    category: z.literal("electronics"),
    details: electronicosDetailsSchema,
  }),

  baseProductSchema.extend({
    category: z.literal("home"),
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
      category: "CLOTHING";
      details: RopaDetails;
    }
  | {
      category: "ELECTRONICS";
      details: ElectronicosDetails;
    }
  | {
      category: "HOME";
      details: HogarDetails;
    };