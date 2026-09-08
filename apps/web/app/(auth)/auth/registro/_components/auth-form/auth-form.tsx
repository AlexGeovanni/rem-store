import {UseFormReturn } from "react-hook-form";
import { RegisterInput } from "@repo/core/schemas/auth/register.schema";
import FormInputController from "../../../../../components/ui/formInputController/FormInputController";
import { Fragment } from "react";

type Props = {
  form: UseFormReturn<RegisterInput>;
};

export const AuthForm = ({ form }: Props) => {
  return (
    <Fragment>
      <FormInputController
        control={form.control}
        name="email"
        label="* Correo electronico"
        placeholder="Ingresar correo electronico"
        type="email"
      />
      <FormInputController
        control={form.control}
        name="password"
        label="* Contraseña"
        placeholder="Ingresar contraseña"
        type="password"
      />  
    </Fragment>
  );
};
