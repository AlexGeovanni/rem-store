"use client";


import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addressSchema, type Address } from "@repo/core/schemas/address.schema";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { DialogClose } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";


const Label: string = "text-sm !text-gray-700";

const classNameInput: string = `border border-gray-300 p-3 py-2 rounded-lg shadow-sm
              transition-shadow  focus-within:border-ring/40 focus-within:outline-none 
              focus-within:ring-[2px] focus-within:ring-ring/0 has-[:disabled]:cursor-not-allowed 
              has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none
              `;

type FormAddressProps = {
  setOpen: () => void;
};

export default function FormAddress({ setOpen }: FormAddressProps) {
  const form = useForm<Address>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: "",
      name: "",
      address: "",
      phone: "",
      isDefault: false,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setTimeout(() => {
      form.reset();
      setOpen(); // Close the dialog after form submission
    }, 1000); // Simulate a delay for form reset
  });

  return (
    <form className="space-y-2.5 lg:space-y-3" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 lg:gap-3 ">
        <div className="col-span-1">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <div className={classNameInput}>
                  <FieldLabel htmlFor={field.name} className={cn("labelClass")}>
                    *Nombre de la direccion
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    className="autofill-fix border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 shad-no-focus placeholder:text-gray-500 placeholder:text-sm"
                    aria-invalid={fieldState.invalid}
                    placeholder="Casa, Oficina"
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
        </div>
        <div className="col-span-1 ">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <div className={classNameInput}>
                  <FieldLabel htmlFor={field.name} className={cn("labelClass")}>
                    *Telefono
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    className="autofill-fix border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 shad-no-focus placeholder:text-gray-500 placeholder:text-sm"
                    aria-invalid={fieldState.invalid}
                    placeholder="000 456 7810"
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
        </div>
      </div>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-full">
            <div className={classNameInput}>
              <FieldLabel htmlFor={field.name} className={cn("labelClass")}>
                *Nombre
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                className="autofill-fix border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 shad-no-focus placeholder:text-gray-500 placeholder:text-sm"
                aria-invalid={fieldState.invalid}
                placeholder="Ingresa tu nombre"
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

      <Controller
        name="address"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-full">
            <div className={classNameInput}>
              <FieldLabel htmlFor={field.name} className={cn("labelClass")}>
                *Direccion
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                className="autofill-fix border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 shad-no-focus placeholder:text-gray-500 placeholder:text-sm"
                aria-invalid={fieldState.invalid}
                placeholder="Ingresa tu dirección completa"
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

      <div className="flex justify-end space-x-2">
        <DialogClose asChild>
          <Button
            type="button"
            variant={"outline"}
            className="rounded-full w-full md:w-auto"
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="bg-black rounded-full w-full md:w-auto"
        >
          Guardar cambios
        </Button>
      </div>
    </form>
  );
}
