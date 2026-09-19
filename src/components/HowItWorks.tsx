"use client";

import React from "react";
import { MapPin, Clock, Zap, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Выбери заведение",
    desc: "Открой карту QoS в один клик. Выбирай проверенные рестораны, кофейни и fast food рядом с тобой. Меню и цены — 1:1 как у кассы заведения, без скрытых наценок.",
    icon: MapPin,
    accent: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/30",
    iconColor: "text-orange-500 dark:text-orange-400",
    tag: "Карта & Меню",
  },
  {
    number: "02",
    title: "Выбери время",
    desc: "Выбирай удобный временной слот самовывоза. Умная система QoS распределяет нагрузку на кухню: чем свободнее слот, тем больше бонусов начисляется на твой счет.",
    icon: Clock,
    accent: "from-amber-500/20 to-yellow-500/10",
    border: "border-amber-500/30",
    iconColor: "text-amber-500 dark:text-amber-400",
    tag: "Умный слот",
  },
  {
    number: "03",
    title: "Забери без очереди",
    desc: "Приходи точно в выбранный интервал. Заказ уже приготовлен и ждет тебя на экспресс-стойке QoS. Назови 3-значный pickup-код и забери пакет за 5 секунд.",
    icon: Zap,
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    tag: "Экспресс-пикап",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 relative bg-slate-50/70 dark:bg-[#090B11] border-t border-slate-200/80 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-4">
            Прозрачный и быстрый процесс
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Как работает QoS в{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400">
              3 простых шага
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-gray-400">
            Никаких очередей перед кассой и томительного ожидания повара. От оформления до готового блюда — считанные минуты.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-emerald-500/30 -translate-y-8 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative z-10 glass-panel glass-panel-hover rounded-2xl p-7 sm:p-8 flex flex-col justify-between border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121622]/80 shadow-md hover:shadow-xl dark:shadow-none group"
              >
                <div>
                  {/* Top bar with Step Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black tracking-tighter text-slate-300 dark:text-white/20 group-hover:text-orange-500/40 dark:group-hover:text-orange-400/40 transition-colors font-mono">
                      {step.number}
                    </span>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} ${step.border} border flex items-center justify-center ${step.iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Tag */}
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-gray-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md mb-3 border border-slate-200 dark:border-white/5">
                    {step.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-gray-300/90 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Step indicator footer */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
                  <span>Шаг {idx + 1} из 3</span>
                  {idx === 1 ? (
                    <a
                      href="#smart-slots"
                      className="text-orange-600 dark:text-orange-400 flex items-center gap-1 font-semibold hover:underline"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Смотреть слоты
                    </a>
                  ) : (
                    <span className="text-slate-600 dark:text-white/60 group-hover:text-orange-600 dark:group-hover:text-orange-400 flex items-center gap-1 transition-colors font-semibold">
                      Далее <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action bar below steps */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/map"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-600/25 hover:shadow-orange-600/40 hover:scale-[1.02] transition-all group"
          >
            <span>Попробовать предзаказ</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#smart-slots"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-orange-500/40 text-sm font-semibold text-slate-800 dark:text-white transition-all group shadow-sm"
          >
            <span>Как работают слоты и бонусы?</span>
          </a>
        </div>

      </div>
    </section>
  );
}
