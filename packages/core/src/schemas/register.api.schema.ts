import z from "zod";
import { RegisterOutput, registerSchema } from "./register.schema";


export const registerApiSchema = registerSchema.transform((data:RegisterOutput) => {
  if (data.type === "empresa") {
    return {
      type: data.type,
      businessName: data.accountDetails.businessName,
      phoneNumber: data.accountDetails.phoneNumber,
      address: data.accountDetails.address,
      description: data.accountDetails.description,
      email: data.email,
      password: data.password,
    };
  }

  return {
    type: data.type,
    name: data.accountDetails.name,
    address: data.accountDetails.address,
    phoneNumber: data.accountDetails.phoneNumber,
    email: data.email,
    password: data.password,
  };
});

export type RegisterApiInput = z.infer<typeof registerApiSchema>;