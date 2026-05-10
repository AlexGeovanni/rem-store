import { removeAuthToken } from "@/app/actions/auth.actions";


export async function POST() {
    // Eliminar token
    await removeAuthToken();
    return new Response(null, { status: 204 });
}