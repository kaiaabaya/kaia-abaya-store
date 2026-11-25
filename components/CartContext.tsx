"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  addToCartAction,
  createCartAction,
  getCartAction,
  removeCartLineAction,
  updateCartLineAction,
} from "@/app/actions/cart";
import type { ShopifyCart, ShopifyCartAttribute } from "@/lib/shopify";

type CartContextType = {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    merchandiseId: string,
    quantity?: number,
    attributes?: ShopifyCartAttribute[]
  ) => Promise<void>;
  buyNow: (
    merchandiseId: string,
    quantity?: number,
    attributes?: ShopifyCartAttribute[]
  ) => Promise<void>;
  updateItemQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_STORAGE_KEY = "kaia_shopify_cart_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_STORAGE_KEY);
    if (!savedCartId) return;

    getCartAction(savedCartId)
      .then((existingCart) => {
        if (existingCart) {
          setCart(existingCart);
        } else {
          localStorage.removeItem(CART_ID_STORAGE_KEY);
        }
      })
      .catch(() => {
        localStorage.removeItem(CART_ID_STORAGE_KEY);
      });
  }, []);

  const addItem = async (
    merchandiseId: string,
    quantity = 1,
    attributes?: ShopifyCartAttribute[]
  ) => {
    setIsLoading(true);
    try {
      let updatedCart: ShopifyCart | null = null;

      if (cart?.id) {
        updatedCart = await addToCartAction(
          cart.id,
          merchandiseId,
          quantity,
          attributes
        );
      }

      if (!updatedCart) {
        updatedCart = await createCartAction(
          merchandiseId,
          quantity,
          attributes
        );
      }

      if (updatedCart) {
        setCart(updatedCart);
        localStorage.setItem(CART_ID_STORAGE_KEY, updatedCart.id);
        setIsOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const buyNow = async (
    merchandiseId: string,
    quantity = 1,
    attributes?: ShopifyCartAttribute[]
  ) => {
    setIsLoading(true);
    try {
      const instantCart = await createCartAction(
        merchandiseId,
        quantity,
        attributes
      );
      if (instantCart?.checkoutUrl) {
        window.location.href = instantCart.checkoutUrl;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateItemQuantity = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    setIsLoading(true);
    try {
      if (quantity <= 0) {
        const updated = await removeCartLineAction(cart.id, [lineId]);
        if (updated) setCart(updated);
      } else {
        const updated = await updateCartLineAction(cart.id, lineId, quantity);
        if (updated) setCart(updated);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart?.id) return;
    setIsLoading(true);
    try {
      const updated = await removeCartLineAction(cart.id, [lineId]);
      if (updated) setCart(updated);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        buyNow,
        updateItemQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}