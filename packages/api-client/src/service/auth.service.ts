import { RegisterApiInput } from "@repo/core/schemas/register.api.schema";
import { LoginInput } from "@repo/core/schemas/login.schema";

export const authService = {
  login: async (data: LoginInput) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const json = await response.json();

    if (!response.ok || !json.ok) {
      throw new Error(json.error || "Error del servidor");
    }

    return json;
  },
  logout: async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  },
  register: async (data: RegisterApiInput) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const json = await response.json();
    
    if (!response.ok || !json.ok) {
      throw new Error(json.error || "Error del servidor");
    }

    return json;
  },
};
