
import { RegisterInput } from "@repo/core/schemas/auth/register.schema";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldSet, FieldTitle } from "@workspace/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

type Accounts = {
  id: number;
  title: string;
  description: string;
};
const accounts: Accounts[] = [
  {
    id: 1,
    title: "Cliente",
    description: "Cuenta personal para realizar compras.",
  },
  {
    id: 2,
    title: "Empresa",
    description: "Cuenta empresarial para realizar ventas y administrar.",
  },
];

type Props = {
  // handleOnchange:(e: React.ChangeEvent<HTMLInputElement>)=>void
  form: UseFormReturn<RegisterInput>;
  handleNextStep: () => void;
};

export default function AccountTypeSelector({ form, handleNextStep }: Props) {
  return (
    <>
      <Controller
        control={form.control}
        name="type"
        render={({ field,fieldState }) => (
          <FieldSet data-invalid={fieldState.invalid} className="">
            <p  className="text-xl font-title font-bold text-center md:text-start md:text-2xl!">
              Seleccione el tipo de cuenta
            </p>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  handleNextStep();
                }}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex space-y-4 pt-5 flex-col justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">
                  {accounts.map((account) => (
                    <FieldLabel
                      onClick={() => {
                        if (field.value === account.title.toLocaleLowerCase())
                          handleNextStep();
                      }}
                      key={account.id}
                      className="flex-1 cursor-pointer has-data-[state=checked]:bg-transparent has-data-[state=checked]:border-black has-data-[state=checked]:shadow-lg   "
                      htmlFor={`form-type-account-${account.id}`}
                    >
                      <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                      >
                        <FieldContent>
                          <FieldTitle className="text-lg font-title tracking-tight font-bold md:text-xl">{account.title}</FieldTitle>
                          <FieldDescription>{account.description}</FieldDescription>
                        </FieldContent>
                        <div className="hidden">
                          <RadioGroupItem
                            value={account.title.toLocaleLowerCase()}
                            id={`form-type-account-${account.id}`}
                            aria-invalid={fieldState.invalid}
                          />
                        </div>
                      </Field>
                      {/* <FormLabel
                        className={`flex h-full flex-col space-y-2 border
                      rounded-md p-4 cursor-pointer hover:shadow-lg 
                      hover:border-gray-900 transition all ease-out duration-300
                       font-normal ${
                         field.value === account.title.toLocaleLowerCase()
                           ? "border-gray-900"
                           : "border-gray-300"
                       }`}
                      >
                        <FormControl className="hidden">
                          <RadioGroupItem
                            value={account.title.toLocaleLowerCase()}
                          />
                        </FormControl>
                        <div>
                          <h3 className="text-lg font-semibold md:text-xl ">
                            {account.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 text-balance leading-5">
                          {account.description}
                        </p>
                      </FormLabel> */}
                    </FieldLabel>
                  ))}
                </div>
              </RadioGroup>
          </FieldSet>
        )}
      />
    </>
  );
}
