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
    <div className="bg-white p-4 pl-8  h-full">
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
