import { z } from "zod"


export const UserEditSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
  address: z.string().min(1, { message: "La dirección es requerida" }),
});

export type UserEditInput = z.input<typeof UserEditSchema>;
export type UserEditOutput = z.infer<typeof UserEditSchema>;
