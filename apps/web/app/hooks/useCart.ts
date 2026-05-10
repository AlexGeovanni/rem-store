import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../lib/service/cart.service";
import { type CartItem, useCartStore } from "../stores/useCartStore";
import { useAuth } from "../providers/authProvider";

export const useCart = () => {
  const queryClient = useQueryClient();

  const { isAuthenticated } = useAuth();
  console.log("useCart - isAuthenticated:", isAuthenticated);

  // Zustand guest cart
  const guestItems = useCartStore((state) => state.items);

  const addGuestItem = useCartStore((state) => state.addItem);

  const updateGuestItem = useCartStore((state) => state.updateItem);

  const removeGuestItem = useCartStore((state) => state.removeItem);

  const clearGuestCart = useCartStore((state) => state.clearCart);

  // Backend cart
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
    enabled: isAuthenticated,
    staleTime: 1000 * 60,
    retry: 1,
  });

  // Merge cart
  const mergeMutation = useMutation({
    mutationFn: cartService.mergeCart,

    onSuccess: () => {
      clearGuestCart();

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  // Add item
  const addItem = async (item: CartItem) => {
    // guest
    if (!isAuthenticated) {
      addGuestItem(item);
      return;
    }

    // authenticated
    await cartService.addToCart(item.productId, item.quantity);

    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  };

  const removeItem = async ( productId: string) => {
    if (!isAuthenticated) {
      removeGuestItem(productId);
      return;
    }
    await cartService.removeFromCart(cartQuery.data?.id, productId);
    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  };

  const updateItem = async (productId: string,quantity:number) => {
    if (!isAuthenticated) {
      updateGuestItem(productId, quantity);
      return;
    }
    await cartService.updateCartItem(cartQuery.data?.id, productId, quantity);
    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  };

  // Cart UI data
  const items:CartItem[] = isAuthenticated ? (cartQuery.data?.items ?? []) : guestItems;

  return {
    items,
    addItem,
    updateItem,
    removeItem,
    mergeCart: mergeMutation.mutateAsync,
    isLoading: cartQuery.isLoading,
  };
};
