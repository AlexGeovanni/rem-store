import axios, { AxiosError, AxiosInstance } from "axios";
import { API_CONFIG } from "./config";

type CreateAxiosOptions = {
  token?: string;
  onUnauthorized?: () => void | Promise<void>;
};

export function createAxiosInstance(
  options?: CreateAxiosOptions
): AxiosInstance {
  const instance = axios.create({
    ...API_CONFIG,
    headers: {
      ...API_CONFIG.headers,
      ...(options?.token
        ? { Authorization: `Bearer ${options.token}` }
        : {}),
    },
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const status = error.response?.status;

      if ((status === 401 || status === 403) && options?.onUnauthorized) {
        await options.onUnauthorized(); 
      }

      return Promise.reject(error);
    }
  );

  return instance;
}