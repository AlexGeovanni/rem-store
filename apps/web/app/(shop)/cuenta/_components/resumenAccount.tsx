import { useUserStore } from "@/app/stores/useUserStore";
import ButtonBase from "@workspace/ui/components/buttonBase";
import { cn } from "@workspace/ui/lib/utils";
import { DialogAccout } from "./dialogAccout/dialogAccout";

export default function ResumenAccount() {
  const { user } = useUserStore();
  console.log("user en resumen account", user);
  return (
    <div className="grid gap-4 px-2 grid-cols-4 lg:grid-cols-5">
      <div className="col-span-4  lg:col-span-3">
        <div className="px-3">
          <div className="flex items-center justify-between mb-4">
            <p className="mb-1 font-semibold text-lg">Informacion personal</p>
            {/* <Button
              variant={"link"}
              // type="submit"
              // className="rounded-full text-sm h-9 xsm:h-[40px] border-0 hover:bg-transparent md:border md:hover:border-transparent md:hover:bg-[#000000] md:hover:text-white"
              className="cursor-pointer"
            >
              <SquarePen className="size-5 md:size-4" />
              <span className="hidden md:block">Editar</span>
            </Button> */}
            <DialogAccout user={user} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ItemInfo label="Nombre completo" value={user?.name} />
            <ItemInfo label="Correo electronico" value={user?.email} />
            <ItemInfo label="Telefono" value={user?.phoneNumber} />
            <ItemInfo
              classname="col-span-1 md:col-span-2"
              label="Direccion"
              value={user?.address}
            />
          </div>
        </div>
      </div>
      <div className="col-span-4 lg:col-span-2 space-y-3">
        <div className="border rounded-lg p-3 shadow">
          <p className="mb-2 font-semibold">Estadísticas de Compras</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-200/40 p-2 py-4 rounded-md space-y-1 flex flex-col justify-center items-center">
              <p className="text-blue-500 text-xl font-bold">0</p>
              <span className="inline-block text-xs text-gray-600">
                Total pedidos
              </span>
            </div>
            <div className="bg-green-200/40 p-2 py-4 rounded-md space-y-1 flex flex-col justify-center items-center">
              <p className="text-green-500 text-xl font-bold">$0</p>
              <span className="inline-block text-xs text-gray-600">
                Total gastado
              </span>
            </div>
            <div className="bg-red-200/40 p-2 py-4 rounded-md space-y-1 flex flex-col justify-center items-center">
              <p className="text-red-500 text-xl font-bold">0</p>
              <span className="inline-block text-xs text-gray-600">
                Favoritos
              </span>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-3 shadow">
          <p className="mb-1 font-semibold">Configuración de cuenta</p>
          <div className="text-gray-500 text-xs mb-2">
            Acciones irreversibles para tu cuenta
          </div>
          <ButtonBase className="w-full h-[40px]">Eliminar cuenta</ButtonBase>
        </div>
      </div>
    </div>
  );
}

type PropsItem = {
  label: string;
  value: string;
  classname?: string;
};

const ItemInfo = ({ label, value, classname }: PropsItem) => {
  return (
    <div className={cn("w-full", classname)}>
      <label htmlFor="" className="uppercase font-medium text-xs text-gray-500">
        {label}
      </label>
      <p className="text-black text-sm">{value}</p>
    </div>
  );
};
