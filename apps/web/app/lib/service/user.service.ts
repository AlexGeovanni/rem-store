import {clientApi} from "./config/clientApi";

export const userService = {
  getUser: async () => {
    const res = await clientApi.get("/proxy/auth/user");
    return res.data;
  },
};