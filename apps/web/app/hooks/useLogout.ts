"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@repo/api-client/service/auth.service";
import { useAuth } from "@/app/providers/authProvider";
import { userQueryKeys } from "@/app/lib/queryKeys";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearUser } = useAuth();

  return async function logout() {
    await authService.logout();
    clearUser();
    queryClient.removeQueries({ queryKey: userQueryKeys.all });
    queryClient.removeQueries({ queryKey: ["cart"] });
    router.replace("/auth/iniciar-sesion");
    router.refresh();
  };
}
