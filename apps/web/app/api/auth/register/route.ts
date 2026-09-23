import { NextResponse } from "next/server";
import { getApiUrl } from "@repo/api-client/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, ...payload } = body;

    const url =
      type === "cliente" ? "/auth/register/client" : "/auth/register/business";

    const response = await fetch(getApiUrl(url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: data.error || "Error del servidor" },
        { status: response.status },
      );
    }

    return NextResponse.json(
      {
        ok: response.ok,
        status: response.status,
        ...data,
      },
      { status: response.status },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
