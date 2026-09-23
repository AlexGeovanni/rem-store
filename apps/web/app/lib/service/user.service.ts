import { UserBusinessEditInput, UserClientEditInput } from "@repo/core/schemas/userEdit.schema";
import type { UserApiResponse } from "@repo/core/types/user";
import {clientApi} from "./config/clientApi";

export const userService = {
  getUser: async (): Promise<UserApiResponse> => {
    const res = await clientApi.get("/proxy/user/client");
    return res.data as UserApiResponse;
  },
  updateUser: async (data:UserClientEditInput ) => {
    const res = await clientApi.patch("/proxy/user/client/edit", data);
    return res.data;
  },
  getBusiness: async (signal?:AbortSignal): Promise<UserApiResponse> => {
    const res = await clientApi.get("/proxy/user/business",{
      signal,
    });
    return res.data as UserApiResponse;
  },
  updateBusiness: async (data: UserBusinessEditInput) => {
    const res = await clientApi.patch("/proxy/user/business/edit", data);
    return res.data;
  },
};
