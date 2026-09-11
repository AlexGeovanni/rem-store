"use client";

import { cn } from "@workspace/ui/lib/utils";
const data = [
  {
    title: "Total ventas",
    value: "$100,000",
    percentage: 10,
  },
  {
    title: "Total productos",
    value: "99",
    percentage: 10,
  },
  {
    title: "Total pedidos",
    value: "10",
    percentage: 10,
  },
  {
    title: "Total clientes",
    value: "11",
    percentage: 10,
  },
];

/**
 * Componente principal del dashboard
 * Muestra diferentes vistas basadas en el estado de tabs
 * Las validaciones son consistentes y verifican tanto tabAside como tabMenu
 */
export default function Page() {
  return (
    // <div className="bg-white p-4 pl-8 h-full">
    <div className="h-full space-y-6">
      <div className=" font-semibold text-lg lg:text-2xl">
        <h1>Resumen general</h1>
      </div>
      <div className="">
        <div className="grid grid-cols-4 gap-4">
          {data.map((item, index) => (
            <CardDashboard
              key={item.title + index}
              title={item.title}
              value={item.value}
              percentage={item.percentage}
              className="rounded-xl bg-muted/50"
            />
          ))}
        </div>
      </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="p-4 min-h-50 h-full bg-muted/50 rounded-xl">
              <p className="font-semibold text-lg">Top de productos</p>
              <p className="text-sm text-muted-foreground">
                Los productos más vendidos
              </p>
            </div>
            {/* <TableTopProducts /> */}
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50 min-h-50 ">
              <p className="font-semibold text-lg">Notificaciones</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 min-h-50 ">
              <p className="font-semibold text-lg">Reseñas recientes</p>
            </div>
          </div>
      </div>
      {/* {isProductsList && (
        <Fragment>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Productos</h2>
              <p>Gestione su inventario de productos.</p>
            </div>
            <Link href={"/dashboard/product/create"}>
              <ButtonBase
                className="flex-0 text-sm h-9 md-medium:h-11.5"
                onClick={handleClickAddProduct}
              >
                Agregar producto
              </ButtonBase>
            </Link>
          </header>
          <div>
            <TableProducts />
          </div>
        </Fragment>
      )}
      {isOrdersList && (
        <Fragment>
          <header>
            <h2 className="font-semibold">Gestión de pedidos</h2>
            <p>Seguimiento y gestión de pedidos de clientes.</p>
          </header>
          <div>
            <TableOrders />
          </div>
        </Fragment>
      )} */}
      {/* Fallback: si no hay coincidencia, mostrar mensaje o redirigir */}
      {/* {!isProductsList && !isOrdersList && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Cargando...</p>
        </div>
      )} */}
    </div>
  );
}

const CardDashboard = ({
  title,
  value,
  percentage,
  className,
}: {
  title: string;
  value: string;
  percentage: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "p-4 min-h-[150px] flex flex-col justify-between",
        className,
      )}
    >
      <p className="font-semibold text-lg">{title}</p>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <div className="text-xs text-muted-foreground">
          <span
            className={cn(percentage > 0 ? "text-green-500" : "text-red-500")}
          >
            {/* {percentage > 0 ? (
              <ArrowCaretUpIcon className="inline-flex -mr-1.5" />
            ) : (
              <ArrowCaretDownIcon className="inline-flex -mr-1.5" />
            )} */}
            {percentage}%
          </span>{" "}
          ultimo mes
        </div>
      </div>
    </div>
  );
};
