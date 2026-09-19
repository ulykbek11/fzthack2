"use client";

import React from "react";
import { ArrowRight, Sparkles, CheckCircle2, XCircle, Zap } from "lucide-react";
import Link from "next/link";

export default function QuoteBanner() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-slate-100/70 dark:bg-[#07090F] border-t border-slate-200/80 dark:border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-r from-orange-500/15 via-amber-500/15 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Quote Card */}
        <div className="rounded-3xl p-8 sm:p-12 md:p-14 bg-gradient-to-b from-white to-slate-50 dark:from-[#111520] dark:to-[#0A0D15] border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl relative overflow-hidden text-center">
          
          {/* Subtle top brand beam */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-xs font-bold text-orange-600 dark:text-orange-400 mb-6 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Миссия сервиса</span>
          </div>

          {/* Key Quote / Headline */}
          <blockquote className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.2] max-w-4xl mx-auto mb-6">
            «QoS превращает очередь в{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400">
              управляемый поток
            </span>{" "}
            заказов.»
          </blockquote>

          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Вместо столпотворений у кассы и потерянных гостей — равномерное
            распределение спроса, спокойная работа кухни и довольные клиенты с
            бонусами на балансе.
          </p>

          {/* Side-by-side Visual Transformation Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left mb-8">
            
            {/* Old Way */}
            <div className="p-4 sm:p-5 rounded-2xl bg-red-50/70 dark:bg-red-950/15 border border-red-200 dark:border-red-500/20 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-500/15 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                <XCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
                  Обычная реальность
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 leading-snug">
                  15–20 минут ожидания в толпе, остывшая еда, нервные кассиры и
                  до 30% ушедших гостей в обеденный час-пик.
                </p>
              </div>
            </div>

            {/* QoS Way */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                  С платформой QoS
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 leading-snug">
                  0 секунд на кассе, блюдо готово ровно к твоему приходу, а на баланс
                  начислены до +100 бонусов.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom inline action */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              Динамическое ценообразование бонусов
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Без наценок агрегаторов</span>
            <span className="hidden sm:inline">•</span>
            <span>Партнерская сеть по всему городу</span>
          </div>

        </div>

      </div>
    </section>
  );
}
