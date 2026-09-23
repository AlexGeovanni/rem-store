import { NextResponse } from "next/server";
import { loginSchema } from "@repo/core/schemas/login.schema";
import { getApiUrl } from "@repo/api-client/config";
import { setAuthToken, removeAuthToken } from "@/app/actions/auth.actions";

export async function POST(request: Request) {
  try {

    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

  
    const response = await fetch(getApiUrl("/auth/login"),{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json();
    
    if (!response.ok ) {
      return NextResponse.json(
        { ok: false, error: data.error || "Error del servidor" },
        { status: response.status }
      );
    }

    // Manejar token
    await removeAuthToken();
    await setAuthToken(data.data.token);

    return NextResponse.json({ ok: true });

  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { ok: false, error: "Datos inválidos" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
