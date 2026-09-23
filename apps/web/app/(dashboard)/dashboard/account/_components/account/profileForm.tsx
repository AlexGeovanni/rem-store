import { userService } from "@/app/lib/service/user.service";
import {
  UserBusinessEditInput,
  UserBusinessEditSchema,
} from "@repo/core/schemas/userEdit.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@workspace/ui/lib/toast";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import FormInputField from "../../../_components/FormInputField";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonBase from "@workspace/ui/components/buttonBase";
import { Button } from "@workspace/ui/components/button";
import type { User } from "@repo/core/types/user";
import { userQueryKeys } from "@/app/lib/queryKeys";

export default function ProfileForm({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const form = useForm<UserBusinessEditInput>({
    resolver: zodResolver(UserBusinessEditSchema),
    mode: "onChange",
    defaultValues: {
      businessName: user?.businessName,
      phoneNumber: "",
      address: "",
      description: user?.description,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UserBusinessEditInput) => {
      return await userService.updateBusiness(data);
    },
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.business(),
      });

      toast.success("Cambios guardados correctamente", {
        position: "top-right",
      });
      form.reset(variables);
    },
    onError: () => {
      // Aqui puedes manejar el error de la actualizacion
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    mutate(data);
  });

  const handleCancel = () => {
    form.reset();
  };

  return (
    <Fragment>
      <h2 className="text-lg font-medium">Perfil</h2>
      <div className="flex items-center gap-3">
        <div className="size-12 rounded-full bg-amber-200"></div>
        <div className="text-sm text-gray-500">
          {/* Cliente desde {user ? formatDateCreatAt(user?.createdAt) : "--"} */}
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <FormInputField
            control={form.control}
            name="businessName"
            label="* Nombre Completo"
            type="text"
            placeholder="Ingresa el nombre completo"
          />
          <FormInputField
            control={form.control}
            name="phoneNumber"
            label="Telefono"
            type="text"
            placeholder="Ingresa el telefono"
            disabled
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormInputField
            control={form.control}
            name="address"
            label="Direccion"
            type="text"
            placeholder="Ingresa la direccion del local"
            disabled
          />
        </div>
        <div>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-0.5">
                <FieldLabel htmlFor={field.name}>*Descripcion</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder="Describe el producto..."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value?.length}/100 caracteres
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )}
          />
        </div>
        <div className="col-span-1 flex justify-end items-center gap-3">
          <ButtonBase
            type="submit"
            className="flex-0 w-full rounded-full h-9 xsm:h-11 px-10 "
            disabled={
              isPending ||
              !form.formState.isDirty ||
              !form.formState.isValid ||
              form.formState.isSubmitting
            }
          >
            Guardar cambios
          </ButtonBase>
          <Button
            type="button"
            variant={"outline"}
            className="px-10 rounded-full flex-none cursor-pointer h-9 xsm:h-11"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Fragment>
  );
}
