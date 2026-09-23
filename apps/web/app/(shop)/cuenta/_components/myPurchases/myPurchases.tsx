import Order from "../order";

export default function MyPurchases() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="mb-1 font-medium text-3xl">Mis compras</h2>
      </div>
      <div className="mb-4">
        <h3 className="mb-3 font-medium text-2xl">Estadísticas</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-200/40 p-2 py-4 rounded-md space-y-1 flex flex-col justify-center items-center">
            <p className="text-blue-500 text-xl font-medium">10</p>
            <span className="inline-block text-sm text-zinc-600">
              Total pedidos
            </span>
          </div>
          <div className="bg-green-200/40 p-2 py-4 rounded-md space-y-1 flex flex-col justify-center items-center">
            <p className="text-green-500 text-xl font-medium">$22,000</p>
            <span className="inline-block text-sm text-zinc-600">
              Total gastado
            </span>
          </div>
          <div className="bg-red-200/40 p-2 py-4 rounded-md space-y-1 flex flex-col justify-center items-center">
            <p className="text-red-500 text-xl font-medium">5</p>
            <span className="inline-block text-sm text-zinc-600">
              Favoritos
            </span>
          </div>
        </div>
      </div>
      <Order />
    </div>
  );
}
