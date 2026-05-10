
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
  import Image from "next/image";
  import Link from "next/link";
  import { useQuery } from "@tanstack/react-query";
  import { productService } from "@/service/dashboard/product.service";
  import { useUserStore } from "@/stores/useUserStore";
  import { cn } from "@/lib/utils";
  import { categoryMap } from "@/lib/validations/schame-product-create";

  export function TableTopProducts() {
    const userId = useUserStore((state) => state.user?.id);
  
    const { data, isLoading } = useQuery({
      queryKey: ["products", userId],
      queryFn: () => productService.getProducts(userId as string),
      enabled: !!userId,
    });
  
    if (isLoading || !data || data?.content?.length == 0)
      return (
        <TableProductsSkeleton
          isEmptyData={!isLoading ? data?.content?.length == 0 : false}
        />
      );
    // if(!data || data?.content?.length == 0) return <TableProductsEmpty />
    return (
      <Table style={{}}>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-center">Imagen</TableHead>
            <TableHead className="w-[150px] text-center">Nombre</TableHead>
            <TableHead className=" w-[180px] text-center">Precio</TableHead>
            <TableHead className=" w-[50px] text-center">Ventas</TableHead>
            <TableHead className="text-center ">Categoria</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {data?.content.slice(0, 5).map((invoice: any) => (
            <TableRow key={invoice.id} className="">
              <TableCell className="px-4">
                <div className="inline-block border rounded-md p-0.5">
                  <Image
                    src={`/img/man-clothes.webp`}
                    alt={invoice.name}
                    width={80}
                    height={80}
                    className="rounded-sm object-cover h-[60px] w-[50px] object-center"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium text-center">{invoice.name}</TableCell>
              <TableCell className="text-center">${invoice.price}</TableCell>
              <TableCell className="text-center">{invoice.stock}</TableCell>
              <TableCell className="text-center capitalize">{ categoryMap[invoice.details.category as keyof typeof categoryMap] ?? "Sin categoría"}</TableCell>
            </TableRow>
      ))}
    </TableBody>
  </Table>
);
}
  const TableProductsSkeleton = ({ isEmptyData }: { isEmptyData: boolean }) => {
    return (
      <div className="relative">
        <Table style={{}}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-center">Imagen</TableHead>
              <TableHead className="w-[150px] text-center">Nombre</TableHead>
              <TableHead className="w-[180px] text-center">Precio</TableHead>
              <TableHead className="w-[50px] text-center">Ventas</TableHead>
              <TableHead className="text-center ">Categoria</TableHead>
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
                <TableCell>
                  <div
                    className={cn(
                      "h-4 bg-muted rounded w-3/4 mx-auto",
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
                      "h-4 bg-muted rounded w-3/4 mx-auto",
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
            <div className="p-3  border  border-gray-200 rounded-lg bg-muted max-w-[320px] flex flex-col items-center justify-center gap-3">
              <div>
                <p className="text-lg font-medium text-center ">
                No hay datos disponibles.
                </p>
                <p className="text-sm text-center text-muted-foreground text-balance">
                Cuando empiecen las ventas, aquí verás los más vendidos.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };