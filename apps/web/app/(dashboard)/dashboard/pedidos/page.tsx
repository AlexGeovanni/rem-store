"use client";

import { OrdersTable } from "@/app/(shop)/cuenta/_components/order/ordersTable";
import { TABS_LAYOUT, TABS_MENU, useTabStore } from "@/app/stores/dashboard/tab-dashboard";

/**
 * Componente principal del dashboard
 * Muestra diferentes vistas basadas en el estado de tabs
 * Las validaciones son consistentes y verifican tanto tabAside como tabMenu
 */
export default function Page() {
  const { tabAside, tabMenu, setTabAside } = useTabStore();

  const handleClickAddProduct = () => {
    setTabAside(TABS_LAYOUT.PRODUCTS, TABS_MENU.PRODUCTS_CREATE);
  };

  // Validación mejorada: verificar que ambos valores coincidan
  const isProductsList =
    tabAside === TABS_LAYOUT.PRODUCTS && tabMenu === TABS_MENU.PRODUCTS_LIST;
  const isOrdersList =
    tabAside === TABS_LAYOUT.ORDERS && tabMenu === TABS_MENU.ORDERS_LIST;

  return (
    <div className="bg-white p-4 pl-8 h-full">
      <header>
        <h2 className="font-semibold">Gestión de pedidos</h2>
        <p>Seguimiento y gestión de pedidos de clientes.</p>
      </header>
      <div>
        <OrdersTable />
      </div>
    </div>
  );
}
