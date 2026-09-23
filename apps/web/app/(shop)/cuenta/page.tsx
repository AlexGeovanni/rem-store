"use client";
import { useEffect, useState, Fragment } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import ResumenAccount from "./_components/resumenAccount";
import MenuTabs from "./_components/menuTabs";
import Wrapper from "@/app/components/ui/wrapper";
import { useUserStore } from "@/app/stores/useUserStore";
import { userService } from "@/app/lib/service/user.service";
import { authService } from "@repo/api-client/service/auth.service";
import { useAuth } from "@/app/providers/authProvider";
import MyPurchases from "./_components/myPurchases/myPurchases";
import SkeletonAccount from "./_components/skeletonAccount";

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
  const { isloading, setUser } = useUserStore();
  const { clearUser } = useAuth();

  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]?.id ?? "");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      clearUser();
      router.replace("/auth/iniciar-sesion");
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await userService.getUser();
      if (response) {
        const { user, ...rest } = response.data;
        setUser({ ...user, ...rest });
      }
    };
    fetchUser();
  }, []);

  return (
    <main className="min-h-svh ">
      <Wrapper className="max-w-275 w-full grid grid-cols-1 gap-4 md:grid-cols-4 tablet:grid-cols-5">
        {isloading ? (
          <SkeletonAccount />
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
                    <ResumenAccount key={"resumenId"} />
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
