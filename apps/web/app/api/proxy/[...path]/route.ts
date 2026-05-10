import { cookies } from "next/headers";
import { createAxiosInstance } from "@repo/api-client/interceptors";

async function handler(
  req: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await context.params;

    const token = (await cookies()).get("token")?.value;

    const api = createAxiosInstance({ token });

    const { search } = new URL(req.url);

    const url = `/${path.join("/")}${search}`;
    console.log("[BFF xd xd] Proxying request to:", url); 
    let data = undefined;

    // 🔥 solo parsear body si existe
    if (req.method !== "GET" && req.method !== "DELETE") {
      const contentType = req.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        data = await req.json();
      }
    }

    const res = await api.request({
      method: req.method as any,
      url,
      data,
    });

    return Response.json(res.data, { status: res.status });

  } catch (error: any) {
    console.error(
      "[BFF ERROR]",
      error?.response?.data || error.message
    );

    return Response.json(
      error.response?.data || { error: "Error interno" },
      { status: error.response?.status || 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;