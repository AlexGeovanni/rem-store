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
import { DATA_SIDEBAR, TABS_LAYOUT, TABS_MENU, type TabValueMenu, useTabStore } from "@/app/stores/dashboard/tab-dashboard";
import { LayoutDashboard } from "lucide-react";
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
          <SidebarMenuItem className="p-0">
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent focus:bg-transparent active:bg-transparent data-[size=lg]:h-10 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {/* <activeTeam.logo className="size-4" /> */}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-base font-medium">
                  Marketplace
                </span>
                <span className="truncate text-[10px]">Negocio</span>
              </div>
              {/* <ChevronsUpDown className="ml-auto" /> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* <Separator /> */}
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Dashboard"
                isActive={tabAside === TABS_LAYOUT.DASHBOARD}
                className="h-10 text-gray-500 cursor-pointer rounded-full data-[active=true]:bg-amber-600 data-[active=true]:font-medium data-[active=true]:text-white"

                onClick={() => {
                  // Sincronizar el store cuando se hace clic en el item principal
                  setTabAside(TABS_LAYOUT.DASHBOARD, TABS_MENU.DASHBOARD);
                }}
              >
                <Link
                  href={"/dashboard"}
                  className="font-medium"
                >
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
                  className="hover:text-amber-600 hover:bg-transparent focus:bg-transparent active:bg-transparent data-[active=true]:bg-transparent"
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
                    className={cn(
                      "font-medium",
                      tabAside === item.id && "text-amber-600"
                    )}
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
                          className="h-10 text-gray-500 cursor-pointer rounded-full data-[active=true]:bg-amber-600 data-[active=true]:font-medium data-[active=true]:text-white"
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
      <SidebarFooter className="bg-white">
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