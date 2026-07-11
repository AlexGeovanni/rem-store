import axios from "axios";

export const clientApi = axios.create({
  baseURL: "/api",
});

clientApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      // await fetch("/api/auth/logout", { method: "POST" });

      // window.location.href = "/auth/iniciar-sesion";
    }

    // return Promise.reject(error);
  }
);