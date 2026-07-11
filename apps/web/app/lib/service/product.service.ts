import { clientApi } from "./config/clientApi";


export const productService = {
    getProducts: async () => {
        const res = await clientApi.get("/proxy/products/all");
        return res.data;
    },
    
    getProductById: async (id: string) => {
        const res = await clientApi.get(`/proxy/products/detail/${id}`);
        return res.data;
    },

    getProductByBusiness: async (id: string) => {
        const res = await clientApi.get(`/proxy/products/business/${id}`);
        return res.data;
    },

    postProduct: async (data:unknown) => {
        const res = await clientApi.post(`/proxy/products`,data);
        return res.data;
    },
    updateProduct: async (id: string, data: unknown) => {
        const res = await clientApi.patch(`/proxy/products/${id}`, data);
        return res.data;
    },

    deleteProduct: async (id: string) => {
        const res = await clientApi.delete(`/proxy/products/${id}`);
        return res.data;
    }

}