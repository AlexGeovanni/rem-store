import { z } from "zod"


export const UserClientEditSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
  address: z.string().min(1, { message: "La dirección es requerida" }),
});

export const UserBusinessEditSchema = z.object({
  businessName: z.string().min(1, { message: "El nombre es requerido" }),
   phoneNumber: z.string().optional(),
      // .string({ error: "Teléfono requerido" })
      // .min(10, "Debe tener 10 dígitos")
      // .max(10, "Debe tener 10 dígitos"),
    address: z.string().optional(),
      // .string({ error: "El dirección del negocio es requerido" })
      // .min(1, "La dirección es requerida"),
    description: z.string().optional(),
});


export type UserClientEditInput = z.input<typeof UserClientEditSchema>;
export type UserClientEditOutput = z.infer<typeof UserClientEditSchema>;


export type UserBusinessEditInput = z.input<typeof UserBusinessEditSchema>;
export type UserBusinessEditOutput = z.infer<typeof UserBusinessEditSchema>;