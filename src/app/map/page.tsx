"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  MapPin,
  ChevronDown,
  Zap,
  Clock,
  Coins,
  Map,
  LayoutGrid,
  ChevronUp,
  Utensils,
  Sandwich,
  Flame,
  Coffee,
  Pizza,
  Soup,
} from "lucide-react";
import { mockVenuesData, catalogCategories, Venue } from "@/data/mockVenues";
import VenueCard from "@/components/catalog/VenueCard";
import MenuModal from "@/components/catalog/MenuModal";
import ThemeToggle from "@/components/ThemeToggle";
import dynamic from "next/dynamic";

const renderCategoryIcon = (iconKey: string) => {
  switch (iconKey) {
    case "doner":
      return <Sandwich className="w-4 h-4 text-orange-500" />;
    case "burgers":
      return <Flame className="w-4 h-4 text-amber-500" />;
    case "coffee":
      return <Coffee className="w-4 h-4 text-amber-600 dark:text-amber-300" />;
    case "pizza":
      return <Pizza className="w-4 h-4 text-rose-500" />;
    case "asian":
      return <Soup className="w-4 h-4 text-red-500" />;
    default:
      return <Utensils className="w-4 h-4 text-orange-500" />;
  }
};

const RealAlmatyMap = dynamic(
  () => import("@/components/catalog/RealAlmatyMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[650px] rounded-3xl bg-slate-100 dark:bg-[#080A10] border border-slate-200 dark:border-white/10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-600 dark:text-gray-300">Загрузка настоящей карты Алматы...</span>
        </div>
      </div>
    ),
  }
);

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [userAddress, setUserAddress] = useState("Алматы, пр. Абая 44");

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter venues
  const filteredVenues = mockVenuesData.filter((venue) => {
    const matchesCategory =
      selectedCategory === "all" || venue.categorySlug === selectedCategory;

    const matchesSearch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      venue.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      !activeFilter ||
      (activeFilter === "fast" && (venue.prepTime.includes("10") || venue.prepTime.includes("5-12"))) ||
      (activeFilter === "takeaway" && true) ||
      (activeFilter === "bonuses" && venue.bonusAmount >= 200);

    return matchesCategory && matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090B11] text-slate-900 dark:text-gray-100 flex flex-col selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Desktop Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0A0D15]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left: Back button, QoS Logo, Address picker */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0"
              title="На главную"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/30">
                Q
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white hidden sm:inline tracking-tight">
                QoS
              </span>
            </Link>

            {/* Address Selector */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-gray-300 hover:border-orange-500/40 cursor-pointer transition-colors">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-semibold text-slate-900 dark:text-white">{userAddress}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-gray-400" />
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-slate-400 dark:text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск заведений или блюд (шаверма, донер, бургер, кофе...)"
                className="w-full bg-slate-100 dark:bg-[#141824] hover:bg-slate-200/60 dark:hover:bg-[#181D2D] focus:bg-white dark:focus:bg-[#181D2D] border border-slate-200 dark:border-white/10 focus:border-orange-500 rounded-2xl pl-11 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-xs text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white px-2 py-0.5 rounded-md bg-slate-200 dark:bg-white/10"
                >
                  Очистить
                </button>
              )}
            </div>
          </div>

          {/* Right: View Switcher (Grid / Map), ThemeToggle & B2B Link */}
          <div className="flex items-center gap-2.5 shrink-0 justify-end">
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-orange-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Каталог</span>
              </button>

              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === "map"
                    ? "bg-orange-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">На карте</span>
              </button>
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            <Link
              href="/business"
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-200 hover:text-slate-900 dark:hover:text-white transition-colors hidden sm:inline-block"
            >
              Бизнесу
            </Link>
          </div>

        </div>

        {/* Filter Chips Strip */}
        <div className="border-t border-slate-200 dark:border-white/5 py-2.5 bg-slate-50/80 dark:bg-[#0C0F17]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2.5 overflow-x-auto scrollbar-none text-xs font-semibold">
            {/* Filter: Самовывоз */}
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "takeaway" ? null : "takeaway")
              }
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                activeFilter === "takeaway"
                  ? "bg-orange-600 border-orange-500 text-white shadow-md shadow-orange-600/30"
                  : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white shadow-sm dark:shadow-none"
              }`}
            >
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Самовывоз</span>
            </button>

            {/* Filter: До 15 мин */}
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "fast" ? null : "fast")
              }
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                activeFilter === "fast"
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/30"
                  : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white shadow-sm dark:shadow-none"
              }`}
            >
              <Clock className="w-3 h-3 text-emerald-500" />
              <span>До 15 мин</span>
            </button>

            {/* Filter: С бонусами */}
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "bonuses" ? null : "bonuses")
              }
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                activeFilter === "bonuses"
                  ? "bg-amber-600 border-amber-500 text-white shadow-md shadow-amber-600/30"
                  : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white shadow-sm dark:shadow-none"
              }`}
            >
              <Coins className="w-3 h-3 text-amber-500" />
              <span>С бонусами QoS</span>
            </button>

            {activeFilter && (
              <button
                onClick={() => setActiveFilter(null)}
                className="text-xs text-orange-600 dark:text-orange-400 hover:underline ml-2 whitespace-nowrap"
              >
                Сбросить
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        
        {/* Category Selector Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {catalogCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 border ${
                  selectedCategory === cat.slug
                    ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white border-transparent shadow-lg shadow-orange-600/25 scale-[1.02]"
                    : "bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-700 dark:text-gray-300 border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white shadow-sm dark:shadow-none"
                }`}
              >
                <span className="flex items-center">{renderCategoryIcon(cat.iconKey)}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* View Mode */}
        {viewMode === "grid" ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {selectedCategory === "all"
                    ? "Все заведения с предзаказом"
                    : catalogCategories.find((c) => c.slug === selectedCategory)?.name}
                </h1>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                  Найдено: <strong className="text-slate-900 dark:text-white">{filteredVenues.length}</strong> заведений • Заказ без очереди
                </p>
              </div>
            </div>

            {filteredVenues.length === 0 ? (
              <div className="text-center py-20 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-8 shadow-sm">
                <p className="text-base font-bold text-slate-900 dark:text-white mb-2">Ничего не найдено</p>
                <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm mx-auto mb-4">
                  Попробуйте изменить запрос или сбросить активные фильтры.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setActiveFilter(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-600/30"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredVenues.map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    onSelect={(v) => setSelectedVenue(v)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Real Almaty Interactive Map */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Настоящая интерактивная карта Алматы
                </h2>
                <p className="text-xs text-slate-500 dark:text-gray-400">
                  Все партнерские заведения и бренды на реальных улицах Алматы. Нажмите на любой маркер для предзаказа.
                </p>
              </div>
              <span className="text-xs text-orange-600 dark:text-orange-400 font-bold font-mono">
                {filteredVenues.length} заведений в Алматы
              </span>
            </div>

            <RealAlmatyMap
              venues={filteredVenues}
              selectedVenue={selectedVenue}
              onSelectVenue={(v) => setSelectedVenue(v)}
            />
          </div>
        )}

      </main>

      {/* Floating Scroll To Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs shadow-2xl hover:scale-105 transition-all flex items-center gap-1.5 border border-slate-700 dark:border-gray-200 animate-in slide-in-from-bottom-3"
        >
          <ChevronUp className="w-4 h-4" />
          <span>Вверх</span>
        </button>
      )}

      {/* Menu Modal */}
      <MenuModal
        venue={selectedVenue}
        onClose={() => setSelectedVenue(null)}
      />

    </div>
  );
}
