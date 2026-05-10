import z from "zod";

export const loginSchema = z.object({
  email: z.email("Por favor ingrese un correo valido"),
  password: z
    .string({ error: "La contraseña es obligatoria" })
    .trim()
    .min(8, "Contraseña min 8")
    .max(16, "Contraseña maximo 16"),
});

export type LoginInput = z.input<typeof loginSchema>;
export type LoginOutput = z.infer<typeof loginSchema>;