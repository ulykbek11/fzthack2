"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed, Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#090B11]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-3 shadow-md dark:shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200">
            Q
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              QoS
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </span>
            <span className="text-[10px] tracking-wider uppercase text-orange-600 dark:text-orange-400/90 font-semibold -mt-1">
              Food Preorder
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-gray-300">
          <a
            href="#how-it-works"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
          >
            Как это работает
          </a>
          <a
            href="#smart-slots"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5"
          >
            <span>Умные слоты</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/25">
              Бонусы
            </span>
          </a>
          <a
            href="#user-benefits"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
          >
            Для гостей
          </a>
          <a
            href="#business-benefits"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5"
          >
            Для бизнеса
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20 dark:border-orange-500/30">
              B2B
            </span>
          </a>
          <Link
            href="/map"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5 font-semibold text-orange-600 dark:text-orange-400"
          >
            <UtensilsCrossed className="w-4 h-4" />
            Карта заведений
          </Link>
        </nav>

        {/* Action CTAs & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          <Link
            href="/business"
            className="text-xs font-semibold text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all duration-200 bg-slate-50 dark:bg-transparent"
          >
            Подключить бизнес
          </Link>
          <Link
            href="/map"
            className="relative group overflow-hidden text-xs font-bold text-white px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-md shadow-orange-600/30 transition-all duration-200 flex items-center gap-1.5"
          >
            <span>Найти заведение</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Link
            href="/map"
            className="text-xs font-bold text-white px-3 py-1.5 rounded-lg bg-orange-600 shadow-sm"
          >
            Найти еду
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
            aria-label="Переключить меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0F131C] border-b border-slate-200 dark:border-white/10 px-4 py-5 mt-2 space-y-4 shadow-2xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 text-base font-medium">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white py-1"
            >
              Как это работает
            </a>
            <a
              href="#smart-slots"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white py-1 flex items-center justify-between"
            >
              <span>Умные слоты</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold">
                Бонусы
              </span>
            </a>
            <a
              href="#user-benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white py-1"
            >
              Для гостей
            </a>
            <a
              href="#business-benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white py-1 flex items-center justify-between"
            >
              Для бизнеса
              <span className="text-xs px-2 py-0.5 rounded bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
                B2B
              </span>
            </a>
            <Link
              href="/map"
              onClick={() => setMobileMenuOpen(false)}
              className="text-orange-600 dark:text-orange-400 font-semibold py-1 flex items-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Карта заведений
            </Link>
          </nav>
          <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
            <Link
              href="/map"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-sm"
            >
              Найти заведение
            </Link>
            <Link
              href="/business"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-gray-200 font-semibold text-sm"
            >
              Подключить бизнес
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
