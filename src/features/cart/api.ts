import { apiClient } from "@/api/apiClient";
import type { AddToCartParams } from "@/types/cart";


export const getCart = () => {
    return apiClient.get("/cart/get");
}

export function addToCart(payload: AddToCartParams) {
  return apiClient.post(
    "/cart/add",
    payload
  );
}

