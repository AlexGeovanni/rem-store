import { clientApi } from "./config/clientApi";

export const cartService = {
  getCart: async () => {
    const res = await clientApi.get("/proxy/shopping-cart");
    return res.data;
  },
  mergeCart: async (items: { productId: string; quantity: number }[]) => {
    const res = await clientApi.post("/proxy/shopping-cart/merge", items);
    return res.data;
  },
  addToCart: async (productId: string, quantity: number) => {
    const res = await clientApi.post("/proxy/shopping-cart/items", null, {
      params: {
        productId,
        quantity,
      },
    });
    return res.data;
  },
  removeFromCart: async (cartId: string, productId: string) => {
    const res = await clientApi.delete(
      `/proxy/shopping-cart/${cartId}/item/${productId}/remove`);
    return res.data;
  },
  updateCartItem: async (
    cartId: string,
    productId: string,
    quantity: number,
  ) => {
    const res = await clientApi.put(
      `/proxy/shopping-cart/items/${productId}`,
      null,
      {
        params: {
          quantity,
        },
      },
    );
    return res.data;
  },
  deleteCart: async (cardId: string) => {
    const res = await clientApi.delete(`/proxy/shopping-cart/${cardId}/clear`);
    return res.data;
  },
};
