import { jwtVerify } from "jose";

export interface JWTPayload {
  role?: string;
  name?: string;
  email?: string;
  sub?: string;
  [key: string]: unknown;
}

/**
 * Verifica la firma del JWT y devuelve su payload.
 * Un token sin secreto configurado nunca se considera válido.
 */
export async function isValidJWT(token: string): Promise<JWTPayload | null> {
  const secret = process.env.JWT_SECRET?.trim();

  if (!secret || !token) {
    return null;
  }

  // Mantiene compatibilidad con secretos Base64 y con secretos de texto plano.
  const secretKeys = [
    new Uint8Array(Buffer.from(secret, "base64")),
    new TextEncoder().encode(secret),
  ];

  for (const secretKey of secretKeys) {
    try {
      const { payload } = await jwtVerify(token, secretKey, {
        algorithms: ["HS256"],
      });

      return payload as JWTPayload;
    } catch {
      // Probar el siguiente formato de secreto.
    }
  }

  return null;
}

/**
 * Decodifica un JWT sin verificar la firma.
 * No debe utilizarse para autorizar usuarios o roles.
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");

    if (parts.length !== 3 || !parts[1]) {
      return null;
    }

    const decoded = Buffer.from(parts[1], "base64url").toString("utf-8");
    return JSON.parse(decoded) as JWTPayload;
  } catch {
    return null;
  }
}

export function getRoleFromPayload(
  payload: JWTPayload | null,
): "CLIENT" | "BUSINESS" | null {
  if (!payload?.role) {
    return null;
  }

  const role = String(payload.role).toUpperCase();

  if (role === "CLIENT" || role === "BUSINESS") {
    return role;
  }

  return null;
}

export function getNameFromPayload(
  payload: JWTPayload | null,
): string | null {
  if (!payload) return null;

  return (payload.name as string) || (payload.nombre as string) || null;
}

export function getEmailFromPayload(
  payload: JWTPayload | null,
): string | null {
  if (!payload) return null;

  return (payload.email as string) || (payload.sub as string) || null;
}
