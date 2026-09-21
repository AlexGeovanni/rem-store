import type { ParamsInter } from "@/app/(shop)/s/[[...categoria]]/page";
import { clientApi } from "./config/clientApi";


export const productService = {
    getProducts: async (params: ParamsInter = {}) => {
        const paramsQuery = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null || value === "") return;

            // `pagina` es el nombre usado en la URL de la tienda; la API espera `page`.
            paramsQuery.set(key === "pagina" ? "page" : key, String(value));
        });

        const query = paramsQuery.toString();
        const res = await clientApi.get(
            `/proxy/products/all${query ? `?${query}` : ""}`,
        );
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
        const res = await clientApi.post(`/proxy/products/business`,data);
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
