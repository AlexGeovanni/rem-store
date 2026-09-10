import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../lib/service/cart.service";
import { type CartItem, useCartStore } from "../stores/useCartStore";
import { useAuth } from "../providers/authProvider";
import { toast } from "@workspace/ui/lib/toast";

export const useCart = () => {
  const queryClient = useQueryClient();

  const { isAuthenticated } = useAuth();
  
  // Zustand guest cart
  const guestItems = useCartStore((state) => state.items);

  const addGuestItem = useCartStore((state) => state.addItem);

  const updateGuestItem = useCartStore((state) => state.updateItem);

  const removeGuestItem = useCartStore((state) => state.removeItem);

  const clearGuestCart = useCartStore((state) => state.clearCart);

  // Backend cart
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn:  cartService.getCart,
    enabled: isAuthenticated,
    staleTime: 1000 * 60,
    retry: 1,
  });

  // Merge cart
  const mergeMutation = useMutation({
    mutationFn: cartService.mergeCart,

    onSuccess: () => {
      clearGuestCart();
      toast.success("Carrito cargado correctamente",{position:"top-right"})
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
      toast.success("Se agrego a tu carrito",{position:"top-right"})
      return;
    }

    // authenticated
    await cartService.addToCart(item.productId, item.quantity);
    toast.success("Se agrego a tu carrito",{position:"top-right"})
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
    await cartService.updateCartItem(cartQuery.data?.data?.id, productId, quantity);
    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  };

  // Cart UI data
  const items:CartItem[] = isAuthenticated ? (cartQuery.data?.data?.items ?? []) : guestItems;

  return {
    items,
    addItem,
    updateItem,
    removeItem,
    mergeCart: mergeMutation.mutateAsync,
    isLoading: cartQuery.isLoading,
  };
};
