import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { useQuery } from "@tanstack/react-query";

export function SiteHeader({ name }: { name: string | null }) {
  // Usar el store de Zustand en lugar de recibir props
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
        <div className="flex w-full justify-between items-center py-2 pe-8 gap-2 ">
          <div className="text-lg font-medium">Bienvenido </div>
          <div className="flex items-center space-x-4">
            <span className="text-base font-medium">{name || "Usuario"}</span>
           <div className="size-12 rounded-full" dangerouslySetInnerHTML={{ __html: avatar || "" }}></div>
          </div>
        </div>
        </div>
    </header>
  );
}
