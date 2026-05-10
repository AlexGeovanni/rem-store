import { NextResponse } from "next/server";
import { loginSchema } from "@repo/core/schemas/auth/login.schema";
import { setAuthToken, removeAuthToken } from "@/app/actions/auth.actions";

export async function POST(request: Request) {
  try {

    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

  
    const response = await fetch(process.env.API_URL ?? "http://localhost:8080/api/v1"+"/auth/login",{
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

  } catch (error: any) {
    // Manejo de errores
    if (error.name === "ZodError") {
      return NextResponse.json(
        { ok: false, error: "Datos inválidos" },
        { status: 400 }
      );
    }
    if (error.response?.status === 401) {
      return NextResponse.json(
        { ok: false, error: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}