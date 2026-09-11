import { useUserStore } from "@/app/stores/useUserStore";
import ButtonBase from "@workspace/ui/components/buttonBase";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  UserClientEditInput,
  UserClientEditSchema,
} from "@repo/core/schemas/userEdit.schema";
import { userService } from "@/app/lib/service/user.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@workspace/ui/components/field";
import FormInputController from "@/app/components/ui/formInputController/FormInputController";
import { toast } from "@workspace/ui/lib/toast";
import formatDateCreatAt from "@repo/core/utils/formartDateCreatAt";

export default function ResumenAccount() {
  const { user } = useUserStore();

  const initialName = user?.name?.split(" ")[0]?.charAt(0) || "U";

  const form = useForm<UserClientEditInput>({
    resolver: zodResolver(UserClientEditSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UserClientEditInput) => {
      return await userService.updateUser(data);
    },
    onSuccess: (_response, variables) => {
      toast.success("Cambios guardados correctamente",{position:"top-right"})
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
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h2 className="mb-1 font-medium text-3xl">Configuracion de cuenta</h2>
      </div>
      <div>
        <h3 className="font-medium text-2xl mb-4">Perfil</h3>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-xl font-medium h-15 w-15 bg-amber-600 rounded-full flex items-center justify-center">
            <span className="text-white">{initialName}</span>
          </div>
          <div className="">
            <div className="text-sm text-gray-500">
              Cliente desde {user ? formatDateCreatAt(user.createdAt) : "--"}
            </div>
            <div className="text-sm text-gray-500">0 - pedidos realizados</div>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <ItemInfo label="Correo electronico" value={user?.email || ""} />
          <FieldGroup className="col-span-1">
            <FormInputController
              control={form.control}
              name="name"
              label="Nombre completo"
              placeholder="Ingresar nombre completo"
            />
          </FieldGroup>
          <FieldGroup className="col-span-1">
            <FormInputController
              control={form.control}
              name="phoneNumber"
              label="Telefono"
              placeholder="Ingresar telefono"
            />
          </FieldGroup>
          <FieldGroup>
            <FormInputController
              control={form.control}
              name="address"
              label="Direccion"
              placeholder="Ingresar direccion"
            />
          </FieldGroup>
          <div className="col-span-1 flex justify-end items-center gap-3">
            <ButtonBase
              type="submit"
              className="flex-0 w-full rounded-full h-9 xsm:h-11 px-10 "
              disabled={isPending || 
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
        </div>
      </form>
    </div>
  );
}

type PropsItem = {
  label: string;
  value: string;
  classname?: string;
};

const ItemInfo = ({ label, value, classname }: PropsItem) => {
  return (
    <div className={cn("w-full p-2", classname)}>
      <label htmlFor="" className="font-medium text-sm text-zinc-600">
        {label}
      </label>
      <p className="text-black text-sm py-2">{value}</p>
    </div>
  );
};
