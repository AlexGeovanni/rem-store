"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormCreate from "./_components/form-create";
import AccountTypeSelector from "./_components/accountTypeSelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthForm } from "./_components/auth-form";
import Step from "./_components/step";
import { motion } from "motion/react";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import FooterForm from "../_components/footerForm";
import { PanelForm } from "../_components/panelForm";
import {
  registerSchema,
  type RegisterInput,
} from "@repo/core/schemas/register.schema";
import { registerApiSchema } from "@repo/core/schemas/register.api.schema";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { FieldGroup } from "@workspace/ui/components/field";
import { authService } from "@repo/api-client/service/auth.service";

const steps = [
  {
    id: 1,
    title: "Tipo de cuenta",
    fiedlName: ["type" as const],
  },
  {
    id: 2,
    title: "Información",
    fiedlName: ["email", "password"] as const,
  },
  {
    id: 3,
    title: "Finalizar",
    fiedlName: ["accountDetails"] as const,
  },
];

export type TypeAccount = "cliente" | "empresa";
export default function Page() {
  const [stepsPosition, setStepsPosition] = useState(0);
  const [stepsValid, setStepsValid] = useState<number[]>([]);
  const [modeXY, setModeXY] = useState<number>(0);
  const [validFormEnd, setValidFormEnd] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      resetAll();
      router.push("/auth/iniciar-sesion"); // Redirigir a la página de inicio de sesión o donde sea necesario
      // Redirigir, guardar token, etc.
    },
    onError: (_) => {
      setErrorMessage(
        "Error al registrar la cuenta. Por favor, inténtelo de nuevo.",
      );
    },
  });

  const resetAll = () => {
    form.reset();
    setStepsPosition(0);
    setStepsValid([]);
    setModeXY(0);
    setValidFormEnd(false);
    setLoad(true);
    setErrorMessage("");
  }

  const handleNextStep = async () => {
    setLoad(true);
    const valid = await form.trigger(steps[stepsPosition]?.fiedlName);
    if (valid) {
      setStepsValid([...stepsValid, stepsPosition]);
      setModeXY(1);
    } else {
      setStepsValid(stepsValid.filter((step) => step !== stepsPosition));
      setLoad(false);
    }
    if (stepsPosition >= 0 && valid) {
      if (stepsPosition < 2) setStepsPosition(stepsPosition + 1);
      if (stepsPosition === 2) setValidFormEnd(true);
      setLoad(false);
    }
  };

  const handleBackStep = () => {
  if (stepsPosition === 1) {
    form.reset()
  }

  setStepsPosition(prev => prev - 1);

  setValidFormEnd(false);

  setStepsValid(prev =>
    prev.length > 0 ? prev.slice(0, -1) : prev
  );

  setModeXY(-1);
};

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      type: undefined,
      email: "",
      password: "",
      accountDetails: {},
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setErrorMessage("");
    const parsed = registerApiSchema.parse(data);
    mutate(parsed);
  });

  const stepBgVariants = {
    active: { backgroundColor: "#e5e7eb" },
    completed: { backgroundColor: "#10b981" },
  };

  console.log(isError, errorMessage);
  
  return (
    <>
      <div className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-start space-y-6 transition-all mb-6">
        <div className="flex justify-between rounded py-8">
          {steps.map((step, i) => {
            const stepValid = stepsValid.includes(i);
            const stepPositionValid = stepsPosition === i;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center",
                  i < steps.length - 1 && "w-full",
                )}
              >
                <Step
                  step={step.id}
                  currentStep={stepPositionValid && !stepValid}
                  stepValid={stepValid}
                />
                {i < steps.length - 1 && (
                  <motion.div
                    variants={stepBgVariants}
                    animate={stepValid ? "completed" : "active"}
                    transition={{ duration: 0.3 }}
                    className={cn("w-full h-0.5 bg-gray-300 mx-2")}
                  ></motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <form
        className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-start space-y-6 transition-all"
        onSubmit={onSubmit}
      >
        <PanelForm direction={modeXY}>
          <FieldGroup>
            {stepsPosition === 0 && (
              <AccountTypeSelector
                form={form}
                handleNextStep={handleNextStep}
              />
            )}
            {stepsPosition === 1 && <AuthForm form={form} />}
            {stepsPosition === 2 && (
              <FormCreate form={form} type={form.getValues("type")} />
            )}
          </FieldGroup>
        </PanelForm>
        <div className="flex gap-1 items-center">
          {stepsPosition > 0 && !validFormEnd && (
            <Button
              variant={"link"}
              type="button"
              // className=" rounded-full text-sm h-9 xsm:h-[46px]  xsm:text-base  bg-[#000000] hover:bg-[#1d1d1d]"
              className="flex items-center text-sm cursor-pointer"
              onClick={handleBackStep}
              disabled={isPending}
            >
              <ArrowLeft />
              Regresar
            </Button>
          )}
          {stepsPosition > 0 && !validFormEnd && stepsPosition <= 2 && (
            <Button
              type="button"
              className="flex-1 rounded-full text-sm h-9 xsm:h-12 cursor-pointer xsm:text-base w-full bg-[#000000] hover:bg-[#1d1d1d]"
              onClick={handleNextStep}
              disabled={load}
            >
              {load && <Loader2Icon className="animate-spin" />}
              Siguiente
            </Button>
          )}

          {stepsPosition === 2 && validFormEnd && (
            <Button
              type="submit"
              className="flex-1 rounded-full cursor-pointer text-sm h-9 xsm:h-12 xsm:text-base w-full  bg-[#000000] hover:bg-[#1d1d1d]"
              disabled={isPending || load}
            >
              {isPending && <Loader2Icon className="animate-spin" />}
              {isPending ? "Creando cuenta..." :"Crear cuenta"}
            </Button>
          )}
        </div>
        {isError && (
          <div className="text-red-500 text-xs text-center sm:text-sm">
            {errorMessage}
          </div>
        )}
        <FooterForm type="sign-up" />
      </form>
    </>
  );
}

/**
 *  {stepsPosition > 0 && stepsPosition < 2 && (
            <Button
              type="button"
              className="rounded-full w-full py-6 bg-[#3A3AAF] hover:bg-[#303093]"
              onClick={handleNextStep}
            >
              Siguiente
            </Button>
          )}
          {stepsPosition === 2 && (
            <Button
              type="submit"
              className="rounded-full w-full py-6 bg-[#3A3AAF] hover:bg-[#303093]"
            >
              Crear cuenta
            </Button>
          )}


           <ol className="items-center border justify-around w-full space-x-4 flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
          {steps.map((step, i) => {
            const stepValid = stepsValid.includes(i);
            const stepPositionValid = stepsPosition === i;

            return (
              <li
                key={`step-${step.title}`}
                className={`flex flex-col border items-center cursor-pointer  space-x-2.5 rtl:space-x-reverse`}
                onClick={async () => {
                  const STEP_POS = i < 1 ? i : i - 1;
                  const valid = await form.trigger(steps[STEP_POS].fiedlName);
                  if (valid) setStepsPosition(i);
                }}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 border ${
                    stepValid
                      ? stepPositionValid
                        ? "border-blue-600"
                        : "border-green-600"
                      : stepPositionValid
                      ? "border-blue-600"
                      : "border-gray-500"
                  } rounded-full shrink-0`}
                >
                  {step.id}
                </span> 
                {stepPositionValid ? (
                  <CheckIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <span
                    className={`flex items-center justify-center w-8 h-8 border text-blue-600 border-blue-600 rounded-full shrink-0`}
                  >
                    {step.id}
                  </span>
                )}

                <span className="hidden sm:block">
                  <h3 className="font-sm text-sm leading-tight">{step.title}</h3>
                </span> 
              </li>
            );
          })}
        </ol>
 */
