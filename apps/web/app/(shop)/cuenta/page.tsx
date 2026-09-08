"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import HeaderAccount from "./_components/headerAccount";
import ResumenAccount from "./_components/resumenAccount";
import MenuTabs from "./_components/menuTabs";
import Orders from "./_components/order";
import Address from "./_components/address";
import Wrapper from "@/app/components/ui/wrapper";
import { useUserStore } from "@/app/stores/useUserStore";
import { userService } from "@/app/lib/service/user.service";
import { authService } from "@repo/api-client/service/auth.service";

export type Tab = {
  id: string;
  label: string;
};
const tabs: Tab[] = [
    {
      id: "cuenta",
      label: "Cuenta",
    },
    // {
    //   id: "pedidos",
    //   label: "Pedidos",
    // },
    // {
    //   id: "direccion",
    //   label: "Direcciones",
    // },
  ];

export default function PageCuenta() {
  const { isloading, setUser } = useUserStore();
  
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]?.id ?? "");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push('/auth/iniciar-sesion');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  useEffect(() => {
    const fetchUser = async () => {
      const response = await userService.getUser()
      if (response) {
        const { user, ...rest } = response.data;
        setUser({...user,...rest});
      }
    }
    fetchUser();
  }, []);

  if (isloading) {
    return <div>Cargando...</div>;
  }


  return (
    <main className="min-h-svh ">
      <HeaderAccount />
      {/* <ContainerWrap>
        <MenuTabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </ContainerWrap> */}
      <Wrapper className="py-4 gap-4 grid grid-cols-1 ga md:grid-cols-7 lg:grid-cols-6">
        <div className="md:col-span-2 lg:col-span-1">
          <MenuTabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            handleLogout={handleLogout}
          />
        </div>
        <div className="md:col-span-5">
        <AnimatePresence initial={false} mode="popLayout" >
          <motion.div
            key={selectedTab ? tabs.find(tab => tab.id === selectedTab)?.label : "empty"}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.3,
              ease: [0.43, 0.13, 0.23, 0.96], // curva suave personalizada
            }}
          >
            {tabs[0]?.id === selectedTab && <ResumenAccount key={"resumenId"} />}
            {/* {tabs[1]?.id === selectedTab && <Orders key={"pedidosId"} />} */}
            {/* {tabs[2]?.id === selectedTab && <Address key={"direccionId"} />} */}
            {/* {"pedidos" === selectedTab && <Orders key={"pedidosId"} />}
            {"direccion" === selectedTab && <Address key={"direccionId"} />} */}
          </motion.div>
        </AnimatePresence>
        </div>
      </Wrapper>
    </main>
  );
}