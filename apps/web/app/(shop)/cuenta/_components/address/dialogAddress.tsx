"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
// import FormAddress from "./form-address";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import FormAddress from "./formAddress";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
// import { TypeAddress } from "@/app/lib/validations/schame-address";

type DialogAddressProps = {
  isNew?: boolean;
};

export function DialogAddress({ isNew = false }: DialogAddressProps) {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(true);
  const [data, setData] = useState({
    title: "",
    name: "",
    address: "",
    phone: "",
    isDefault: false,
  });
  const handleOpenChange = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isNew ? (
          <Button className="rounded-full cursor-pointer text-sm h-9 flex items-center justify-center xsm:h-[40px] bg-[#000000] hover:bg-[#1d1d1d]">
            <Plus className="inline-block size-5" />
            Agregar dirección
          </Button>
        ) : (
          <Button
            variant={"outline"}
            size={"sm"}
            className="flex-1 rounded-full cursor-pointer h-9 xsm:h-[40px]"
          >
            Editar
          </Button>
        )}
      </DialogTrigger>
      {/* h-full flex flex-col justify-start sm:max-w-[500px] md:max-w-[650px] */}
      <DialogContent className=" sm:max-w-[500px] md:max-w-[650px] ">
        <DialogHeader>
          <DialogTitle className=" text-blreack text-start mb-2">
            {isNew ? "Nueva Dirección" : "Editar Dirección"}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex items-center cursor-pointer justify-start space-x-2">
              {/* <div className="text-black text-base">Casa</div> */}
              <Checkbox
                id="address-default"
                checked={false}
                onCheckedChange={(checked: boolean) => setCheck(checked)}
                className="border-gray-300 size-5 rounded-full data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white "
              />
              <Label
                htmlFor="address-default"
                className={cn(
                  "cursor-pointer px-2 py-1.5 text-xs leading-3 tracking-wide inline-block rounded-full",
                  check
                    ? "bg-green-200/40 text-green-500"
                    : "bg-gray-300/70 text-gray-500"
                )}
              >
                Predeterminada
              </Label>
            </div>
          </DialogDescription>
        </DialogHeader>
        <FormAddress setOpen={handleOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
