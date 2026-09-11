import ButtonBase from  "@workspace/ui/components/buttonBase"
import FormatPrice from "@repo/core/utils/formatPrice";
interface ResumenCartProps {
    subtotal: number;
    total: number;
    isNotEmpty:boolean;
}

export default function ResumenCart({ subtotal, total,isNotEmpty }: ResumenCartProps) {

    return (
      <div className="py-3 lg:px-2 lg:py-0">
        <div className="pb-3">
          <p className="font-semibold mb-2 text-xl lg:mb-4">
            Resumen
          </p>
          <div>
            <div className="flex justify-between items-center mb-1">
              Subtotal
              <div>
                {isNotEmpty ? <span>{FormatPrice(subtotal)}</span>:<span>--</span>}
              </div>
            </div>
            <div className="flex justify-between items-start mb-1 flex-nowrap gap-1">
              Gastos de envíos y gestión estimados
              <div>
                {isNotEmpty ? <span>Gratis</span>:<span>--</span>}
              </div>
            </div>
            <div className="flex justify-between items-center mb-1">
              Descuento
              <div className="text-destructive">
               {isNotEmpty ? <span>$0</span>:<span>--</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="font-medium flex justify-between items-center py-1 lg:border-y lg:py-3 border-gray-300">
          Total
          <div>
            {isNotEmpty ? <span>{FormatPrice(total)}</span>:<span>--</span>}
          </div>
        </div>
        <div className="py-10 hidden opacity-0 lg:block lg:opacity-100">
          <ButtonBase
            className="w-full py-6"
          >
            Comprar
          </ButtonBase>
        </div>
      </div>
    );
  };