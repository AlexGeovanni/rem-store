import FormInputController from "@/app/components/ui/formInputController/FormInputController";
import { userService } from "@/app/lib/service/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserEditSchema,
  UserClientEditInput,
} from "@repo/core/schemas/userEdit.schema";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import ButtonBase from "@workspace/ui/components/buttonBase";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@workspace/ui/components/dialog";
import { FieldGroup } from "@workspace/ui/components/field";
import { SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";

export function DialogAccout({ user }: any) {
  const { mutate } = useMutation({
    mutationFn: async (data: UserClientEditInput) => {
      userService.updateUser(data);
    },
    onSuccess: () => {
      // Aquí puedes manejar la respuesta exitosa de la actualización
    },
    onError: (error) => {
      // Aquí puedes manejar el error de la actualización
    },
  });

  const form = useForm<UserClientEditInput>({
    resolver: zodResolver(UserEditSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    mutate(data);
  });

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="rounded-full cursor-pointer text-sm"
        >
          <SquarePen className="size-5 md:size-4" />
          <span className="hidden md:block">Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-162 lg:max-w-[760px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className=" text-blreack text-start">
              Editar información personal
            </DialogTitle>
            <div className="flex flex-col text-sm text-muted-foreground">
              <div>Cliente</div>
              <div className="pr-3">
                <span className="text-gray-500">{user?.email}</span>
              </div>
            </div>
          </DialogHeader>
          <div className="flex flex-col space-y-3 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FieldGroup className="col-span-1">
                <FormInputController
                  control={form.control}
                  name="name"
                  label="* Nombre completo"
                  placeholder="Ingresar nombre completo"
                />
              </FieldGroup>
              <FieldGroup className="col-span-1">
                <FormInputController
                  control={form.control}
                  name="phoneNumber"
                  label="* Teléfono"
                  placeholder="Ingresar teléfono"
                />
              </FieldGroup>
            </div>
            <FieldGroup>
              <FormInputController
                control={form.control}
                name="address"
                label="* Dirección"
                placeholder="Ingresar dirección"
              />
            </FieldGroup>
          </div>
          <DialogFooter>
            <div className="flex flex-col w-full gap-3">
              <ButtonBase
                type="submit"
                className="block h-10 w-full md:w-50 px-10 rounded-full flex-none"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                Guardar cambios
              </ButtonBase>
              <DialogClose asChild>
                <Button
                  variant={"outline"}
                  className="block h-10 w-full md:w-50 px-10 rounded-full flex-none cursor-pointer"
                >
                  Cancelar
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
