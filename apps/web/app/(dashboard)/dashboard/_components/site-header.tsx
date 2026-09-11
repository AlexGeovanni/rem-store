// import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { userService } from "@/service/accountDetailsservice";

export function SiteHeader({ name }: { name: string }) {
  // Usar el store de Zustand en lugar de recibir props
  // El usuario ya está disponible desde el AuthProvider en el root layout
  // const [avatar, setAvatar] = useState<string>("");
  const { data: avatar, isLoading } = useQuery({
    queryKey: ["avatar"],
    queryFn: async () => await fetch(`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${name || "usuario"}&radius=50`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.text()),
    enabled: !!name
  });

  return (
    <header className="bg-white sticky py-2 top-0 z-50 flex w-full items-center">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 rounded-full" />
        {/* <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4"/> */}
        <div className="flex w-full justify-between items-center py-2 pe-8 gap-2 ">
          {/* <div>Marketplace</div> */}
          <div className="text-lg font-medium">Bienvenido </div>
          <div className="flex items-center space-x-4">
            <span className="text-base font-medium">{name || "Usuario"}</span>
            {/* <div className="size-8 bg-slate-400 rounded-full"></div> */}
            <div className="size-12 rounded-full" dangerouslySetInnerHTML={{ __html: avatar || "" }}></div>
          </div>
        </div>
        {/* <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
      </div>
    </header>
  );
}
