import { cn } from "../lib/utils";

type Props = {
  price: number;
  className?: string
};

export default function FormatPrice({ price, className }: Props) {
 const format = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
}).format(price)
  return (
    <div className={cn('text-base relative font-medium', className)}>
      {format}
      {/* {isSales && (
        <hr
          className="absolute border-0 h-0.5 bg-gray-600 w-full 
          top-1/2 translate-y-1/4  "
        />
      )} */}
    </div>
  );
}