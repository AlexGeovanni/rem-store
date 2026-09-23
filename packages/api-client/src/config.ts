const DEFAULT_API_BASE_URL = "http://localhost:8080/api/v1";

export const API_BASE_URL = (
  process.env.API_URL ?? DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

export function getApiUrl(path: string): string {
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};
