"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ManagedProduct } from "@/types/admin";

export type CartItem = {
  id: string;
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_image: string | null;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  loading: boolean;
  error: string;
  addItem: (product: ManagedProduct) => Promise<void>;
  updateQuantity: (item: CartItem, quantity: number) => Promise<void>;
  removeItem: (item: CartItem) => Promise<void>;
  clearCart: () => Promise<void>;
  refresh: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);
const MAX_QUANTITY = 99;

export function CartProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const pathname = usePathname();
  const userIdPromise = useRef<Promise<string> | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUserId = useCallback(() => {
    if (!userIdPromise.current) {
      const request = (async () => {
        const {
          data: { user },
          error: sessionError,
        } = await supabase.auth.getUser();
        if (sessionError) throw sessionError;
        if (user) return user.id;

        const { data, error: signInError } =
          await supabase.auth.signInAnonymously();
        if (signInError) throw signInError;
        if (!data.user)
          throw new Error("Não foi possível iniciar uma sessão de visitante.");
        return data.user.id;
      })();
      userIdPromise.current = request;
      void request.catch(() => {
        if (userIdPromise.current === request) userIdPromise.current = null;
      });
    }

    return userIdPromise.current;
  }, [supabase]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const userId = await getUserId();
      const { data, error: loadError } = await supabase
        .from("cart_items")
        .select(
          "id, product_id, product_name, product_description, product_price, product_image, quantity",
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

      if (loadError) throw loadError;
      setItems((data ?? []) as CartItem[]);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Não foi possível carregar o carrinho.",
      );
    } finally {
      setLoading(false);
    }
  }, [getUserId, supabase]);

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
      setLoading(false);
      return;
    }
    void refresh();
  }, [pathname, refresh]);

  const addItem = useCallback(
    async (product: ManagedProduct) => {
      setError("");
      try {
        const userId = await getUserId();
        const { data: existing, error: selectError } = await supabase
          .from("cart_items")
          .select("quantity")
          .eq("user_id", userId)
          .eq("product_id", product.id)
          .maybeSingle();

        if (selectError) throw selectError;
        if ((existing?.quantity ?? 0) >= MAX_QUANTITY)
          throw new Error(`Você pode adicionar até ${MAX_QUANTITY} unidades.`);

        const { error: saveError } = await supabase.from("cart_items").upsert(
          {
            user_id: userId,
            product_id: product.id,
            product_name: product.name,
            product_description: product.description,
            product_price: product.price,
            product_image: product.image,
            quantity: (existing?.quantity ?? 0) + 1,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,product_id" },
        );

        if (saveError) throw saveError;
        await refresh();
      } catch (addError) {
        const message =
          addError instanceof Error
            ? addError.message
            : "Não foi possível adicionar o produto ao carrinho.";
        setError(message);
        throw addError;
      }
    },
    [getUserId, refresh, supabase],
  );

  const updateQuantity = useCallback(
    async (item: CartItem, quantity: number) => {
      const nextQuantity = Math.min(Math.floor(quantity), MAX_QUANTITY);
      setError("");
      try {
        if (nextQuantity < 1) {
          const userId = await getUserId();
          const { error: deleteError } = await supabase
            .from("cart_items")
            .delete()
            .eq("id", item.id)
            .eq("user_id", userId);
          if (deleteError) throw deleteError;
        } else {
          const userId = await getUserId();
          const { error: updateError } = await supabase
            .from("cart_items")
            .update({
              quantity: nextQuantity,
              updated_at: new Date().toISOString(),
            })
            .eq("id", item.id)
            .eq("user_id", userId);
          if (updateError) throw updateError;
        }
        await refresh();
      } catch (updateError) {
        const message =
          updateError instanceof Error
            ? updateError.message
            : "Não foi possível atualizar a quantidade.";
        setError(message);
        throw updateError;
      }
    },
    [getUserId, refresh, supabase],
  );

  const removeItem = useCallback(
    async (item: CartItem) => {
      setError("");
      try {
        const userId = await getUserId();
        const { error: deleteError } = await supabase
          .from("cart_items")
          .delete()
          .eq("id", item.id)
          .eq("user_id", userId);
        if (deleteError) throw deleteError;
        await refresh();
      } catch (removeError) {
        const message =
          removeError instanceof Error
            ? removeError.message
            : "Não foi possível remover o produto.";
        setError(message);
        throw removeError;
      }
    },
    [getUserId, refresh, supabase],
  );

  const clearCart = useCallback(async () => {
    setError("");
    try {
      const userId = await getUserId();
      const { error: deleteError } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);
      if (deleteError) throw deleteError;
      setItems([]);
    } catch (clearError) {
      const message =
        clearError instanceof Error
          ? clearError.message
          : "Não foi possível esvaziar o carrinho.";
      setError(message);
      throw clearError;
    }
  }, [getUserId, supabase]);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) => total + Number(item.product_price) * item.quantity,
        0,
      ),
      loading,
      error,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      refresh,
    }),
    [
      addItem,
      clearCart,
      error,
      items,
      loading,
      refresh,
      removeItem,
      updateQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("Cart components must be rendered inside CartProvider.");
  }
  return cart;
}
