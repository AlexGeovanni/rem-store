import { cookies } from "next/headers";

const TOKEN_COOKIE_NAME = "token";

export async function getAuthToken() {
  return (await cookies()).get(TOKEN_COOKIE_NAME)?.value ?? null;
}