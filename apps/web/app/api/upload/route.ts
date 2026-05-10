import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("Recibiendo solicitud de subida de imagen");
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Archivo requerido" },
        { status: 400 }
      );
    }

    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", file);
    cloudinaryForm.append("upload_preset", "imagesload");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dyxqrjcpm/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );
    const data = await response.json();

    return NextResponse.json({
      url: data.secure_url,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Error subiendo imagen" },
      { status: 500 }
    );
  }
}