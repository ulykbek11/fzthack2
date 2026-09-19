import React from "react";
import Link from "next/link";
import { UtensilsCrossed, Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#07080D] border-t border-slate-200 dark:border-white/5 py-12 text-sm text-slate-500 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center text-white font-black text-base shadow-md">
                Q
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">QoS</span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm leading-relaxed">
              QoS — современная платформа предзаказа еды. Заказывайте заранее в кафе, ресторанах и точках фастфуда без очередей, без наценок и с бонусами за каждый предзаказ.
            </p>
            <div className="text-xs text-slate-500 dark:text-gray-400">
              Создано для Физтех Хакатона • 2026
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Клиентам
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/map" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Карта заведений
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Как работает сервис
                </a>
              </li>
              <li>
                <a href="#smart-slots" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Умные слоты и бонусы
                </a>
              </li>
              <li>
                <a href="#user-benefits" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Бонусы и экономия
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: For Business */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Для бизнеса
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/business" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Подключить заведение
                </Link>
              </li>
              <li>
                <a href="#business-benefits" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Возможности Dashboard
                </a>
              </li>
              <li>
                <Link href="/business" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Вход для партнеров
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} QoS Platform. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <span>Закажи заранее • Забери без очереди • Получи бонусы</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
