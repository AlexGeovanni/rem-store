import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useUserStore } from "@/app/stores/useUserStore";
import { cn } from "@workspace/ui/lib/utils";
import ButtonBase from "@workspace/ui/components/buttonBase";

const invoices = [
  {
    orderId: "ORD-1001",
    customer: "Juan Perez",
    product: "Camisa de algodon blanca talla M para hombre",
    total: 150.0,
    status: "Pending",
    date: "2023-10-01",
  },
  {
    orderId: "ORD-1002",
    customer: "Maria Gomez",
    product: "Pantalon de mezclilla azul talla 32 para hombre",
    total: 250.0,
    status: "Shipped",
    date: "2023-10-02",
  },
  {
    orderId: "ORD-1003",
    customer: "Carlos Sanchez",
    product: "Zapatos deportivos ",
    total: 300.0,
    status: "Delivered",
    date: "2023-10-03",
  },
  {
    orderId: "ORD-1004",
    customer: "Ana Martinez",
    product: "Vestido de verano floral talla S para mujer",
    total: 200.0,
    status: "Cancelled",
    date: "2023-10-04",
  },
  {
    orderId: "ORD-1005",
    customer: "Luis Rodriguez",
    product: "Chaqueta de cuero negra talla L para hombre",
    total: 180.0,
    status: "Pending",
    date: "2023-10-05",
  },
];
export function TableOrders() {
  const userId = useUserStore((state) => state.user?.id);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => {
      // productService.getProducts(userId as string)
      return {content:[]}
    },
    enabled: !!userId,
  });

  if (isLoading || !data || data?.content?.length == 0)
    return (
      <TableProductsSkeleton
        isEmptyData={!isLoading ? data?.content?.length == 0 : false}
      />
    );
  return (
    <Table style={{}}>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Order ID</TableHead>
          <TableHead className="w-[150px]">Cliente</TableHead>
          <TableHead>Productos</TableHead>
          {/* <TableHead>Method</TableHead> */}
          <TableHead className="w-[180px] ">Total</TableHead>
          <TableHead className="w-[50px] ">Estatus</TableHead>
          <TableHead className="text-center">Fecha</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.content?.map((invoice: any) => (
          <TableRow key={invoice.id}>
            <TableCell className="p-2">
              <div className="">{invoice.id}</div>
            </TableCell>
            <TableCell className="font-medium">{invoice.customer}</TableCell>
            <TableCell className="">
              <p className=" w-[300px] line-clamp-3">{invoice.product}</p>
            </TableCell>
            <TableCell>${invoice.total}</TableCell>
            <TableCell className="text-center">{invoice.status}</TableCell>
            <TableCell className="text-center">{invoice.date}</TableCell>
            <TableCell className="text-center">X</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
    </Table>
  );
}

const TableProductsSkeleton = ({ isEmptyData }: { isEmptyData: boolean }) => {
  return (
    <div className="relative">
      <Table style={{}}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Order ID</TableHead>
            <TableHead className="w-[150px]">Cliente</TableHead>
            <TableHead>Productos</TableHead>
            {/* <TableHead>Method</TableHead> */}
            <TableHead className="w-[180px] ">Total</TableHead>
            <TableHead className="w-[50px] ">Estatus</TableHead>
            <TableHead className="text-center">Fecha</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index} className="hover:bg-transparent">
              <TableCell>
                <div
                  className={cn(
                    "h-[66px] w-[56px] bg-muted rounded",
                    !isEmptyData && "animate-pulse"
                  )}
                />
              </TableCell>
              <TableCell>
                <div
                  className={cn(
                    "h-4 bg-muted rounded w-full",
                    !isEmptyData && "animate-pulse"
                  )}
                />
              </TableCell>
              <TableCell className="space-y-2">
                <div
                  className={cn(
                    "h-4 bg-muted rounded w-full",
                    !isEmptyData && "animate-pulse"
                  )}
                />
                <div
                  className={cn(
                    "h-4 bg-muted rounded w-[300px]",
                    !isEmptyData && "animate-pulse"
                  )}
                />
              </TableCell>
              <TableCell>
                <div
                  className={cn(
                    "h-4 bg-muted rounded w-full",
                    !isEmptyData && "animate-pulse"
                  )}
                />
              </TableCell>
              <TableCell>
                <div
                  className={cn(
                    "h-4 bg-muted rounded w-full",
                    !isEmptyData && "animate-pulse"
                  )}
                />
              </TableCell>
              <TableCell>
                <div
                  className={cn(
                    "h-4 bg-muted rounded w-full",
                    !isEmptyData && "animate-pulse"
                  )}
                />
              </TableCell>
              <TableCell>
                <div
                  className={cn(
                    "h-8 bg-muted rounded w-8 mx-auto",
                    !isEmptyData && "animate-pulse"
                  )}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isEmptyData && (
        <div className="absolute z-20  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg rounded-lg">
          <div className="p-3 px-4 border  border-gray-200 rounded-lg bg-muted max-w-[380px] flex flex-col items-center justify-center gap-3">
            <div>
              <p className="text-lg font-medium text-center ">
                Aún no hay pedidos
              </p>
              <p className="text-sm text-center text-muted-foreground text-balance">
                Los pedidos aparecerán aquí cuando los clientes compren.
              </p>
            </div>
            <Link href={"/dashboard/product/create"}>
              <ButtonBase className="text-sm h-9 md-medium:h-11.5">
                Agregar producto
              </ButtonBase>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
