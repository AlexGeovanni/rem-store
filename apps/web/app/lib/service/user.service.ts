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
  getBusiness: async () => {
    const res = await clientApi.get("/proxy/user/business");
    return res.data;
  },
};