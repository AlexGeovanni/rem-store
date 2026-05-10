import z from 'zod';


export const addressSchema = z.object({
    title: z.string().min(2, "El título es requerido"),
    name: z.string().min(3, "El nombre es requerido"),
    address: z.string().min(10, "La dirección es requerida"),
    phone: z
    .string()
    .length(10, "El teléfono debe tener exactamente 10 dígitos")
    .regex(/^\d+$/, "El teléfono debe contener solo números"),
    isDefault: z.boolean().optional(),
});

export type Address = z.infer<typeof addressSchema>;