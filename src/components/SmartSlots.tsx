"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Sparkles,
  Coins,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Flame,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Coffee,
  Check,
  Lock,
} from "lucide-react";

interface SlotData {
  id: string;
  time: string;
  loadPercent: number;
  loadLabel: string;
  loadColor: "red" | "amber" | "emerald";
  bonuses: number;
  status: "available" | "busy" | "overloaded";
  description: string;
  isAvailable: boolean;
}

const slotsList: SlotData[] = [
  {
    id: "slot-1",
    time: "13:00 – 13:10",
    loadPercent: 85,
    loadLabel: "Высокая загрузка",
    loadColor: "red",
    bonuses: 20,
    status: "busy",
    description: "Пиковый ланч. Несколько поваров уже заняты параллельными заказами.",
    isAvailable: true,
  },
  {
    id: "slot-2",
    time: "13:10 – 13:20",
    loadPercent: 55,
    loadLabel: "Средняя загрузка",
    loadColor: "amber",
    bonuses: 50,
    status: "busy",
    description: "Умеренный поток. Оптимальный выбор для быстрого ланча.",
    isAvailable: true,
  },
  {
    id: "slot-3",
    time: "13:20 – 13:30",
    loadPercent: 20,
    loadLabel: "Свободный слот",
    loadColor: "emerald",
    bonuses: 100,
    status: "available",
    description: "Кухня полностью свободна. Максимальный кэшбэк на твой баланс!",
    isAvailable: true,
  },
  {
    id: "slot-4",
    time: "13:30 – 13:40",
    loadPercent: 100,
    loadLabel: "Перегружен • 100%",
    loadColor: "red",
    bonuses: 0,
    status: "overloaded",
    description: "Лимит заказов исчерпан. Слот закрыт для соблюдения стандартов качества.",
    isAvailable: false,
  },
];

export default function SmartSlots() {
  const [selectedSlotId, setSelectedSlotId] = useState<string>("slot-3");

  const selectedSlot =
    slotsList.find((s) => s.id === selectedSlotId) || slotsList[2];

  return (
    <section
      id="smart-slots"
      className="py-20 md:py-28 relative bg-white dark:bg-[#080A10] border-t border-slate-200/80 dark:border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Ключевая механика QoS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Умные временные слоты:{" "}
            <span className="text-gradient-fire">
              чем свободнее, тем больше бонусов
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
            QoS превращает хаотичную очередь в плавный поток заказов. Алгоритм
            анализирует загрузку кухни в реальном времени и динамически
            начисляет бонусы за выбор свободных интервалов.
          </p>
        </div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main: Slot Selector Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                Выберите интервал самовывоза (демо):
              </span>
              <span className="text-xs text-slate-500 dark:text-gray-400">
                Кликните для выбора
              </span>
            </div>

            <div className="space-y-3.5">
              {slotsList.map((slot) => {
                const isSelected = selectedSlot.id === slot.id;
                const isOverloaded = !slot.isAvailable;

                return (
                  <div
                    key={slot.id}
                    onClick={() => {
                      if (!isOverloaded) {
                        setSelectedSlotId(slot.id);
                      }
                    }}
                    role="button"
                    tabIndex={isOverloaded ? -1 : 0}
                    onKeyDown={(e) => {
                      if (!isOverloaded && (e.key === "Enter" || e.key === " ")) {
                        setSelectedSlotId(slot.id);
                      }
                    }}
                    className={`relative rounded-2xl p-5 transition-all duration-200 select-none border text-left ${
                      isOverloaded
                        ? "opacity-60 bg-slate-100/80 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 cursor-not-allowed"
                        : isSelected
                        ? "bg-orange-50/90 dark:bg-[#161B28] border-orange-500 dark:border-orange-500/80 shadow-lg shadow-orange-500/10 ring-2 ring-orange-500/20 cursor-pointer"
                        : "bg-slate-50/80 dark:bg-[#121622]/80 border-slate-200/90 dark:border-white/10 hover:border-orange-400/50 dark:hover:border-white/20 hover:bg-white dark:hover:bg-[#151926] cursor-pointer"
                    }`}
                  >
                    {/* Top Row: Time, Status Badge & Bonuses */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Selector Radio indicator */}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            isOverloaded
                              ? "bg-slate-300 dark:bg-white/10 text-slate-500"
                              : isSelected
                              ? "bg-orange-500 text-white shadow-sm"
                              : "border border-slate-300 dark:border-white/20 bg-white dark:bg-transparent"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          {isOverloaded && <Lock className="w-3 h-3 text-slate-500 dark:text-gray-400" />}
                        </div>

                        {/* Slot Time */}
                        <span
                          className={`text-lg sm:text-xl font-bold font-mono tracking-tight ${
                            isSelected
                              ? "text-orange-600 dark:text-orange-400"
                              : isOverloaded
                              ? "text-slate-500 dark:text-gray-500 line-through"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {slot.time}
                        </span>

                        {/* Selected Tag */}
                        {isSelected && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-300 border border-orange-500/30">
                            Выбран вами
                          </span>
                        )}
                      </div>

                      {/* Bonus Pill */}
                      <div className="flex items-center gap-2">
                        {slot.bonuses > 0 ? (
                          <span
                            className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 font-mono ${
                              slot.bonuses >= 100
                                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-sm"
                                : slot.bonuses >= 50
                                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                                : "bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-gray-300 border border-slate-300 dark:border-white/10"
                            }`}
                          >
                            <Coins className="w-3.5 h-3.5 text-amber-500" />
                            +{slot.bonuses} бонусов
                          </span>
                        ) : (
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                            Слот закрыт
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar showing Load */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-500 dark:text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              slot.loadColor === "emerald"
                                ? "bg-emerald-500"
                                : slot.loadColor === "amber"
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                          />
                          Загрузка:{" "}
                          <strong className="text-slate-800 dark:text-gray-200">
                            {slot.loadLabel}
                          </strong>
                        </span>
                        <span className="font-mono">{slot.loadPercent}% емкости</span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            slot.loadColor === "emerald"
                              ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                              : slot.loadColor === "amber"
                              ? "bg-gradient-to-r from-amber-500 to-orange-400"
                              : "bg-gradient-to-r from-red-500 to-rose-600"
                          }`}
                          style={{ width: `${slot.loadPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Hint text */}
                    <p className="mt-2.5 text-xs text-slate-500 dark:text-gray-400">
                      {slot.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Micro Explainer Note */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center gap-3 text-xs text-slate-600 dark:text-gray-300">
              <AlertCircle className="w-4 h-4 text-orange-500 shrink-0" />
              <span>
                <strong>Правило слота:</strong> перегруженные интервалы (100%)
                автоматически блокируются. Это защищает кухню от сбоев и
                гарантирует выдачу точно секунда в секунду.
              </span>
            </div>
          </div>

          {/* Right: Live Dynamic Summary & Win-Win Logic */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Ticket Card */}
            <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 bg-gradient-to-b from-white to-slate-50 dark:from-[#131722] dark:to-[#0D1017] shadow-xl dark:shadow-2xl relative overflow-hidden">
              {/* Top Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-5">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-gray-400 font-semibold block">
                    Интерактивный расчет предзаказа
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Твой заказ в QoS
                  </h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/20">
                  LIVE CALC
                </span>
              </div>

              {/* Selected Slot Recap */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-gray-400 block">
                      Выбранный слот:
                    </span>
                    <span className="text-lg font-mono font-black text-slate-900 dark:text-white">
                      {selectedSlot.time}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-gray-400 block">
                      Статус выдачи:
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Без ожидания
                    </span>
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-600 dark:text-gray-300">
                    <span>Сумма блюд по меню:</span>
                    <span className="font-semibold text-slate-900 dark:text-white font-mono">
                      2 450 ₸
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Наценка платформы:
                    </span>
                    <span className="font-semibold font-mono">0 ₸ (0%)</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-white/10 text-base font-bold text-slate-900 dark:text-white">
                    <span>Итого к оплате:</span>
                    <span className="font-mono text-xl">2 450 ₸</span>
                  </div>
                </div>

                {/* Cash-back Bonus Highlight */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-gray-300 block">
                        Бонусы за этот слот:
                      </span>
                      <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                        +{selectedSlot.bonuses} QoS бонусов
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/30">
                      <Coins className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-600 dark:text-gray-400">
                    1 бонус = 1 ₸. Можно списать на следующий кофе или обед!
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/map"
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-orange-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
              >
                <span>Найти заведение и выбрать слот</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Why it works for everyone */}
            <div className="rounded-2xl p-5 bg-slate-50 dark:bg-[#121622]/60 border border-slate-200 dark:border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-orange-500" />
                Почему это выгодно гостю и заведению?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                    Для вас (Гость):
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                    Больше бонусов за гибкость, никакого ожидания в очереди и
                    гарантированно свежеприготовленное блюдо.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                    Для ресторана (Бизнес):
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                    Сглаживание пика ланча, равномерная загрузка кухни и
                    предсказуемый объем заказов без аврала.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
