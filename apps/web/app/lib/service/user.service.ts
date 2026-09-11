import {clientApi} from "./config/clientApi";

export const userService = {
  getUser: async () => {
    const res = await clientApi.get("/proxy/user/client");
    return res.data;
  },
  updateUser: async (data: any) => {
    const res = await clientApi.patch("/proxy/user/client/edit", data);
    return res.data;
  },
  getBusiness: async (signal?:AbortSignal) => {
    const res = await clientApi.get("/proxy/user/business",{
      signal,
    });
    return res.data;
  },
  updateBusiness: async (data: any) => {
    const res = await clientApi.patch("/proxy/user/business/edit", data);
    return res.data;
  },
};