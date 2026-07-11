"use client";

import { usePathname } from "next/navigation";
import Wrapper from "../ui/wrapper";
import { LinkList } from "./linkList";
import { NAV_HELP, NAV_POLICIES, NAV_STORE } from "@/app/constants/footerLinks";

export default function Footer() {
  const path = usePathname();
  const excludedPatterns = [
    /^\/auth/,
    /^\/dashboard/,
    /^\/admin(\/|$)/, // Ejemplo extra: todo lo que comience con /admin o /admin/...
  ];

  if (excludedPatterns.some((regex) => regex.test(path))) return null;
  return (
    <footer className=" border-t border-gray-300 text-neutral-500">
      <Wrapper className="">
        <div className=" grid gap-8 lg:grid-cols-[400px_1fr] py-4">
          <div className="">
            <p className="font-title uppercase text-black font-black text-3xl">Rem/store</p>
            <p className="text-neutral-500 text-sm xs-min:text-base text-wrap mt-2">
              Encuentra todo lo que necesitas en un solo lugar.
            </p>
          </div>
          <div className=" flex flex-col gap-4 justify-between md:flex-row md:gap-6 ">
            <div>
              <h3 className="font-title font-bold text-black text-lg leading-8 md:text-[20px] md:mb-1">
                Vende
              </h3>
              <LinkList links={NAV_STORE} />
            </div>
            <div>
              <h3 className="font-title font-bold text-black text-lg leading-8 md:text-[20px] md:mb-1">
                Rem/store
              </h3>
              <LinkList links={NAV_POLICIES} />
            </div>
            <div>
              <h3 className="font-title font-bold text-black text-lg leading-8 md:text-[20px] md:mb-1">
                Ayuda
              </h3>
              <LinkList links={NAV_HELP} />
            </div>
          </div>
        </div>
      </Wrapper>

      <div className=" text-center pt-4 pb-24 text-sm lg:pb-5 ">
        &copy; 2025 REM/STORE. Todos los derechos reservados.
      </div>
    </footer>
  );
}
