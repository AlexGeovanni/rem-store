import { Metadata } from "next";
import SidebarProviderConfig from "./_components/sidebarProviderConfig";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { getAuthToken } from "@/app/actions/auth.actions";
import { getNameFromPayload, isValidJWT } from "@repo/api-client/jwt";
// import { getCachedUser } from "@/lib/cache/user";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Negocio",
};

/**
 * BusinessLayout - Layout para rutas del dashboard de negocio (admin)
 * Incluye:
 * - Sidebar de navegación
 * - Header del dashboard
 * - Contenido del dashboard
 *
 * Este layout se aplica a todas las rutas dentro de (admin):
 * - /dashboard/*
 *
 * NO incluye Header/Footer del sitio público (solo UI del dashboard)
 * El usuario está disponible desde el store de Zustand (configurado en RootLayout)
 */
export default async function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const token = await getAuthToken();
  const payload = token ? await isValidJWT(token) : null;
  const name = getNameFromPayload(payload);
  return (
    <main className="[--header-height:calc(--spacing(14))]">
      <TooltipProvider>
        <SidebarProviderConfig initialUser={name}>
          {children}
        </SidebarProviderConfig>
      </TooltipProvider>
    </main>
  );
}
