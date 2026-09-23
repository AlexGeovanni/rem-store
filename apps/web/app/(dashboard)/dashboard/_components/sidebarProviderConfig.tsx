"use client";
import {SidebarProvider, SidebarInset} from "@workspace/ui/components/sidebar"
import { SideBar } from "./sidebar";
import { SiteHeader } from "./siteHeader";

export default function SidebarProviderConfig({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: string | null;
}) {
  return (
    <SidebarProvider className="flex flex-col">
      <div className="flex flex-1">
        <SideBar />
        <SidebarInset>
          <SiteHeader name={initialUser} />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-[calc(100vh-var(--header-height)-2rem)]">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
