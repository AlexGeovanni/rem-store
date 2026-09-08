import { OrdersTable } from "./ordersTable";
import { Fragment } from "react";
export default function Order() {
  return (
    <Fragment>
      <h3 className="text-2xl font-medium mb-4">Historial</h3>
      <OrdersTable />
    </Fragment>
  );
}
