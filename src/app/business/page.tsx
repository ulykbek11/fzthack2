"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Store,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  Zap,
  Users,
  Send,
  Building2,
} from "lucide-react";

export default function BusinessPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    venueName: "",
    category: "Кофейня",
    city: "Алматы",
    phone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090B11] text-slate-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#090B11]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>На главную</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center text-white font-black text-sm shadow-md shadow-orange-500/20">
              Q
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              QoS Business
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/map"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-200 transition-colors"
          >
            Клиентская карта
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Information & Partner Value */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-4">
                Партнерская программа QoS
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                Подключите заведение к предзаказам{" "}
                <span className="text-gradient-fire">QoS</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                Получайте заказы заранее, разгружайте кассовую зону в часы пик и привлекайте постоянных гостей благодаря бонусной системе.
              </p>
            </div>

            {/* Value checklist */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/20 dark:border-orange-500/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Старт за 15 минут</h3>
                  <p className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">
                    Не требуется покупка сложного оборудования. Терминал QoS работает в браузере на любом планшете или смартфоне.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">План загрузки кухни</h3>
                  <p className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">
                    Кухня видит предзаказы за 15–30 минут вперед, плавно распределяя заказы и избегая запары.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Честные условия без скрытых комиссий</h3>
                  <p className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">
                    Вы продаете по своим ценам меню. Прозрачная отчетность и моментальный вывод средств.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form or Success State */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/15 shadow-xl transition-colors">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Заявка отправлена!</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300">
                    Спасибо! Наш менеджер свяжется с вами по указанному телефону в течение 15 минут для подключения заведения к QoS.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline pt-4 block mx-auto"
                  >
                    Заполнить еще одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="pb-3 border-b border-slate-200 dark:border-white/10">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Заявка на подключение</h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Заполните форму, и мы настроим ваше меню в QoS</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                      Название заведения
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Например: Urban Coffee Roasters"
                      value={formData.venueName}
                      onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-[#141824] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                        Категория
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#141824] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                      >
                        <option value="Кофейня">Кофейня</option>
                        <option value="Бургеры">Бургеры</option>
                        <option value="Ресторан">Ресторан</option>
                        <option value="Пиццерия">Пиццерия</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Столовая">Столовая</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                        Город
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#141824] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                      Контактный телефон
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+7 (707) 000-00-00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-[#141824] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                      Рабочий Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="manager@cafe.kz"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-[#141824] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Отправить заявку на подключение</span>
                  </button>

                  <p className="text-[11px] text-slate-500 dark:text-gray-400 text-center pt-2">
                    Нажимая кнопку, вы соглашаетесь на подключение к платформе QoS Business
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
