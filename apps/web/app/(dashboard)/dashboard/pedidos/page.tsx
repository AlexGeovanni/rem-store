"use client";

import { OrdersTable } from "@/app/(shop)/cuenta/_components/order/ordersTable";

/**
 * Componente principal del dashboard
 * Muestra diferentes vistas basadas en el estado de tabs
 * Las validaciones son consistentes y verifican tanto tabAside como tabMenu
 */
export default function Page() {
  
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
