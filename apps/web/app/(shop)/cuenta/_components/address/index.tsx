import { Button } from "@workspace/ui/components/button";
// import { DialogAddress } from "./dialog-address";
import { TrashIcon } from "lucide-react";
import { DialogAddress } from "./dialogAddress";

export default function Address() {
  return (
    <div className="">
      <div className="flex flex-col items-start gap-2.5 md:flex-row md:items-center justify-between">
        <div>
          <p className="font-semibold">Direcciones Guardadas</p>
          <span className="inline-block text-xs text-gray-500">
            Gestiona tus direcciones de envío y facturación
          </span>
        </div>
        <div>
          <DialogAddress isNew={true} />
        </div>
      </div>
      <div className="mt-3 md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1">
          <div className="border border-green-300/80 shadow shadow-green-100 p-3 rounded-lg">
            <div>
              <p className="text-sm font-medium mb-1">Casa</p>
              <div className="px-2 py-1 text-[10px] leading-3 tracking-wide bg-green-200/40 text-green-500 inline-block rounded-full">
                Predeterminada
              </div>
            </div>
            <div className="space-y-2 mt-2 text-xs 2xl:text-sm">
              <div className="flex gap-3">
                <p>Alex Geovanni</p>
                <div>
                <p>Tel: 961-522-65-55</p>
              </div>
              </div>
              <div className="xl:w-1/2">
                <p className="text-wrap">
                  Av. Reforma 123, Col. Centro Ciudad de México, CDMX 06000
                  México
                </p>
              </div>
              
            </div>
            <div className="flex space-x-2 mt-3">
              <DialogAddress key={`dialog-address-edit`} />
              <Button
                variant={"destructive"}
                size={"icon"}
                className="rounded-full size-8 cursor-pointer hover:bg-red-500/80 transition-colors ease-out duration-200 xsm:size-10"
              >
                <TrashIcon className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
