"use client";

import React from "react";
import { Zap, Users, Tag, Gift, Check, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: Zap,
    title: "В разы быстрее",
    highlight: "Экономия 15–20 минут в обед",
    description:
      "Заказ начинает готовиться заблаговременно под выбранный временной слот. Тебе больше не нужно тратить обеденный перерыв на ожидание повара.",
    badge: "0 минут ожидания",
    color: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20",
  },
  {
    icon: Users,
    title: "Без очередей",
    highlight: "Экспресс-стойка выдачи",
    description:
      "Никаких длинных хвостов перед кассой в пиковые часы. В партнерских заведениях QoS заказы выдаются без общей очереди за 5 секунд по короткому коду.",
    badge: "Без толпы у кассы",
    color: "from-orange-500 to-rose-500",
    iconBg: "bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/20",
  },
  {
    icon: Tag,
    title: "Без наценки платформы",
    highlight: "Честная цена заведения",
    description:
      "QoS принципиально не завышает стоимость позиций и не берет плату за выдачу. Ты платишь ровно столько, сколько указано на табло или в чеке заведения.",
    badge: "0 ₸ сервисный сбор",
    color: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    icon: Gift,
    title: "Бонусы за каждый предзаказ",
    highlight: "1 бонус = 1 ₸ на баланс",
    description:
      "Выбирай свободные временные слоты и получай до +100 бонусов за заказ. Бонусы начисляются по номеру телефона без сложных регистраций и пластиковых карт.",
    badge: "До +100 бонусов",
    color: "from-yellow-400 to-amber-500",
    iconBg: "bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border-yellow-400/20",
  },
  {
    icon: Clock,
    title: "Понятное точное время",
    highlight: "Прозрачный статус и тайминг",
    description:
      "Ты всегда знаешь точный интервал, когда блюдо будет горячим и свежим. Никаких «подождите еще 10 минут» — идеальная пунктуальность.",
    badge: "Точный слот",
    color: "from-blue-500 to-indigo-500",
    iconBg: "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
  },
];

export default function UserBenefits() {
  return (
    <section
      id="user-benefits"
      className="py-20 md:py-28 relative bg-white dark:bg-[#0B0E17] border-t border-slate-200/80 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-4">
              Ценность для пользователей
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Почему клиенты выбирают{" "}
              <span className="text-gradient-fire">QoS</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-gray-300">
              Быстрее, дешевле доставки и без утомительного ожидания у кассы. Ешь любимую еду вовремя и копи баллы.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-600/25 transition-all"
            >
              <span>Открыть карту заведений</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#121622]/80 shadow-sm hover:shadow-md dark:shadow-none relative overflow-hidden group"
              >
                {/* Background ambient corner tint */}
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${item.color} opacity-10 blur-2xl rounded-full group-hover:opacity-25 transition-opacity`}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl border ${item.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400/90 mb-3">
                    {item.highlight}
                  </p>

                  <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/80 dark:border-white/5 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Стандарт сервиса QoS</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bonus Guarantee Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50/70 to-orange-100/60 dark:from-orange-950/40 dark:via-amber-950/30 dark:to-zinc-900/60 border border-orange-200 dark:border-orange-500/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0 mx-auto sm:mx-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Гарантия честной цены заведения
              </h4>
              <p className="text-sm text-slate-700 dark:text-gray-300 max-w-xl">
                QoS — это не агрегатор с накрутками. Цена чашки кофе или горячего ланча в приложении равна 1:1 цене в чеке у кассира. Никаких сервисных сборов.
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right shrink-0">
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400 block font-mono">
              0 ₸ НАЦЕНКИ
            </span>
            <span className="text-xs text-slate-500 dark:text-gray-400">для пользователей платформы</span>
          </div>
        </div>

      </div>
    </section>
  );
}
