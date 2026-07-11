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
import { useUserStore } from "@/app/stores/useUserStore";
import { SquarePen } from "lucide-react";
import ButtonBase from "@workspace/ui/components/buttonBase";
import { cn } from "@workspace/ui/lib/utils";
import { productService } from "@/app/lib/service/product.service";
const invoices = [
  {
    name: "Camisa",
    desc: "Camisa de algodon blanca talla M para hombre  ",
    price: 500,
    stock: 10,
    category: "Ropa",
  },
  {
    name: "Pantalon",
    desc: "Pantalon de mezclilla azul talla 32 para hombre ",
    price: 800,
    stock: 5,
    category: "Ropa",
  },
  {
    name: "Zapatos",
    desc: "Zapatos deportivos negros talla 42 para hombre",
    price: 1200,
    stock: 8,
    category: "Ropa",
  },
];
export function ProductTable() {
  const userId = useUserStore((state) => state.user?.id);

  const { data, isLoading } = useQuery({
    queryKey: ["products", userId],
    queryFn: () => productService.getProductByBusiness(userId as string),
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
          <TableHead className="w-[150px]">Imagen</TableHead>
          <TableHead className="w-[150px]">Nombre</TableHead>
          <TableHead>Descripcion</TableHead>
          {/* <TableHead>Method</TableHead> */}
          <TableHead className=" w-[180px] ">Precio</TableHead>
          <TableHead className=" w-[50px] ">Catidad</TableHead>
          <TableHead className="text-center ">Categoria</TableHead>
          <TableHead className="text-center ">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="relative">
        {data?.content?.map((product: any) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="inline-block border rounded-md p-0.5">
                <Image
                  src={product.url || "/images/placeholder.png"}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-sm object-cover h-[60px] w-[50px] object-center"
                />
              </div>
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="h-full">
              <div className=" w-[300px] text-wrap line-clamp-2">
                {product.description ?? "Sin descripción"} 
              </div>
            </TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell className="text-center">{product.stock}</TableCell>
            <TableCell className="text-center capitalize">{ product?.category.name ?? "Sin categoría"}</TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center">
                <Link
                  href={`/dashboard/product/${product.id}/update`}
                >
                  <SquarePen />
                </Link>
              </div>
            </TableCell>
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
            <TableHead className="w-[150px]">Imagen</TableHead>
            <TableHead className="w-[150px]">Nombre</TableHead>
            <TableHead>Descripcion</TableHead>
            {/* <TableHead>Method</TableHead> */}
            <TableHead className=" w-[180px] ">Precio</TableHead>
            <TableHead className=" w-[50px] ">Catidad</TableHead>
            <TableHead className="text-center ">Categoria</TableHead>
            <TableHead className="text-center ">Acciones</TableHead>
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
                Aún no hay productos disponibles
              </p>
              <p className="text-sm text-center text-muted-foreground text-balance">
                Los productos aparecerán aquí cuando agregues tu primer artículo
                al inventario
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
