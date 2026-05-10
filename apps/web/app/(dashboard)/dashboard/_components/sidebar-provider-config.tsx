"use client";
import {SidebarProvider, SidebarInset} from "@workspace/ui/components/sidebar"
import { SideBar } from "./sidebar";
import { SiteHeader } from "./site-header";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/app/stores/useUserStore";

export default function SidebarProviderConfig({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: any;
}) {
  const { setUser } = useUserStore();
  
  const {data, isLoading, error, isSuccess}=useQuery({
    queryKey: ["business"],
    queryFn: () => {
      // userService.getBusiness()
      return null
    },
    enabled:!!initialUser
  });
  useEffect(()=>{
    if(isSuccess && data){
      // setUser(data?.data);
    }
  },[isSuccess, data, setUser]);
  
  return (
    <SidebarProvider className="flex flex-col">
      <div className="flex flex-1">
        <SideBar />
        <SidebarInset>
          <SiteHeader initialUser={initialUser} />
          {/* //p-4 pr-8 */}
          <div className="flex flex-1 flex-col gap-4   min-h-[calc(100vh-var(--header-height)-2rem)]">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
