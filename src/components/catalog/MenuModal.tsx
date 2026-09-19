"use client";

import React, { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Clock,
  Coins,
  ShoppingBag,
  CheckCircle2,
  MapPin,
  Sparkles,
  Phone,
} from "lucide-react";
import { Venue, MenuItem } from "@/data/mockVenues";

interface MenuModalProps {
  venue: Venue | null;
  onClose: () => void;
}

interface CartItem {
  item: MenuItem;
  quantity: number;
}

export default function MenuModal({ venue, onClose }: MenuModalProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pickupTime, setPickupTime] = useState("Через 15 минут");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [pickupCode, setPickupCode] = useState<number | null>(null);

  if (!venue) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (!input.startsWith("7") && input.length > 0) {
      if (input.startsWith("8")) {
        input = "7" + input.slice(1);
      } else {
        input = "7" + input;
      }
    }
    let formatted = "";
    if (input.length > 0) {
      formatted = "+7";
      if (input.length > 1) {
        formatted += " (" + input.substring(1, 4);
      }
      if (input.length >= 5) {
        formatted += ") " + input.substring(4, 7);
      }
      if (input.length >= 8) {
        formatted += "-" + input.substring(7, 9);
      }
      if (input.length >= 10) {
        formatted += "-" + input.substring(9, 11);
      }
    }
    setPhoneNumber(formatted);
    if (phoneError) setPhoneError("");
  };

  const handleAddToCart = (dish: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === dish.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === dish.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item: dish, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === dishId);
      if (existing && existing.quantity > 1) {
        return prev.map((ci) =>
          ci.item.id === dishId ? { ...ci, quantity: ci.quantity - 1 } : ci
        );
      }
      return prev.filter((ci) => ci.item.id !== dishId);
    });
  };

  const getQuantity = (dishId: string) => {
    return cart.find((ci) => ci.item.id === dishId)?.quantity || 0;
  };

  const totalAmount = cart.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );
  const eligibleForBonus = Boolean(venue.bonusWindow && pickupTime === venue.bonusWindow);
  const earnedBonuses = eligibleForBonus ? venue.bonusAmount : 0;

  const handleCheckout = () => {
    const rawDigits = phoneNumber.replace(/\D/g, "");
    if (eligibleForBonus && rawDigits.length < 11) {
      setPhoneError("Введите номер телефона, чтобы получить бонусы за тихий час");
      return;
    }
    setPhoneError("");
    const code = Math.floor(100 + Math.random() * 900);
    setPickupCode(code);
    setOrderConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 dark:bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative my-auto flex max-h-[96vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        
        {/* Header Bar */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-zinc-900 shrink-0">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Venue Top Header Info */}
          <div className="absolute bottom-4 left-5 right-5 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-orange-500 text-white">
                  {venue.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {venue.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-gray-300 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  {venue.prepTime} готовность
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {venue.address}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-300 block">Бонусное время:</span>
              <span className="text-sm font-bold text-amber-400">
                {venue.bonusWindow ? `${venue.bonusWindow} · +${venue.bonusAmount}` : "Сегодня нет бонусных слотов"}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12 lg:overflow-hidden">
          
          {/* Left: Dishes List */}
          <div className="space-y-4 border-r border-slate-200 bg-slate-50/60 p-5 sm:p-6 lg:col-span-7 lg:overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Меню заведения</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {venue.menu.map((dish) => {
                const qty = getQuantity(dish.id);
                return (
                  <div
                    key={dish.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:border-orange-500/40 dark:hover:border-orange-500/30 transition-all flex flex-col justify-between shadow-sm dark:shadow-none"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-zinc-800">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                        {dish.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {dish.price.toLocaleString()} ₸
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => handleAddToCart(dish)}
                          className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> В заказ
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-600/20 border border-orange-300 dark:border-orange-500/30 rounded-lg px-2 py-1">
                          <button
                            onClick={() => handleRemoveFromCart(dish.id)}
                            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 dark:text-white px-1">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleAddToCart(dish)}
                            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="flex flex-col justify-between bg-white p-5 sm:p-6 lg:col-span-5 lg:overflow-y-auto">
            {orderConfirmed ? (
              <div className="my-auto text-center py-8 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    Предзаказ принят!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-gray-300 mt-1">
                    Заведение «{venue.name}» уже готовит ваш заказ
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 max-w-xs mx-auto">
                  <span className="text-xs text-slate-500 dark:text-gray-400 block mb-1">
                    Ваш код выдачи на стойке:
                  </span>
                  <span className="text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400 tracking-wider">
                    #{pickupCode}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-2">
                    Время самовывоза: <strong className="text-slate-900 dark:text-white">{pickupTime}</strong>
                  </p>
                </div>

                {eligibleForBonus && <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-left max-w-xs mx-auto space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Бонусы QoS начислены на баланс!</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-gray-300">
                    Номер счета: <strong className="text-slate-900 dark:text-white font-mono">{phoneNumber}</strong>
                  </p>
                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-amber-500/20 text-amber-800 dark:text-amber-300">
                    <span>Зачислено:</span>
                    <strong className="font-mono text-sm">+{earnedBonuses} бонусов (₸)</strong>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 pt-0.5">
                    SMS с кодом заказа и информацией о бонусах отправлено.
                  </p>
                </div>}

                <button
                  onClick={() => {
                    setOrderConfirmed(false);
                    setCart([]);
                    setPhoneNumber("");
                    setPhoneError("");
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white text-xs font-bold transition-all"
                >
                  Вернуться в каталог
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                      Ваш предзаказ
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-gray-400">
                      {cart.reduce((s, ci) => s + ci.quantity, 0)} поз.
                    </span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 dark:text-gray-500 text-xs">
                      <p>В заказе пока пусто.</p>
                      <p className="mt-1">Выберите блюда из меню слева.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-44 overflow-y-auto my-2">
                      {cart.map((ci) => (
                        <div
                          key={ci.item.id}
                          className="py-2.5 flex items-center justify-between text-xs"
                        >
                          <div className="flex-1 pr-2">
                            <span className="font-semibold text-slate-900 dark:text-white block">
                              {ci.item.name}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-gray-400">
                              {ci.item.price} ₸ × {ci.quantity}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white font-mono">
                              {(ci.item.price * ci.quantity).toLocaleString()} ₸
                            </span>
                            <button
                              onClick={() => handleRemoveFromCart(ci.item.id)}
                              className="text-slate-400 hover:text-red-500 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pickup Time selector */}
                <div className="pt-3 border-t border-slate-200 dark:border-white/10">
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">
                    Время самовывоза:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Через 15 минут", "Через 30 минут", ...(venue.bonusWindow ? [venue.bonusWindow] : [])].map((t) => (
                      <button
                        key={t}
                        onClick={() => setPickupTime(t)}
                        className={`py-2 px-2 text-center rounded-xl text-xs font-semibold border transition-all ${
                          pickupTime === t
                            ? "bg-orange-600 border-orange-500 text-white shadow-md shadow-orange-600/30"
                            : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phone Number Input is needed only for a bonus slot. */}
                {eligibleForBonus && <div className="pt-3 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-gray-200 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-orange-500" />
                      <span>Номер для зачисления бонусов</span>
                      <span className="text-red-500 text-xs">*</span>
                    </label>
                    {totalAmount > 0 && (
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        +{earnedBonuses} бонусов
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="+7 (707) 123-45-67"
                      maxLength={18}
                      className={`w-full bg-slate-50 dark:bg-[#141824] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors ${
                        phoneError
                          ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                          : "border-slate-200 dark:border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      }`}
                    />
                  </div>

                  {phoneError ? (
                    <p className="text-[11px] font-medium text-red-500 mt-1.5">
                      {phoneError}
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                      <Coins className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>Бонусы начислятся после выдачи заказа в выбранный тихий час</span>
                    </p>
                  )}
                </div>}

                {/* Price Summary */}
                <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-gray-400">
                    <span>Сумма заказа:</span>
                    <span className="text-slate-900 dark:text-white font-semibold font-mono">
                      {totalAmount.toLocaleString()} ₸
                    </span>
                  </div>
                  {totalAmount > 0 && eligibleForBonus && (
                    <div className="flex justify-between text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                      <span className="flex items-center gap-1 font-semibold">
                        <Coins className="w-3.5 h-3.5" /> Будет начислено:
                      </span>
                      <span className="font-extrabold font-mono">
                        +{earnedBonuses} бонусов
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-white/5">
                    <span>К оплате:</span>
                    <span className="text-orange-600 dark:text-orange-400 font-mono">
                      {totalAmount.toLocaleString()} ₸
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Оформить предзаказ</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
