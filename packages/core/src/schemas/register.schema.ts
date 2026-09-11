import z from "zod";
import { loginSchema } from "./login.schema";

export const typeAccountSchema = z.object({
  type: z.record(
    z.enum(["cliente", "empresa"], {
      error: " El tipo de cuenta solo puede ser cliente o negocio",
    }),
    z.string(),
  ),
});

export const bussines = z.object({
  type: z.literal("empresa"),
  ...loginSchema.shape,
  accountDetails: z.object({
    businessName: z
      .string({ error: "Nombre del negocio es requerido" })
      .min(1, "El nombre del negocio es requerido"),
    phoneNumber: z
      .string({ error: "Teléfono requerido" })
      .min(10, "Debe tener 10 dígitos")
      .max(10, "Debe tener 10 dígitos"),
    address: z
      .string({ error: "El dirección del negocio es requerido" })
      .min(1, "La dirección es requerida"),
    description: z.string().optional(),
  }),
});

export const client = z.object({
  type: z.literal("cliente"),
  ...loginSchema.shape,
  accountDetails: z.object({
    name: z.string({ error: "Nombre requerido" }).min(3, "Mínimo 3 letras"),
    phoneNumber: z
      .string({ error: "Teléfono requerido" })
      .min(10, "Debe tener 10 dígitos")
      .max(10, "Debe tener 10 dígitos"),
    address: z
      .string({ error: "Dirección requerida" })
      .min(1, "La dirección es requerida"),
  }),
});

export const registerSchema = z.discriminatedUnion("type", [
  // Validación condicional según tipo de cuenta
  bussines,
  client, 
]);

export type RegisterInput = z.input<typeof registerSchema>;
export type RegisterOutput = z.infer<typeof registerSchema>;
