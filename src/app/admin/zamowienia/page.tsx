"use client";

import Link from "next/link";
import { useState } from "react";
import { useOrders } from "@/context/OrderContext";
import { OrderStatus } from "@/types";
import { getPrintInfo } from "@/data/printInfo";

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

const statusBorderColors: Record<OrderStatus, string> = {
  nowe: "border-blue-200",
  oplacone: "border-yellow-200",
  w_druku: "border-purple-200",
  wysłane: "border-orange-200",
  dostarczone: "border-emerald-200",
  anulowane: "border-red-200",
};

const statusFlow: OrderStatus[] = ["nowe", "oplacone", "w_druku", "wysłane", "dostarczone"];

const paymentLabels: Record<string, string> = {
  transfer: "Przelew bankowy",
  blik: "BLIK",
  cod: "Za pobraniem",
};

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useOrders();
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusNote, setStatusNote] = useState("");

  const filtered = orders.filter((o) => {
    if (filterStatus !== "all" && o.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.firstName.toLowerCase().includes(q) ||
        o.customer.lastName.toLowerCase().includes(q) ||
        o.customer.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selectedOrder = selectedOrderId ? orders.find((o) => o.id === selectedOrderId) : null;

  if (selectedOrder) {
    const currentStepIndex = statusFlow.indexOf(selectedOrder.status);

    const handleStatusChange = (newStatus: OrderStatus) => {
      updateOrderStatus(selectedOrder.id, newStatus, statusNote || undefined);
      setStatusNote("");
    };

    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedOrderId(null)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Zamówienia
          </button>
          <span className="text-slate-300">/</span>
          <h1 className="text-xl font-bold font-mono">{selectedOrder.orderNumber}</h1>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wide mb-4">Status zamówienia</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {statusFlow.map((status, i) => {
              const isCurrent = selectedOrder.status === status;
              const isPast = currentStepIndex >= 0 && i < currentStepIndex;
              return (
                <div
                  key={status}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    isCurrent
                      ? `${statusColors[status]} ${statusBorderColors[status]}`
                      : isPast
                      ? "bg-slate-100 text-slate-500 border-slate-200 line-through"
                      : "bg-white text-slate-400 border-slate-200"
                  }`}
                >
                  <span className="text-xs">{i + 1}.</span>
                  {statusLabels[status]}
                </div>
              );
            })}
            {selectedOrder.status === "anulowane" && (
              <div className={`px-4 py-2 rounded-lg border text-sm font-medium ${statusColors.anulowane} ${statusBorderColors.anulowane}`}>
                Anulowane
              </div>
            )}
          </div>

          {selectedOrder.status !== "dostarczone" && selectedOrder.status !== "anulowane" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Notatka do zmiany statusu (opcjonalna)..."
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex gap-2 flex-wrap">
                {currentStepIndex >= 0 && currentStepIndex < statusFlow.length - 1 && (
                  <button
                    onClick={() => handleStatusChange(statusFlow[currentStepIndex + 1])}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    → {statusLabels[statusFlow[currentStepIndex + 1]]}
                  </button>
                )}
                <button
                  onClick={() => handleStatusChange("anulowane")}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors border border-red-200"
                >
                  Anuluj
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wide mb-4">Dane klienta</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Imię i nazwisko</span>
                <span className="font-medium">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email</span>
                <a href={`mailto:${selectedOrder.customer.email}`} className="font-medium text-emerald-600 hover:underline">
                  {selectedOrder.customer.email}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Telefon</span>
                <a href={`tel:${selectedOrder.customer.phone}`} className="font-medium text-emerald-600 hover:underline">
                  {selectedOrder.customer.phone}
                </a>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <div className="text-slate-500 mb-1">Adres dostawy</div>
                <div className="font-medium">
                  {selectedOrder.customer.street}<br />
                  {selectedOrder.customer.postalCode} {selectedOrder.customer.city}
                </div>
              </div>
              {selectedOrder.customer.notes && (
                <div className="border-t border-slate-100 pt-3">
                  <div className="text-slate-500 mb-1">Uwagi</div>
                  <div className="text-slate-700">{selectedOrder.customer.notes}</div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wide mb-4">Płatność i podsumowanie</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Metoda płatności</span>
                <span className="font-medium">{paymentLabels[selectedOrder.payment] || selectedOrder.payment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Produkty</span>
                <span className="font-medium">{selectedOrder.subtotal.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dostawa</span>
                <span className="font-medium">
                  {selectedOrder.deliveryCost === 0 ? "Gratis" : `${selectedOrder.deliveryCost.toFixed(2)} zł`}
                </span>
              </div>
              {selectedOrder.codFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Za pobraniem</span>
                  <span className="font-medium">{selectedOrder.codFee.toFixed(2)} zł</span>
                </div>
              )}
              <div className="border-t border-slate-100 pt-3 flex justify-between">
                <span className="font-bold">Razem</span>
                <span className="font-bold text-lg">{selectedOrder.total.toFixed(2)} zł</span>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <div className="text-slate-500 mb-1">Data złożenia</div>
                <div className="font-medium">{new Date(selectedOrder.createdAt).toLocaleString("pl-PL")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wide">Produkty w zamówieniu</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {selectedOrder.items.map((item) => {
              const printInfo = getPrintInfo(item.productId);
              return (
                <div key={item.productId} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <Link href={`/produkty/${item.productSlug}`} className="font-medium text-emerald-600 hover:underline">
                        {item.productName}
                      </Link>
                      <span className="text-sm text-slate-500 ml-2">x{item.quantity}</span>
                    </div>
                    <div className="font-medium">{(item.price * item.quantity).toFixed(2)} zł</div>
                  </div>

                  {printInfo && (
                    <div className="bg-slate-50 rounded-lg p-4 mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">🖨️</span>
                        <span className="font-bold text-sm text-slate-700">Informacje o druku 3D</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div>
                          <span className="text-slate-500">Plik: </span>
                          <span className="font-mono text-xs bg-slate-200 px-1.5 py-0.5 rounded">{printInfo.stlFileName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Źródło: </span>
                          <span className="font-medium">{printInfo.stlSource}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Profil: </span>
                          <span className="font-medium">{printInfo.slicerProfile}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Filament: </span>
                          <span className="font-medium">{printInfo.filamentBrand}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Temp: </span>
                          <span className="font-medium">{printInfo.nozzleTemp}°C / stół {printInfo.bedTemp}°C</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Wypełnienie: </span>
                          <span className="font-medium">{printInfo.infill}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Podpory: </span>
                          <span className="font-medium">{printInfo.supports ? "Tak" : "Nie"}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Czas: </span>
                          <span className="font-medium">{printInfo.estimatedTime}</span>
                        </div>
                      </div>
                      {printInfo.notes && (
                        <div className="mt-3 text-sm bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-amber-800">
                          <span className="font-medium">Uwagi: </span>{printInfo.notes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wide mb-4">Historia statusów</h2>
          <div className="space-y-3">
            {selectedOrder.statusHistory.map((entry, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <div className="text-sm">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[entry.status]}`}>
                      {statusLabels[entry.status]}
                    </span>
                    <span className="text-slate-400 ml-2">
                      {new Date(entry.timestamp).toLocaleString("pl-PL")}
                    </span>
                  </div>
                  {entry.note && <div className="text-sm text-slate-600 mt-1">{entry.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Zamówienia</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Szukaj po numerze, nazwisku, emailu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as OrderStatus | "all")}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">Wszystkie statusy</option>
          {(Object.keys(statusLabels) as OrderStatus[]).map((s) => (
            <option key={s} value={s}>
              {statusLabels[s]}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-slate-500">
            {orders.length === 0 ? "Brak zamówień — złóż testowe zamówienie w sklepie" : "Brak zamówień pasujących do filtrów"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Nr zamówienia</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Klient</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Produkty</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden sm:table-cell">Płatność</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600">Kwota</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600 hidden lg:table-cell">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono font-medium text-emerald-600">{order.orderNumber}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{order.customer.firstName} {order.customer.lastName}</div>
                      <div className="text-xs text-slate-500">{order.customer.email}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="text-slate-600">
                        {order.items.length} {order.items.length === 1 ? "produkt" : order.items.length < 5 ? "produkty" : "produktów"}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-slate-600">{paymentLabels[order.payment] || order.payment}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{order.total.toFixed(2)} zł</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500 hidden lg:table-cell">
                      {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="text-sm text-slate-500">
        Wyświetlono {filtered.length} z {orders.length} zamówień
      </div>
    </div>
  );
}
