import axios from "axios";

export const clientApi = axios.create({
  baseURL: "/api",
});

clientApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await fetch("/api/auth/logout", { method: "POST" });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:expired"));
      }
    }

    return Promise.reject(error);
  },
);
