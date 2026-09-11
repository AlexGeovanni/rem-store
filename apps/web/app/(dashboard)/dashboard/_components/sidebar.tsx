"use client";
// import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@workspace/ui/components/sidebar";
import Link from "next/link";
import {
  DATA_SIDEBAR,
  TABS_LAYOUT,
  TABS_MENU,
  type TabValueMenu,
  useTabStore,
} from "@/app/stores/dashboard/tab-dashboard";
import { ChevronsUpDownIcon, LayoutDashboard } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface SideBarProps {
  props?: React.ComponentProps<typeof Sidebar>;
}

export function SideBar({ ...props }: SideBarProps) {
  const { open } = useSidebar();
  const { tabAside, tabMenu, setTabAside } = useTabStore();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="">
        <SidebarMenu className="py-2">
          <TeamSwitcher />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Dashboard"
                isActive={tabAside === TABS_LAYOUT.DASHBOARD}
                className="h-10 text-gray-500 cursor-pointer border-2 border-transparent rounded-full data-[active=true]:bg-amber-500/20 data-[active=true]:font-medium data-[active=true]:text-black data-[active=true]:border-amber-400 "
                onClick={() => {
                  // Sincronizar el store cuando se hace clic en el item principal
                  setTabAside(TABS_LAYOUT.DASHBOARD, TABS_MENU.DASHBOARD);
                }}
              >
                <Link href={"/dashboard"} className="font-medium">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarMenu>
            {DATA_SIDEBAR.map((item) => (
              <SidebarMenuItem key={item.title} className="">
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className=" hover:bg-transparent focus:bg-transparent active:bg-transparent data-[active=true]:bg-transparent"
                  onClick={() => {
                    // Sincronizar el store cuando se hace clic en el item principal
                    const firstChild = item.childrenTab?.[0];
                    if (firstChild) {
                      setTabAside(item.id, firstChild.id as TabValueMenu);
                    }
                  }}
                >
                  <Link
                    href={item.url}
                    className={cn("font-medium cursor-default")}
                  >
                    {item.icon && <item.icon />}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.childrenTab?.length ? (
                  <SidebarMenuSub>
                    {item.childrenTab.map((subitem) => (
                      <SidebarMenuSubItem key={subitem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            tabMenu === subitem.id && tabAside === item.id
                          }
                          onClick={() => {
                            // Sincronizar el store cuando se hace clic en un subitem
                            setTabAside(item?.id, subitem.id as TabValueMenu);
                          }}
                          className="h-10 text-gray-500 cursor-pointer border-2 border-transparent rounded-full data-[active=true]:bg-amber-500/20 data-[active=true]:font-medium data-[active=true]:text-black data-[active=true]:border-amber-400 "
                        >
                          <Link href={subitem.url}>{subitem.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <Separator /> */}
      <SidebarFooter>
        <div className="flex items-center gap-2 p-2 pe-8 ">
          <span className="text-sm"> &copy;</span>{" "}
          <div className={cn("text-xs", !open && "hidden")}>
            Marketplace,Inc.
          </div>
        </div>
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Separator } from "@workspace/ui/components/separator";
import { useBusinessUser } from "@/app/hooks/useBusinessUser";
import { authService } from "@repo/api-client/service/auth.service";
import { useAuth } from "@/app/providers/authProvider";
import { useRouter } from "next/navigation";

export function TeamSwitcher() {
  const { clearUser } = useAuth();
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data: user } = useBusinessUser();
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
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="rounded-full">
            <SidebarMenuButton size="lg" className="bg-transparent">
              <div className="bg-sidebar-primary rounded-lg text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center">
                {/* activeTeam.logo */}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-base font-medium min-h-6">
                  {user?.businessName}
                </span>
                <span className="truncate text-[10px]">Negocio</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 w-fit"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Marketplace
            </DropdownMenuLabel>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm text-black">
                <div className="bg-sidebar-primary rounded-lg text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center">
                  {/* activeTeam.logo */}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.businessName}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/dashboard/account"} className="block w-full p-2!">
                {" "}
                Cuenta
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="gap-2 p-2">
              <div className="font-medium text-destructive">Cerrar sesiòn</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
