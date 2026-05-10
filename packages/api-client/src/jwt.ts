import { jwtVerify } from "jose";
/**
 * Decodifica un JWT sin verificar la firma (solo para leer el payload)
 * Útil para extraer información como el rol del usuario
 */
export interface JWTPayload {
  role?: string; 
  name?: string;
  email?: string;
  sub?: string; // Subject (ID del usuario)
  [key: string]: unknown;
}

/**
 * Verifica si el token es válido usando la firma JWT
 * @returns Payload del token o null si es inválido
 */
export async function isValidJWT(token: string): Promise<JWTPayload | null> {
  try {
    const secret = process.env.JWT_SECRET;

    // Si no hay secreto configurado, solo decodifica sin verificar
    // Esto es útil cuando el token viene de un backend externo que ya lo validó
    if (!secret) {
      return decodeJWT(token);
    }

    // Intentar verificar la firma del token
    try {
      const decodedBytes = Buffer.from(secret, "base64");
      const secretKey = new Uint8Array(decodedBytes);

      const { payload } = await jwtVerify(token, secretKey, {
        algorithms: ["HS256"], 
      });
      return payload as JWTPayload;
    } catch (verifyError) {
      // Si falla la verificación, puede ser porque:
      // 1. El secreto no está en BASE64 y necesitamos usarlo directamente
      // 2. El token fue firmado con un secreto diferente
      // 3. El token expiró
      // 4. El token es inválido

      // Intentar una vez más con el secreto directamente (sin BASE64)
      // Para otros errores (expiración, formato, etc.), retornar null
      //console.error("Error verificando token:", verifyError);
      return null;
    }
  } catch (error) {
    //console.error("Error al verificar el token:", error);
    return null;
  }
}

/**
 * Decodifica el payload de un JWT
 * @param token - Token JWT
 * @returns Payload decodificado o null si es inválido
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    // Un JWT tiene 3 partes separadas por puntos: header.payload.signature
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    // Decodificar el payload (segunda parte)
    const payload = parts[1] ?? "";
    if(!payload) return null
    // Base64 URL decode
    const decoded = Buffer.from(payload, "base64url").toString("utf-8");

    return JSON.parse(decoded) as JWTPayload;
  } catch (error) {
    //console.error("Error decodificando JWT:", error);
    return null;
  }
}

/**
 * Extrae el rol del usuario desde el payload del JWT
 * @param payload - Payload del JWT
 * @returns Rol del usuario ('CLIENT' | 'BUSINESS') o null
 */
export function getRoleFromPayload(
  payload: JWTPayload | null
): "CLIENT" | "BUSINESS" | null {
  if (!payload || !payload.role) {
    return null;
  }

  const role = String(payload.role).toUpperCase();

  if (role === "CLIENT" || role === "BUSINESS") {
    return role as "CLIENT" | "BUSINESS";
  }

  return null;
}

/**
 * Extrae el rol del usuario desde el token JWT (decodifica sin verificar)
 * @param token - Token JWT
 * @returns Rol del usuario ('CLIENT' | 'BUSINESS') o null
 * @deprecated Usa isValidJWT + getRoleFromPayload para mayor seguridad
 */
export function getUserRoleFromToken(
  token: string
): "CLIENT" | "BUSINESS" | null {
  const payload = decodeJWT(token);
  return getRoleFromPayload(payload);
}

/**
 * Extrae el nombre del usuario desde el payload del JWT
 * @param payload - Payload del JWT
 * @returns Nombre del usuario o null
 */
export function getNameFromPayload(
  payload: JWTPayload | null
): string | null {
  if (!payload) return null;
  
  // Intentar diferentes campos comunes
  return (payload.name as string) || 
         (payload.nombre as string) || 
         null;
}

/**
 * Extrae el email del usuario desde el payload del JWT
 * @param payload - Payload del JWT
 * @returns Email del usuario o null
 */
export function getEmailFromPayload(
  payload: JWTPayload | null
): string | null {
  if (!payload || !payload.sub) return null;
  return payload.sub as string;
}
