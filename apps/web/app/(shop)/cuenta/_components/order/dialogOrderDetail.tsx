
import { Button } from "@workspace/ui/components/button";
import ButtonBase from "@workspace/ui/components/buttonBase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@workspace/ui/components/dialog";
import { EyeIcon } from "lucide-react";

export function DialogOrderDetail() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full cursor-pointer text-sm">
          <EyeIcon className="w-4 h-4" />
          Ver orden
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[800px] lg:max-w-[990px]">
        <DialogHeader>
          <DialogTitle className=" text-blreack text-start">
            Detalles de la orden{" "}
          </DialogTitle>
            <div className="flex text-sm text-muted-foreground">
              <div className="pr-3">
                Orden - <span className="text-gray-500">INV005</span>{" "}
              </div>
              <div className="pr-3">
                Empresa: <span>Juana</span>
              </div>
            </div>
        </DialogHeader>
        <div className="flex flex-col gap-0">
          <div className="custom-scrollbar max-h-[500px] lg:max-h-[320px] overflow-auto ">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-start py-2 pr-2">
                <div className="size-24 md:size-16 bg-gray-500 mr-2"></div>
                <div className="flex-1 flex flex-col-reverse justify-between w-full md:flex-row">
                  <div className="">
                    <div className="text-black text-base">Nike Victory</div>
                    <div className="text-gray-600 text-sm max-w-[18ch] md:max-w-full">
                      <p className="truncate">
                        Falda de tenis Dri-FIT corta con volantes para mujer
                      </p>
                      <p className="hidden md:block">
                        Azul marino militar/Blanco
                      </p>
                      <p>Talla XS</p>
                    </div>
                  </div>
                  <div className="text-sm hidden md:block">Cant. 9</div>
                  <div className="text-sm hidden md:block">$3500</div>
                  <div className="flex w-full justify-between md:hidden">
                    <div className="text-sm">Cant. 9</div>
                    <div className="text-sm ml-4">$3500</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 py-3">
            <div className="text-sm">
              <div className="flex justify-between items-center mb-1">
                Subtotal
                <div>
                  <span>$1000</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-1 flex-nowrap gap-1">
                Gastos de envíos y gestión estimados
                <div>
                  <span>Gratis</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-1">
                Descuento
                <div className="text-destructive">
                  <span>-$1250</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <ButtonBase
              type="button"
              className=" h-[40px] w-[200px] px-10 rounded-full flex-none"
            >
              Aceptar
            </ButtonBase>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
