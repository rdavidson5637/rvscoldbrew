"use client";

import { useEffect } from "react";

const CART_STORAGE_KEY = "rvs-cart";

export default function ClearCart() {
  useEffect(() => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);
  return null;
}
