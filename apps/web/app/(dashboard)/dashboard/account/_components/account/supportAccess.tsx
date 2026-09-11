import ButtonBase from "@workspace/ui/components/buttonBase";
import { Fragment } from "react";

export default function SupportAccess() {
  return (
    <Fragment>
      <div className="space-y-3">
        <div className="text-lg font-medium mb-4">
          <h2>Acceso de soporte</h2>
        </div>
        <div className="flex justify-between items-center">
          <div className="">
            <p className="">Cerrar sesión en todos los dispositivos</p>
            <span className="text-zinc-600 text-sm -mt-1 block">
              Se cerrarán todas las sesiones activas de tu cuenta.
            </span>
          </div>
          <div>
            <ButtonBase className="h-10">Salir</ButtonBase>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="">
            <p className="text-destructive">Eliminar mi cuenta</p>
            <span className="text-zinc-600 text-sm -mt-1 block">
              Esta acción es permanente. Tu cuenta y sus datos se eliminarán de
              forma definitiva.
            </span>
          </div>
          <div>
            <ButtonBase className="h-10">Elimiar cuenta</ButtonBase>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
