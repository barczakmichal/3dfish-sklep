"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Order, OrderStatus, OrderItem, OrderForm } from "@/types";

interface OrderContextType {
  orders: Order[];
  addOrder: (items: OrderItem[], customer: OrderForm, payment: string, subtotal: number, deliveryCost: number, codFee: number) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrder: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function generateOrderNumber(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = (now.getMonth() + 1).toString().padStart(2, "0");
  const d = now.getDate().toString().padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `3DF-${y}${m}${d}-${rand}`;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch {}
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders, loaded]);

  const addOrder = (
    items: OrderItem[],
    customer: OrderForm,
    payment: string,
    subtotal: number,
    deliveryCost: number,
    codFee: number
  ): string => {
    const now = new Date().toISOString();
    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: generateOrderNumber(),
      status: "nowe",
      items,
      customer,
      payment,
      subtotal,
      deliveryCost,
      codFee,
      total: subtotal + deliveryCost + codFee,
      createdAt: now,
      updatedAt: now,
      statusHistory: [{ status: "nowe", timestamp: now }],
    };
    setOrders((prev) => [order, ...prev]);
    return order.orderNumber;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const now = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              updatedAt: now,
              statusHistory: [...o.statusHistory, { status, timestamp: now, note }],
            }
          : o
      )
    );
  };

  const getOrder = (orderId: string) => orders.find((o) => o.id === orderId);

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
}
