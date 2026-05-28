"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    notes: "",
    payment: "transfer",
  });

  const deliveryCost = totalPrice >= 150 ? 0 : 14.99;
  const finalTotal = totalPrice + deliveryCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-3">Zamówienie złożone</h1>
          <p className="text-slate-500 mb-2">
            Dziękujemy za zakupy w 3DFish. Potwierdzenie zamówienia zostało wysłane na adres:
          </p>
          <p className="font-semibold text-emerald-600 mb-6">{form.email}</p>
          <p className="text-sm text-slate-400 mb-8">
            Numer zamówienia: <span className="font-mono font-semibold text-slate-700">3DF-{Date.now().toString(36).toUpperCase()}</span>
          </p>
          <Link
            href="/"
            className="inline-flex bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold mb-2">Koszyk jest pusty</h1>
        <p className="text-slate-500 mb-6">Dodaj produkty do koszyka przed złożeniem zamówienia.</p>
        <Link
          href="/produkty"
          className="inline-flex bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Przeglądaj produkty
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Zamówienie</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Data */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-4">Dane osobowe</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Imię *</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nazwisko *</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefon *</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-4">Adres dostawy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ulica i numer *</label>
                <input
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kod pocztowy *</label>
                  <input
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                    placeholder="00-000"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Miasto *</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-4">Metoda płatności</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 cursor-pointer transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={form.payment === "transfer"}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                />
                <div>
                  <span className="font-medium text-sm">Przelew bankowy</span>
                  <p className="text-xs text-slate-500">Opłać zamówienie przelewem tradycyjnym</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 cursor-pointer transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                <input
                  type="radio"
                  name="payment"
                  value="blik"
                  checked={form.payment === "blik"}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                />
                <div>
                  <span className="font-medium text-sm">BLIK</span>
                  <p className="text-xs text-slate-500">Szybka płatność kodem BLIK</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 cursor-pointer transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                />
                <div>
                  <span className="font-medium text-sm">Za pobraniem (+5 zł)</span>
                  <p className="text-xs text-slate-500">Zapłać kurierowi przy odbiorze</p>
                </div>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-4">Uwagi do zamówienia</h2>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Opcjonalne uwagi..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Twoje zamówienie</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-slate-600 truncate mr-2">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-medium shrink-0">
                    {(item.product.price * item.quantity).toFixed(2)} zł
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Produkty</span>
                <span className="font-medium">{totalPrice.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dostawa</span>
                <span className={`font-medium ${deliveryCost === 0 ? "text-emerald-600" : ""}`}>
                  {deliveryCost === 0 ? "Gratis" : `${deliveryCost.toFixed(2)} zł`}
                </span>
              </div>
              {form.payment === "cod" && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Za pobraniem</span>
                  <span className="font-medium">5.00 zł</span>
                </div>
              )}
              <div className="border-t border-slate-100 pt-3 flex justify-between">
                <span className="font-bold text-base">Do zapłaty</span>
                <span className="font-bold text-xl">
                  {(finalTotal + (form.payment === "cod" ? 5 : 0)).toFixed(2)} zł
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors shadow-lg hover:shadow-emerald-500/25 active:scale-95"
            >
              Złóż zamówienie
            </button>
            <p className="text-xs text-slate-400 text-center mt-3">
              Składając zamówienie akceptujesz regulamin sklepu
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
