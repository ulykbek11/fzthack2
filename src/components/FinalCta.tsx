"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Store, Sparkles, UtensilsCrossed, ShieldCheck, Coins, Zap } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="py-20 md:py-28 relative bg-slate-50/70 dark:bg-[#090B11] border-t border-slate-200/80 dark:border-white/5 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-orange-600/20 via-amber-600/20 to-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-white to-slate-50/90 dark:from-white/[0.08] dark:to-white/[0.02] border border-slate-200 dark:border-white/15 p-8 sm:p-12 md:p-16 text-center backdrop-blur-2xl shadow-xl dark:shadow-2xl relative overflow-hidden">
          
          {/* Subtle top brand light beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-bold text-orange-600 dark:text-orange-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Забудьте про ожидание в очереди</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6 max-w-3xl mx-auto">
            Закажи заранее. Забери без очереди.{" "}
            <span className="text-gradient-fire">Получи бонусы.</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Открой карту QoS, выбери свободный временной слот и получи до +100 бонусов. Твой горячий заказ будет ждать тебя на стойке выдачи.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <Link
              href="/map"
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-base shadow-xl shadow-orange-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span>Найти заведение</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/business"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
            >
              <Store className="w-5 h-5 text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform" />
              <span>Подключить бизнес</span>
            </Link>
          </div>

          {/* Value Badges Footer */}
          <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-gray-300">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>0 ₸ наценка платформы</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>Экспресс-пикап за 5 секунд</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Coins className="w-4 h-4 text-amber-500" />
              <span>1 бонус = 1 ₸ на баланс</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
