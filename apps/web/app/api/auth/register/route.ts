export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, ...payload } = body;

    const url =
      type === "cliente"
        ? "/auth/register/client"
        : "/auth/register/business";

    const res = await fetch(process.env.API_URL ?? "http://localhost:8080/api/v1" + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return Response.json(data, {
      status: res.status, 
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}