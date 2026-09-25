import { getRoleFromPayload, isValidJWT } from "@repo/api-client/jwt";
import { NextRequest, NextResponse } from "next/server";

// ============================================
// CONSTANTES DE CONFIGURACIÓN
// ============================================
const TOKEN_COOKIE_NAME = "token";

// Rutas públicas solo para CLIENT 
const PUBLIC_ROUTES_CLIENT = ["/", "/s", "/p","/carrito"] as const;

// Rutas que requieren autenticación (cualquier usuario autenticado)
const PROTECTED_ROUTES = ["/cuenta"] as const;

// Rutas que requieren rol NEGOCIO específicamente
const ADMIN_ROUTES = ["/dashboard"] as const;

// Rutas de autenticación (redirigir si ya está autenticado)
const AUTH_ROUTES = ["/auth/iniciar-sesion", "/auth/registro"] as const;

// ============================================
// FUNCIONES AUXILIARES
// ============================================
/**
 * Verifica si una ruta coincide con un patrón
 */
function matchesRoute(pathname: string, routes: readonly string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Verifica si la ruta debe ser ignorada (archivos estáticos, API, etc.)
 */
function shouldIgnoreRoute(pathname: string): boolean {
  // Archivos estáticos de Next.js
  if (pathname.startsWith("/_next")) return true;

  // Rutas de API (manejadas por sus propios middlewares si es necesario)
  if (pathname.startsWith("/api")) return true;

  // Archivos con extensiones (imágenes, fuentes, etc.)
  if (
    pathname.match(
      /\.(ico|png|jpg|jpeg|svg|webp|css|js|woff|woff2|ttf|eot|json)$/
    )
  ) {
    return true;
  }

  return false;
}

/**
 * Obtiene el token de las cookies
 */
function getToken(request: NextRequest): string | undefined {
  return request.cookies.get(TOKEN_COOKIE_NAME)?.value;
}

/**
 * Valida si el token tiene el formato JWT correcto
 */
function isValidJWTFormat(token: string): boolean {
  if (!token || token.trim().length === 0) return false;

  // Un JWT válido tiene 3 partes separadas por puntos
  const parts = token.split(".");
  return parts.length === 3;
}

/**
 * Crea una respuesta de redirección con la URL original guardada
 */
function createRedirectResponse(
  url: string,
  request: NextRequest,
  pathname: string
): NextResponse {
  const redirectUrl = new URL(url, request.url);
  // Guardar la URL original para redirigir después del login
  redirectUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(redirectUrl);
}

// ============================================
// MIDDLEWARE PRINCIPAL
// ============================================

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Ignorar rutas que no necesitan procesamiento
  if (shouldIgnoreRoute(pathname)) {
    return NextResponse.next();
  }

  const token = getToken(request);

  // Verificar formato básico del token
  const hasValidFormat = token ? isValidJWTFormat(token) : false;
  const verifiedPayload =
    hasValidFormat && token ? await isValidJWT(token) : null;

  if (matchesRoute(pathname, PUBLIC_ROUTES_CLIENT)) {
    if (verifiedPayload) {
      const userRole = getRoleFromPayload(verifiedPayload);
      if (userRole === "BUSINESS") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }
  // 2. Verificar rutas de autenticación
  if (matchesRoute(pathname, AUTH_ROUTES)) {
    // Si ya está autenticado con token válido, redirigir al home
    if (verifiedPayload) {
      // Extraer el rol del payload verificado
      const userRole = getRoleFromPayload(verifiedPayload);
      if (userRole === "BUSINESS") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Permitir acceso a rutas de auth si no está autenticado
    return NextResponse.next();
  }


  // 3. Verificar rutas protegidas (requieren autenticación)
  if (matchesRoute(pathname, PROTECTED_ROUTES)) {
    if (!verifiedPayload) {
      return createRedirectResponse("/auth/iniciar-sesion", request, pathname);
    }
    // Extraer el rol del payload verificado
    const userRole = getRoleFromPayload(verifiedPayload);
    if (userRole !== "CLIENT") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Token válido y verificado, permitir acceso
    return NextResponse.next();
  }

  // 4. Verificar rutas de administración (requieren rol NEGOCIO)
  // Aplica a /dashboard y todas las rutas que empiecen con /dashboard
  if (matchesRoute(pathname, ADMIN_ROUTES)) {
    if (!verifiedPayload) {
      return createRedirectResponse("/auth/iniciar-sesion", request, pathname);
    }

    // Extraer el rol del payload verificado
    const userRole = getRoleFromPayload(verifiedPayload);
    // Solo usuarios con rol BUSINESS pueden acceder
    if (userRole !== "BUSINESS") {
      // Si es CLIENT, redirigir a su cuenta
      // Si no tiene rol válido, redirigir al home
      const redirectTo = userRole === "CLIENT" ? "/cuenta" : "/";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    // Usuario con rol BUSINESS, permitir acceso
    return NextResponse.next();
  }

  // 5. Rutas públicas - permitir acceso
  return NextResponse.next();
}

// ============================================
// CONFIGURACIÓN DEL MATCHER
// ============================================
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - archivos con extensiones (imágenes, fuentes, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|.*\\.).*)",
  ],
};