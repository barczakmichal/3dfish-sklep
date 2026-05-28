"use client";

import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <OrderProvider>
      <CartProvider>{children}</CartProvider>
    </OrderProvider>
  );
}
