"use client";
import {SidebarProvider, SidebarInset} from "@workspace/ui/components/sidebar"
import { SideBar } from "./sidebar";
import { SiteHeader } from "./site-header";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/app/stores/useUserStore";
import { userService } from "@/app/lib/service/user.service";
import axios from "axios";

export default function SidebarProviderConfig({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: any;
}) {
  const { setUser } = useUserStore();
  
  const {data, isSuccess}=useQuery({
    queryKey: ["business"],
    queryFn: () => userService.getBusiness(),
    enabled:!!initialUser,
    // retry:false
  });
  useEffect(()=>{
    if(isSuccess && data){
      const { user, ...rest } = data.data;
      setUser({ ...user, ...rest });
    }
  },[isSuccess, data, setUser]);

//   useEffect(() => {
//   const controller = new AbortController();

//   const fetchUser = async () => {
//     try {
//       const response = await userService.getBusiness(controller.signal);

//       if (response) {
//         const { user, ...rest } = response.data;
//         setUser({ ...user, ...rest });
//       }
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         return;
//       }

//       console.error("Error fetching user:", error);
//     }
//   };

//   fetchUser();

//   return () => {
//     controller.abort();
//   };
// }, []);


  
  return (
    <SidebarProvider className="flex flex-col">
      <div className="flex flex-1">
        <SideBar />
        <SidebarInset>
          <SiteHeader name={initialUser} />
          {/* //p-4 pr-8 */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-[calc(100vh-var(--header-height)-2rem)]">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
