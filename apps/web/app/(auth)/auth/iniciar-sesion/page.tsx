"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PanelForm } from "../_components/panelForm";
import { FieldGroup } from "@workspace/ui/components/field";
import ButtonBase from "@workspace/ui/components/buttonBase";
import FooterForm from "../_components/footerForm";
import {
  type LoginInput,
  loginSchema,
} from "@repo/core/schemas/login.schema";

import { authService } from "@repo/api-client/service/auth.service";
import { useCartStore } from "@/app/stores/useCartStore";
import { useCart } from "@/app/hooks/useCart";
import FormInputController from "@/app/components/ui/formInputController/FormInputController";
import { toast } from "@workspace/ui/lib/toast";

export default function Page() {
  const router = useRouter();

  const guestItems = useCartStore((state) => state.items);
  const clearGuestCart = useCartStore((state) => state.clearCart);
  const { mergeCart } = useCart();

  const { mutate, isPending, } = useMutation({
    mutationFn: authService.login,
    onSuccess: async (_) => {
      toast.success("Inicio de sesión exitoso.")

      //merge carrito
      if (guestItems.length > 0) {
        await mergeCart(
          guestItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        );
      }

      clearGuestCart();

      router.replace("/carrito");
      router.refresh();
    },
    onError: async (_) => {
      toast.error("No pudimos iniciar sesión. Verifica tu correo y contraseña e inténtalo de nuevo.")
    },
  });

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    mutate(data);
  });

  return (
    <>
      <form
        className="flex max-h-200 w-full max-w-145 flex-col justify-start space-y-3 md:space-x-5 transition-all"
        onSubmit={onSubmit}
      >
        <h1 className="text-2xl font-title tracking-tight font-bold md:text-3xl lg:text-4xl">
          Inicia sesión
        </h1>

        <PanelForm direction={0} size="171.3px">
          <FieldGroup>
            <FormInputController
              control={form.control}
              name="email"
              label="*Correo electronico"
              placeholder="Ingresar correo electronico"
              type="email"
            />
            <FormInputController
              control={form.control}
              name="password"
              label="*Contraseña"
              placeholder="Ingresar contraseña"
              type="password"
            />
          </FieldGroup>
        </PanelForm>
        <div>
          <ButtonBase
            type="submit"
            className="cursor-pointer rounded-full text-sm h-11 xsm:text-base w-full "
            disabled={isPending}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            Entrar
          </ButtonBase>
          <div className="w-full">
            <FooterForm type="sign-in" />
          </div>
        </div>
      </form>
    </>
  );
}
