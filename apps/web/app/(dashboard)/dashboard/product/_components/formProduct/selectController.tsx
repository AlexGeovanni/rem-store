import { Field, FieldError } from "@workspace/ui/components/field";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";
import { Fragment } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SelectComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TValue = string,
> {
  control: Control<TFieldValues>;
  data: ReadonlyArray<{ label: string; value: TValue }>;
  name: Path<TFieldValues>;
  label:string,
  disabled?:boolean;
  defaultValue?:string,
  placeholder?: string;
  className?: string;
}

export default function SelectController<
  TFieldValues extends FieldValues = FieldValues,
  TValue = string,
>({
  control,
  data,
  name,
  label,
  disabled=false,
  defaultValue="",
  className,
}: SelectComponentProps<TFieldValues, TValue>) {    
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        disabled={disabled}
        render={({ field, fieldState }) => (
          <Field
          data-invalid={fieldState.invalid}
          className={cn("w-full", className)}
          >
          <Label htmlFor={field.name}>{label}</Label>
            <Select
              {...field}
              onValueChange={field.onChange}
              // value={String(field.value || defaultValue)}
            >
              <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0 h-10! ">
                <SelectValue
                  className="cursor-pointer"
                  placeholder="seleccionar"
                />
              </SelectTrigger>
              <SelectContent>
                {data.map((option, i) => (
                  <SelectItem
                    key={i}
                    className="cursor-pointer h-10"
                    value={String(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && (
              <FieldError>{String(fieldState.error.message ?? "")}</FieldError>
            )}
          </Field>
        )}
      />
    </Fragment>
  );
}
