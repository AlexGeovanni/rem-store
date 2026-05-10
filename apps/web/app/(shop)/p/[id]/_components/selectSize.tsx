import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@workspace/ui/components/field";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import { sizeGroup } from "../data/product";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";

export function SelectSize() {
  const [selected,setSelected]=useState<string>(sizeGroup["SM"])

  const handleSelectSize=(size:string)=>setSelected(size)

  return (
    <RadioGroup className="grid grid-cols-5 sm:grid-cols-7 tablet:grid-cols-5">
      {Object.keys(sizeGroup).map((s, i) => (
        <FieldLabel key={`${s}-${i}`} htmlFor={s} className={cn('relative',selected.toLocaleLowerCase()==s.toLocaleLowerCase() && "border-black")}>
          <Field orientation="horizontal" onClick={()=>handleSelectSize(s)} className="cursor-pointer">
            <FieldContent className="grid place-items-center">
              <FieldTitle>{s}</FieldTitle>
            </FieldContent>
            <RadioGroupItem
              value={s}
              id={s}
              className="absolute opacity-0 pointer-events-none"
            />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
