"use client";

import Link from "next/link";
import { useOrders } from "@/context/OrderContext";
import { products } from "@/data/products";
import { OrderStatus } from "@/types";

const statusLabels: Record<OrderStatus, string> = {
  nowe: "Nowe",
  oplacone: "Opłacone",
  w_druku: "W druku 3D",
  wysłane: "Wysłane",
  dostarczone: "Dostarczone",
  anulowane: "Anulowane",
};

const statusColors: Record<OrderStatus, string> = {
  nowe: "bg-blue-100 text-blue-700",
  oplacone: "bg-yellow-100 text-yellow-700",
  w_druku: "bg-purple-100 text-purple-700",
  wysłane: "bg-orange-100 text-orange-700",
  dostarczone: "bg-emerald-100 text-emerald-700",
  anulowane: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const { orders } = useOrders();

  const totalRevenue = orders
    .filter((o) => o.status !== "anulowane")
    .reduce((sum, o) => sum + o.total, 0);

  const statusCounts = orders.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const recentOrders = orders.slice(0, 5);

  const itemsToPrint = orders
    .filter((o) => o.status === "oplacone" || o.status === "w_druku")
    .flatMap((o) => o.items.map((item) => ({ ...item, orderNumber: o.orderNumber, orderId: o.id })));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <span className="text-sm text-slate-500">
          {new Date().toLocaleDateString("pl-PL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="text-sm text-slate-500 mb-1">Zamówienia łącznie</div>
          <div className="text-3xl font-bold">{orders.length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="text-sm text-slate-500 mb-1">Do realizacji</div>
          <div className="text-3xl font-bold text-blue-600">
            {(statusCounts["nowe"] || 0) + (statusCounts["oplacone"] || 0)}
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="text-sm text-slate-500 mb-1">W druku 3D</div>
          <div className="text-3xl font-bold text-purple-600">{statusCounts["w_druku"] || 0}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="text-sm text-slate-500 mb-1">Przychód</div>
          <div className="text-3xl font-bold text-emerald-600">{totalRevenue.toFixed(2)} zł</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Ostatnie zamówienia</h2>
            <Link href="/admin/zamowienia" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Zobacz wszystkie
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-slate-400">Brak zamówień</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href="/admin/zamowienia"
                  className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="font-medium text-sm">{order.orderNumber}</div>
                    <div className="text-xs text-slate-500">
                      {order.customer.firstName} {order.customer.lastName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{order.total.toFixed(2)} zł</div>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Kolejka druku 3D</h2>
            <Link href="/admin/produkty" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Info o druku
            </Link>
          </div>
          {itemsToPrint.length === 0 ? (
            <div className="p-8 text-center text-slate-400">Brak produktów w kolejce druku</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {itemsToPrint.map((item, i) => (
                <div key={`${item.orderId}-${item.productId}-${i}`} className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium text-sm">{item.productName}</div>
                    <div className="text-xs text-slate-500">Zamówienie: {item.orderNumber}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">x{item.quantity}</div>
                    <Link
                      href={`/admin/produkty#product-${item.productId}`}
                      className="text-xs text-emerald-600 hover:underline"
                    >
                      Pokaż model
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h2 className="font-bold text-slate-900 mb-4">Statusy zamówień</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(Object.keys(statusLabels) as OrderStatus[]).map((status) => (
            <div key={status} className={`rounded-lg p-3 text-center ${statusColors[status]}`}>
              <div className="text-2xl font-bold">{statusCounts[status] || 0}</div>
              <div className="text-xs font-medium mt-1">{statusLabels[status]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h2 className="font-bold text-slate-900 mb-3">Produkty w ofercie</h2>
        <div className="text-3xl font-bold">{products.length}</div>
        <p className="text-sm text-slate-500 mt-1">
          {products.filter((p) => p.inStock).length} dostępnych, {products.filter((p) => !p.inStock).length} niedostępnych
        </p>
      </div>
    </div>
  );
}
