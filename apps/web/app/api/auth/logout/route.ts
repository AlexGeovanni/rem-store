import { removeAuthToken } from "@/app/actions/auth.actions";
import { NextResponse } from "next/server";


export async function POST() {
    // Eliminar token
    await removeAuthToken();
    return NextResponse.json(null, { status: 204 });
}