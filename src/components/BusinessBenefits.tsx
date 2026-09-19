"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  LayoutDashboard,
  Clock,
  ArrowRight,
  BarChart3,
  Check,
  Users,
  ShieldCheck,
  CalendarClock,
} from "lucide-react";
import Link from "next/link";

const businessPerks = [
  {
    icon: Users,
    title: "Меньше очередей у кассы",
    metric: "-65% толпы в ланч",
    description:
      "Гости больше не блокируют вход и не уходят к конкурентам из-за длинных хвостов. Кассир спокоен, а выдача предзаказа занимает всего 5 секунд.",
  },
  {
    icon: CalendarClock,
    title: "Заказы приходят заранее",
    metric: "15–30 мин форы",
    description:
      "Кухня и бариста видят входящие предзаказы заблаговременно. Повара готовят ритмично и без нервных задержек в часы максимального спроса.",
  },
  {
    icon: TrendingUp,
    title: "Равномерная загрузка кухни",
    metric: "Сглаживание пиков",
    description:
      "Умные слоты стимулируют гостей выбирать более свободные интервалы повышенными бонусами. Это выравнивает загрузку без простоя и перегрузок.",
  },
  {
    icon: LayoutDashboard,
    title: "Понятный и легкий Dashboard",
    metric: "1 клик для статуса",
    description:
      "Работает в любом браузере на планшете или телефоне за 15 минут. Быстрое переключение статусов, стоп-лист и оперативный контроль выручки.",
  },
];

export default function BusinessBenefits() {
  const [activeTab, setActiveTab] = useState<"preparing" | "ready">("preparing");

  return (
    <section
      id="business-benefits"
      className="py-20 md:py-28 relative bg-slate-50/70 dark:bg-[#090B11] border-t border-slate-200/80 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-4">
            Партнерство для кафе, ресторанов и фастфуда
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Оптимизируйте кухню и растите выручку с{" "}
            <span className="text-gradient-fire">QoS Business</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-gray-300">
            Платформа предзаказа, созданная для того, чтобы превратить пиковые перегрузки в контролируемый и предсказуемый процесс.
          </p>
        </div>

        {/* 2-Column: Left Perks, Right Interactive Dashboard Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: 4 Business Values */}
          <div className="lg:col-span-6 space-y-4">
            {businessPerks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121622]/80 shadow-sm hover:shadow-md dark:shadow-none flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 dark:text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                        {perk.title}
                      </h3>
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                        {perk.metric}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300/90 leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <Link
                href="/business"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-orange-600/30 transition-all group"
              >
                <span>Подключить ресторан или кафе</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Realistic QoS Partner Dashboard Simulator */}
          <div className="lg:col-span-6">
            <div className="relative glass-panel rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-white/15 bg-white dark:bg-[#121622]/90 shadow-xl dark:shadow-2xl backdrop-blur-xl">
              
              {/* Dashboard Window Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-gray-400">qos-business-terminal v2.4</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">В сети • Онлайн</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <span className="text-[11px] text-slate-500 dark:text-gray-400 block">Заказов сегодня</span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">48 предзаказов</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <span className="text-[11px] text-slate-500 dark:text-gray-400 block">Выручка предзаказа</span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">114 200 ₸</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <span className="text-[11px] text-slate-500 dark:text-gray-400 block">Средний чек</span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-amber-600 dark:text-amber-400">2 380 ₸</span>
                </div>
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-2 mb-4 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs">
                <button
                  onClick={() => setActiveTab("preparing")}
                  className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                    activeTab === "preparing"
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  Готовится (2)
                </button>
                <button
                  onClick={() => setActiveTab("ready")}
                  className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                    activeTab === "ready"
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                      : "text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  Готов к выдаче (3)
                </button>
              </div>

              {/* Order Cards List in Mockup */}
              <div className="space-y-3">
                {activeTab === "preparing" ? (
                  <>
                    <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-white/[0.04] border border-orange-400/40 dark:border-orange-500/30 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                            #Q-512
                          </span>
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">Айдар (Слот 13:10–13:20)</span>
                        </div>
                        <span className="text-[11px] text-orange-600 dark:text-orange-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Осталось 6 мин
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-gray-300 pl-1 border-l-2 border-orange-500/40">
                        1× Чизбургер QoS Special, 1× Батат фри, 1× Лимонад цитрус
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-white/5 text-xs">
                        <span className="text-slate-500 dark:text-gray-400">Сумма: <strong className="text-slate-900 dark:text-white font-mono">3 400 ₸</strong></span>
                        <button
                          onClick={() => setActiveTab("ready")}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
                        >
                          <Check className="w-3 h-3" /> Пометить «Готов»
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-gray-300">
                            #Q-513
                          </span>
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">Данияр (Слот 13:20–13:30)</span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-gray-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Осталось 16 мин
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-gray-300 pl-1 border-l-2 border-slate-300 dark:border-white/20">
                        2× Капучино большой, 2× Сэндвич с курицей
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-white/5 text-xs">
                        <span className="text-slate-500 dark:text-gray-400">Сумма: <strong className="text-slate-900 dark:text-white font-mono">4 100 ₸</strong></span>
                        <span className="text-slate-500 dark:text-gray-400 text-[11px]">Кухня готовит</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/40 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          #Q-509
                        </span>
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">Мадина (Ждет на стойке)</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">Код: 394</span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-gray-300 pl-1 border-l-2 border-emerald-500/40">
                      1× Матча латте, 1× Чизкейк Сан-Себастьян
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-white/5 text-xs">
                      <span className="text-slate-500 dark:text-gray-400">Сумма: <strong className="text-slate-900 dark:text-white font-mono">2 800 ₸</strong></span>
                      <button
                        onClick={() => setActiveTab("preparing")}
                        className="px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        Выдать заказ
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom message */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-gray-400">
                <span>Подключение заведения за 15 минут</span>
                <span className="text-orange-500 dark:text-orange-400 font-semibold">QoS Business Cloud</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
