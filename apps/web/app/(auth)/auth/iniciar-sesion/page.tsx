"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PanelForm } from "../_components/panelForm";
import { FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import ButtonBase from "@workspace/ui/components/buttonBase";
import FooterForm from "../_components/footerForm";
import {
  type LoginInput,
  loginSchema,
} from "@repo/core/schemas/auth/login.schema";

import FormInputController from "../_components/FormInputController";
import { authService } from "@repo/api-client/service/auth.service";
import { useCartStore } from "@/app/stores/useCartStore";
import { useCart } from "@/app/hooks/useCart";
export const labelClass: string = "text-base ";

export const classNameInput: string = `border border-gray-300 p-3 py-2 rounded-lg 
              transition-shadow  focus-within:border-ring/40 focus-within:outline-none 
              focus-within:ring-[2px] focus-within:ring-ring/0 has-[:disabled]:cursor-not-allowed 
              has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none
              `;

export default function Page() {
  const router = useRouter();
  const [messageLoad, setMessageLoad] = useState<string>("");

  const guestItems = useCartStore((state) => state.items);
  const clearGuestCart = useCartStore((state) => state.clearCart);
  const { mergeCart } = useCart();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: authService.login,
    onSuccess: async (_) => {
      setMessageLoad("Inicio de sesión exitoso.");

      // merge
      // if (guestItems.length > 0) {
      //   await mergeCart(
      //     guestItems.map((item) => ({
      //       productId: item.productId,
      //       quantity: item.quantity,
      //     })),
      //   );
      // }

      clearGuestCart();

      router.push("/cart");
    },
    onError: async (err) => {
      setMessageLoad(err.message);
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
    setMessageLoad("");
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
            className="cursor-pointer rounded-full text-sm h-9 xsm:h-11 xsm:text-base w-full "
            disabled={isPending}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            Entrar
          </ButtonBase>
          <div className="w-full">
            <FooterForm type="sign-in" />
            {(isError || isSuccess) && (
              <FieldLabel
                className={`text-sm ${
                  isError
                    ? "text-red-600 bg-red-100"
                    : "text-green-600 bg-green-100"
                } text-center inline-block w-full  p-3 rounded-md mt-1`}
              >
                {messageLoad}
              </FieldLabel>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
