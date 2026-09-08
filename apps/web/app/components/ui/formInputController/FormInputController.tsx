import { Field, FieldError } from "@workspace/ui/components/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group";
import { Fragment } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?:string
}

export default function FormInputController<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type
}: Props<T>) {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-full">
            <InputGroup className="h-auto">
              <InputGroupInput
                id={field.name}
                type={type ?? "text"}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                autoComplete="off"
                required
                className="text-sm xs:text-base"
                {...field}
                value={field.value || ""}
              />
              <InputGroupAddon align="block-start">
                <InputGroupText>{label}</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && (
              <FieldError
                className="text-xs ps-3"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
    </Fragment>
  );
}
