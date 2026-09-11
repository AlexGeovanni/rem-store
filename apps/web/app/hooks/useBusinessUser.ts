
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/app/lib/service/user.service";

function normalizeBusiness(response: any) {
  const payload = response?.data ?? response;

  if (payload?.user) {
    return { ...payload.user, ...payload };
  }

  return payload;
}

export function useBusinessUser() {
  return useQuery({
    queryKey: ["business-user"],
    queryFn: async () => {
      const response = await userService.getBusiness();
      return normalizeBusiness(response);
    },
    staleTime: 5 * 60 * 1000,
  });
}