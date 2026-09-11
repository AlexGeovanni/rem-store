"use client";

import Link from "next/link";
import { TABS_LAYOUT, TABS_MENU, useTabStore } from "@/app/stores/dashboard/tab-dashboard";
import ButtonBase from "@workspace/ui/components/buttonBase";
import { ProductTable } from "../_components/tables/ProductTable";

export default function Page() {
  const { setTabAside } = useTabStore();

  const handleClickAddProduct = () => {
    setTabAside(TABS_LAYOUT.PRODUCTS, TABS_MENU.PRODUCTS_CREATE);
  };

// p-4 pr-8 
  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-medium text-lg lg:text-2xl">Productos</h1>
          <p>Gestione su inventario de productos.</p>
        </div>
        <Link href={"/dashboard/product/create"}>
          <ButtonBase
            className="flex-0 text-sm h-11"
            onClick={handleClickAddProduct}
          >
            Agregar producto
          </ButtonBase>
        </Link>
      </header>
      <div className="p-4">
        <ProductTable />
      </div>
      {/* Fallback: si no hay coincidencia, mostrar mensaje o redirigir */}
      {/* {!isProductsList && !isOrdersList && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Cargando...</p>
        </div>
      )} */}
    </div>
  );
}
