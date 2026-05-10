import { OrdersTable } from "./ordersTable";

export default function Order() {
  return (
    <div className="px-2">
      <h2 className="font-satoshi text-2xl mb-1 lg:mb-3">Ordenes</h2>
      <div className="">
        Cantidad <span> (10)</span>
      </div>
      <OrdersTable />
    </div>
  );
}
