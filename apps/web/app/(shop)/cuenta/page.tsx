"use client";
import { useState, Fragment } from "react";
import { AnimatePresence, motion } from "motion/react";
import ResumenAccount from "./_components/resumenAccount";
import MenuTabs from "./_components/menuTabs";
import Wrapper from "@/app/components/ui/wrapper";
import { useLogout } from "@/app/hooks/useLogout";
import MyPurchases from "./_components/myPurchases/myPurchases";
import SkeletonAccount from "./_components/skeletonAccount";
import { useClientUser } from "@/app/hooks/useUser";

export type Tab = {
  id: string;
  label: string;
};
const tabs: Tab[] = [
  {
    id: "perfil",
    label: "Perfil",
  },
  {
    id: "compras",
    label: "Mis compras",
  },
];

export default function PageCuenta() {
  const logout = useLogout();
  const { data: user, isLoading, isError } = useClientUser();

  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]?.id ?? "");
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <main className="min-h-svh ">
      <Wrapper className="max-w-275 w-full grid grid-cols-1 gap-4 md:grid-cols-4 tablet:grid-cols-5">
        {isLoading ? (
          <SkeletonAccount />
        ) : isError || !user ? (
          <p className="col-span-full text-center text-sm text-muted-foreground">
            No pudimos cargar la información de tu cuenta.
          </p>
        ) : (
          <Fragment>
            <div className="md:col-span-1 ">
              <MenuTabs
                tabs={tabs}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                handleLogout={handleLogout}
              />
            </div>
            <div className="md:col-span-3 tablet:col-span-4">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={
                    selectedTab
                      ? tabs.find((tab) => tab.id === selectedTab)?.label
                      : "empty"
                  }
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  }}
                >
                  {tabs[0]?.id === selectedTab && (
                    <ResumenAccount key={"resumenId"} user={user} />
                  )}
                  {tabs[1]?.id === selectedTab && (
                    <MyPurchases key={"pedidosId"} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Fragment>
        )}
      </Wrapper>
    </main>
  );
}
