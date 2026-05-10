import { createAxiosInstance } from "@repo/api-client/interceptors";
import { getAuthToken } from "../../../actions/auth.actions";

export async function withAuthApi<T>(
  fn: (api: ReturnType<typeof createAxiosInstance>) => Promise<T>
): Promise<T | null> {
  const token = await getAuthToken();

  if (!token) return null;

  const api = createAxiosInstance({ token });

  return fn(api);
}