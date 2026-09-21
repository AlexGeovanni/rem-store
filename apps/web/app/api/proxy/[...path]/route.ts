import { cookies } from "next/headers";
import { createAxiosInstance } from "@repo/api-client/interceptors";

type PublicEndpoint = {
  method: string;
  matches: (path: string) => boolean;
};

// Agrega aquí las rutas públicas del backend. Las demás rutas son protegidas
// por defecto y conservan el token de la cookie.
const PUBLIC_ENDPOINTS: PublicEndpoint[] = [
  {
    method: "GET",
    matches: (path) => path === "/products/all",
  },
  {
    method: "GET",
    matches: (path) => path.startsWith("/products/detail/"),
  },
];

function shouldAttachToken(method: string, path: string[]) {
  const normalizedPath = `/${path.join("/")}`;
  const isPublic = PUBLIC_ENDPOINTS.some(
    (endpoint) =>
      endpoint.method === method && endpoint.matches(normalizedPath)
  );

  return !isPublic;
}

async function handler(
  req: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await context.params;
    const method = req.method.toUpperCase();
    const attachToken = shouldAttachToken(method, path);

    const token = (await cookies()).get("token")?.value;
    const api = createAxiosInstance({
      token: attachToken ? token : undefined,
    });

    const { search } = new URL(req.url);
    
    const url = `/${path.join("/")}${search}`;
    let data = undefined;

    // solo parsear body si existe
    if (method !== "GET" && method !== "DELETE") {
      const contentType = req.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        data = await req.json();
      }
    }

    const res = await api.request({
      method,
      url,
      data,
    });

    return Response.json(res.data, { status: res.status });

  } catch (error: unknown) {
    const proxyError = error as {
      response?: { data?: unknown; status?: number };
      message?: string;
    };

    console.error(
      "[BFF ERROR]",
      proxyError.response?.data || proxyError.message
    );

    return Response.json(
      proxyError.response?.data || { error: "Error interno" },
      { status: proxyError.response?.status || 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
