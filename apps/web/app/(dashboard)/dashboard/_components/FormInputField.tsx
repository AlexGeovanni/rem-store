import {
  Field,
  FieldError,
  FieldLabel,
} from "@workspace/ui/components/field";
import {
  InputGroup,
  InputGroupInput,
} from "@workspace/ui/components/input-group";
import { Fragment } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

export default function FormInputField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type,
  required = true,
}: Props<T>) {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-full">
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <InputGroup className="h-auto">
              <InputGroupInput
                id={field.name}
                type={type ?? "text"}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                autoComplete="off"
                required={required}
                className="text-sm xs:text-base h-10"
                {...field}
                value={field.value || ""}
              />
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
