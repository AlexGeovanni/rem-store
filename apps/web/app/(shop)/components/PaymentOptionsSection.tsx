import Wrapper from "@/app/components/ui/wrapper";
import { cn } from "@workspace/ui/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function PaymentOptionsSection() {
  return (
    <Wrapper className="space-y-2 md:space-y-4 pb-16 sm:pb-20 lg:pb-24">
      <div>
        <h2 className="text-4xl font-medium pb-1 tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
          ¿Cuáles son las opciones de pago?
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="md:col-span-2 lg:col-span-3 md:border-r md:pr-2 ">
          <div className="">
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Queremos que la experiencia de compra sea rápida y sencilla, por
                lo que aceptamos las siguientes opciones de pago:
              </p>
            <div className="grid grid-cols-2 xsm:grid-cols-3 lg:grid-cols-5 gap-2 mt-2 md:mt-4">
              <CardPay classname="col-span-1" />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <h3 className="font-medium  pb-1 text-lg leading-8 md:pb-2 md:text-2xl md:text-center">
            Contactanos
          </h3>
          <div className="flex mt-3 gap-3 flex-col xsm:gap-1 xsm:flex-row md:block md:space-y-6 lg:mt-6 ">
            <div className="xsm:w-1/3 flex flex-col xsm:items-center gap-2 md:w-full">
              <Phone />
              <div className="xsm:text-center">
                <p className="text-sm font-medium md:text-base">
                  Productos y pedidos
                </p>
                <div>
                  <span className="text-sm block text-balance md:text-base">
                    800-800-8000{" "}
                  </span>
                  <span className="text-sm block text-balance md:text-base">
                    Lunes a Viernes
                  </span>
                  <span className="text-sm block text-balance md:text-base">
                    {" "}
                    9:00 AM - 5:00 PM
                  </span>
                </div>
              </div>
            </div>
            <div className="xsm:w-1/3 flex flex-col xsm:items-center gap-2 md:w-full">
              <Mail />
              <div className="xsm:text-center">
                <p className="text-sm font-medium md:text-base">
                  Productos y pedidos
                </p>
                <div className="text-sm text-balance md:text-base">
                  Envianos un correo electronico y responderemos en un dia hábil
                </div>
              </div>
            </div>
            <div className="xsm:w-1/3 flex flex-col xsm:items-center gap-2 md:w-full">
              <MapPin />
              <p className="text-sm font-medium md:text-base">
                Buscar vendedores
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const CardPay = ({ classname }: { classname: string }) => {
  return (
    <div className={cn("p-2", classname)}>
      <div className="">
        <Image
          src="/payment/paypal.svg"
          alt="paypall"
          width={120}
          height={120}
          className="aspect-auto w-full object-fill"
        />
      </div>
    </div>
  );
};
