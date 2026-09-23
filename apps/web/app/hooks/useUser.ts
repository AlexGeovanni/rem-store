import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/authProvider";
import { userService } from "@/app/lib/service/user.service";
import { userQueryKeys } from "@/app/lib/queryKeys";
import type {
  BusinessUser,
  ClientUser,
  UserApiResponse,
  UserRecord,
} from "@repo/core/types/user";

function getPayload(response: UserApiResponse): UserRecord {
  if ("data" in response) {
    return response.data;
  }

  return response;
}

function normalizeUser(response: UserApiResponse) {
  const payload = getPayload(response);
  const nestedUser = payload.user;

  return nestedUser ? { ...nestedUser, ...payload } : payload;
}

export function useClientUser() {
  const { isAuthenticated } = useAuth();

  return useQuery<ClientUser>({
    queryKey: userQueryKeys.client(),
    queryFn: async () => {
      const response = await userService.getUser();
      return normalizeUser(response) as ClientUser;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBusinessUser() {
  const { isAuthenticated } = useAuth();

  return useQuery<BusinessUser>({
    queryKey: userQueryKeys.business(),
    queryFn: async () => {
      const response = await userService.getBusiness();
      return normalizeUser(response) as BusinessUser;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}
