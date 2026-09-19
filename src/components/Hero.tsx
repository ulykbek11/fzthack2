"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Coins,
  Store,
  CheckCircle2,
  Coffee,
  Zap,
  ChevronRight,
  MapPin,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden hero-glow-bg noise-overlay">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-500/20 via-amber-500/15 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand, Headline, Subheadline, CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* QoS Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 backdrop-blur-md mb-6 hover:border-orange-500/40 transition-colors shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-gray-200 tracking-wide">
                Платформа предзаказа еды нового поколения
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                0% наценки
              </span>
            </div>

            {/* Prominent QoS Brand Logo */}
            <div className="mb-4">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white inline-flex items-baseline">
                Q<span className="text-gradient-fire">o</span>S
                <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-500 ml-1 mb-1"></span>
              </span>
            </div>

            {/* Main Headline (Exact offer) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
              Закажи заранее.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-400 dark:via-amber-300 dark:to-yellow-400">
                Забери без очереди.
              </span>{" "}
              Получи бонусы.
            </h1>

            {/* Short Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              Платформа предзаказа еды для кафе, ресторанов, кофеен и fast food.
              Выбирай блюда по честным ценам заведения, забирай в назначенный
              слот без ожидания и копи бонусы.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/map"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-base shadow-xl shadow-orange-600/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Найти заведение</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/business"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 hover:border-orange-500/40 text-slate-800 dark:text-gray-200 hover:text-slate-950 dark:hover:text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
              >
                <Store className="w-5 h-5 text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                <span>Подключить бизнес</span>
              </Link>
            </div>

            {/* Micro value badges */}
            <div className="grid grid-cols-3 gap-3 pt-8 mt-8 border-t border-slate-200 dark:border-white/10 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">0 ₸</span>
                <span className="text-xs text-slate-500 dark:text-gray-400">Наценка сервиса</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">0 минут</span>
                <span className="text-xs text-slate-500 dark:text-gray-400">В очереди у кассы</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">до +100</span>
                <span className="text-xs text-slate-500 dark:text-gray-400">Бонусов за слот</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Food-Tech Interactive Ticket Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md relative">
              {/* Decorative aura */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-500/30 to-amber-500/20 blur-xl opacity-75 animate-pulse-slow pointer-events-none" />

              {/* Main Ticket Glass Card */}
              <div className="relative glass-panel rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl bg-white/90 dark:bg-[#121622]/80 backdrop-blur-xl">
                {/* Header of Mockup Card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-orange-500/15 dark:bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-500 dark:text-orange-400">
                      <Coffee className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Roast & Crust Cafe</h2>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/30">
                          QoS Partner
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-gray-400">ул. Абая 44 • 350 м от вас</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10">
                    #QOS-4089
                  </span>
                </div>

                {/* Status bar */}
                <div className="my-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-bounce" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Заказ приготовлен!</p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-300/80">Ожидает на экспресс-стойке QoS</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-gray-400 block">Pickup-код</span>
                    <span className="text-sm font-mono font-black text-emerald-600 dark:text-emerald-400 tracking-wider">#782</span>
                  </div>
                </div>

                {/* Items in Mockup */}
                <div className="space-y-2.5 py-2">
                  <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-white/[0.03]">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-gray-200">
                      <span className="w-5 h-5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-300 flex items-center justify-center text-[10px] font-bold">1×</span>
                      <span className="font-medium">Флэт Уайт на овсяном (350 мл)</span>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white">1 450 ₸</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-white/[0.03]">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-gray-200">
                      <span className="w-5 h-5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-300 flex items-center justify-center text-[10px] font-bold">1×</span>
                      <span className="font-medium">Круассан миндальный свежий</span>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white">1 200 ₸</span>
                  </div>
                </div>

                {/* Summary details */}
                <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-gray-400">
                    <span>Цена в заведении:</span>
                    <span className="text-slate-900 dark:text-white font-medium">2 650 ₸</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Наценка QoS платформы:
                    </span>
                    <span>0 ₸ (без переплат)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-amber-700 dark:text-amber-400 font-medium bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
                    <span className="flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5" /> Начислено за умный слот:
                    </span>
                    <span className="font-bold">+100 QoS бонусов</span>
                  </div>
                </div>

                {/* Floating Fast Pickup Card badge */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
                    Выбранный слот: <strong className="text-slate-900 dark:text-white">13:20–13:30</strong>
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Без ожидания</span>
                </div>
              </div>

              {/* Floating pill badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-4 glass-panel rounded-xl px-4 py-2.5 border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#121622]/90 shadow-xl items-center gap-3 animate-float">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black font-bold">
                  <Zap className="w-4 h-4 text-black fill-current" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">0 секунд на кассе</div>
                  <div className="text-[10px] text-slate-500 dark:text-gray-400">Подошел к стойке — назвал код — забрал</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
