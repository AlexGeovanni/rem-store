import { clientApi } from "./config/clientApi";


export const productService = {
    getProducts: async () => {
        const res = await clientApi.get("/proxy//products/all");
        return res.data;
    },
    getProductById: async (id: string) => {
        const res = await clientApi.get(`/proxy/products/detail/${id}`);
        return res.data;
    }
}