"use server";

import {
  addToCart,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
  type ShopifyCart,
  type ShopifyCartAttribute,
} from "@/lib/shopify";

export async function createCartAction(
  merchandiseId?: string,
  quantity = 1,
  attributes?: ShopifyCartAttribute[]
): Promise<ShopifyCart | null> {
  return createCart(merchandiseId, quantity, attributes);
}

export async function getCartAction(
  cartId: string
): Promise<ShopifyCart | null> {
  return getCart(cartId);
}

export async function addToCartAction(
  cartId: string,
  merchandiseId: string,
  quantity = 1,
  attributes?: ShopifyCartAttribute[]
): Promise<ShopifyCart | null> {
  return addToCart(cartId, merchandiseId, quantity, attributes);
}

export async function updateCartLineAction(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart | null> {
  return updateCartLine(cartId, lineId, quantity);
}

export async function removeCartLineAction(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart | null> {
  return removeCartLine(cartId, lineIds);
}