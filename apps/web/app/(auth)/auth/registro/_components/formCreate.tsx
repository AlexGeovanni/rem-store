"use client";

import { UseFormReturn, Controller } from "react-hook-form";
import { TypeAccount } from "../page";

import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { cn } from "@workspace/ui/lib/utils";
import { Textarea } from "@workspace/ui/components/textarea";
import { type RegisterInput } from "@repo/core/schemas/register.schema";
import FormInputController from "../../../../components/ui/formInputController/FormInputController";

export const labelClass: string = "text-base ";

export const classNameInput: string = `border border-gray-300 p-3 py-2 rounded-lg 
              transition-shadow  focus-within:border-ring/40 focus-within:outline-none 
              focus-within:ring-[2px] focus-within:ring-ring/0 has-[:disabled]:cursor-not-allowed 
              has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none
              `;

type Props = {
  form: UseFormReturn<RegisterInput>;
  type: TypeAccount; // 'sign-up' |'sign-in'
};

export default function FormCreate({ type, form }: Props) {
  return (
    <>
      {type === "empresa" && <GroupFormFieldBusiness form={form} />}
      {type === "cliente" && <GroupFormFieldClient form={form} />}
    </>
  );
}

type GroupFormFieldProps = {
  form: UseFormReturn<RegisterInput>;
};

const GroupFormFieldBusiness = ({ form }: GroupFormFieldProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 xl:flex-row  ">
        <FormInputController
          control={form.control}
          name="accountDetails.businessName"
          label="* Nombre"
          placeholder="Ingresa el nombre de la empresa"
          type="text"
        />
        <FormInputController
          control={form.control}
          name="accountDetails.phoneNumber"
          label="* Telefono"
          placeholder="tel: 000 456 7810"
          type="text"
        />
      </div>
      <FormInputController
        control={form.control}
        name="accountDetails.address"
        label="* Dirección"
        placeholder="Ingresar dirección"
        type="text"
      />

      <Controller
        name="accountDetails.description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-full">
            <div className={classNameInput}>
              <FieldLabel htmlFor={field.name} className={cn(labelClass)}>
                Descripción
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Descripción de la empresa (opcional)"
                className="resize-none autofill-fix border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 shad-no-focus placeholder:text-gray-500 placeholder:text-sm"
                autoComplete="off"
              />
            </div>
            {fieldState.invalid && (
              <FieldError
                className="text-xs ps-3"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
    </>
  );
};

const GroupFormFieldClient = ({ form }: GroupFormFieldProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2   ">
        <FormInputController
          control={form.control}
          name="accountDetails.name"
          label="* Nombre completo"
          placeholder="Ingresa tu nombre completo"
          type="text"
        />
        <FormInputController
          control={form.control}
          name="accountDetails.phoneNumber"
          label="* Telefono"
          placeholder="tel: 000 456 7810"
          type="text"
        />
        <FormInputController
          control={form.control}
          name="accountDetails.address"
          label="* Dirección"
          placeholder="Ingresar dirección"
          type="text"
        />
      </div>
    </>
  );
};