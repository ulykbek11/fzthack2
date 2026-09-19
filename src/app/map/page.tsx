"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Clock3,
  Heart,
  Home,
  ListFilter,
  Map,
  MapPin,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { catalogCategories, mockVenuesData, Venue } from "@/data/mockVenues";
import VenueCard from "@/components/catalog/VenueCard";
import MenuModal from "@/components/catalog/MenuModal";
import MiniOrderTracker from "@/components/orders/MiniOrderTracker";
import { BUSINESS_DATA_EVENT, getRegisteredVenues } from "@/lib/businessStore";

const RealAlmatyMap = dynamic(() => import("@/components/catalog/RealAlmatyMap"), {
  ssr: false,
  loading: () => <div className="h-[68vh] animate-pulse rounded-3xl bg-[#f2f2f2]" />,
});

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [bonusesOnly, setBonusesOnly] = useState(false);
  const [fastOnly, setFastOnly] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [registeredVenues, setRegisteredVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const refreshVenues = () => setRegisteredVenues(getRegisteredVenues());
    refreshVenues();
    window.addEventListener(BUSINESS_DATA_EVENT, refreshVenues);
    window.addEventListener("storage", refreshVenues);
    return () => {
      window.removeEventListener(BUSINESS_DATA_EVENT, refreshVenues);
      window.removeEventListener("storage", refreshVenues);
    };
  }, []);

  const allVenues = useMemo(() => [...registeredVenues, ...mockVenuesData], [registeredVenues]);

  const venues = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = allVenues.filter((venue) => {
      const matchesQuery = !normalizedQuery ||
        venue.name.toLowerCase().includes(normalizedQuery) ||
        venue.address.toLowerCase().includes(normalizedQuery) ||
        venue.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      const matchesCategory = category === "all" || venue.categorySlug === category;
      const matchesBonus = !bonusesOnly || Boolean(venue.bonusWindow);
      const matchesFast = !fastOnly || Number.parseInt(venue.prepTime, 10) <= 15;
      return matchesQuery && matchesCategory && matchesBonus && matchesFast;
    });

    return result;
  }, [allVenues, query, category, bonusesOnly, fastOnly]);

  return (
    <div className="min-h-screen bg-white pb-20 text-[#202124] md:pb-0">
      <header className="sticky top-0 z-40 border-b border-[#ededed] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="QoS — главная">
            <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#ffc244] text-xl font-black text-[#173f35]">Q</span>
            <span className="hidden text-2xl font-black tracking-[-0.05em] text-[#173f35] sm:inline">QoS</span>
          </Link>

          <button className="hidden min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-[#f6f6f6] lg:flex">
            <MapPin className="h-5 w-5 shrink-0 text-[#00a082]" />
            <span className="min-w-0">
              <span className="block text-[11px] text-[#777]">Ваш адрес</span>
              <span className="block max-w-44 truncate text-sm font-bold">Алматы, проспект Абая</span>
            </span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </button>

          <div className="relative mx-auto w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#626262]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Найти заведение или блюдо"
              className="h-12 w-full rounded-2xl border border-transparent bg-[#f4f4f4] pl-12 pr-11 text-[15px] outline-none transition placeholder:text-[#858585] focus:border-[#00a082] focus:bg-white focus:ring-4 focus:ring-[#00a082]/10"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-[#e8e8e8]" aria-label="Очистить поиск">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Link href="/orders" className="hidden h-11 items-center gap-2 rounded-xl bg-[#e9f8f5] px-4 text-sm font-extrabold text-[#007e68] sm:flex">
            <ShoppingBag className="h-4 w-4" /> Мои заказы
          </Link>
        </div>

        <div className="border-t border-[#f3f3f3]">
          <div className="scrollbar-none mx-auto flex max-w-[1500px] items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
            <button
              onClick={() => setBonusesOnly((value) => !value)}
              className={`filter-chip ${bonusesOnly ? "filter-chip-active" : ""}`}
            >
              <Sparkles className="h-4 w-4" /> Бонусы
            </button>
            <button onClick={() => setFastOnly((value) => !value)} className={`filter-chip ${fastOnly ? "filter-chip-active" : ""}`}>
              <Clock3 className="h-4 w-4" /> До 15 минут
            </button>
            <div className="relative">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="filter-chip appearance-none pr-9 outline-none"
                aria-label="Тип кухни"
              >
                {catalogCategories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
            <button onClick={() => setMapOpen((value) => !value)} className={`filter-chip ml-auto ${mapOpen ? "filter-chip-active" : ""}`}>
              <Map className="h-4 w-4" /> {mapOpen ? "Список" : "Карта"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        {mapOpen ? (
          <RealAlmatyMap venues={venues} selectedVenue={selectedVenue} onSelectVenue={setSelectedVenue} />
        ) : (
          <>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-[-0.035em] sm:text-[30px]">Рядом с вами</h2>
                <p className="mt-1 text-sm text-[#737373]">{venues.length} заведений · партнёры QoS и данные 2ГИС</p>
              </div>
              <ListFilter className="hidden h-5 w-5 text-[#666] sm:block" />
            </div>

            {venues.length ? (
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {venues.map((venue) => <VenueCard key={venue.id} venue={venue} onSelect={setSelectedVenue} />)}
              </div>
            ) : (
              <div className="rounded-3xl bg-[#f7f7f7] px-5 py-20 text-center">
                <Search className="mx-auto h-8 w-8 text-[#999]" />
                <h3 className="mt-4 text-xl font-black">Ничего не нашли</h3>
                <p className="mt-1 text-sm text-[#777]">Попробуйте другой запрос или сбросьте фильтры.</p>
                <button onClick={() => { setQuery(""); setCategory("all"); setBonusesOnly(false); setFastOnly(false); }} className="mt-5 rounded-xl bg-[#00a082] px-5 py-3 text-sm font-bold text-white">Сбросить фильтры</button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-[#eeeeee] bg-[#fafafa]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-8 text-sm text-[#777] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 QoS · Предзаказ без очередей</p>
          <div className="flex items-center gap-5">
            <span>Алматы</span>
            <Link href="/business" className="transition hover:text-[#007e68]">QoS для заведений</Link>
          </div>
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-[#e8e8e8] bg-white px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 md:hidden">
        <button className="mobile-nav-item text-[#007e68]"><Home className="h-5 w-5 fill-[#ffc244] text-[#173f35]" /><span>Главная</span></button>
        <button onClick={() => document.querySelector("input")?.focus()} className="mobile-nav-item"><Search className="h-5 w-5" /><span>Поиск</span></button>
        <Link href="/orders" className="mobile-nav-item"><ShoppingBag className="h-5 w-5" /><span>Заказы</span></Link>
        <button className="mobile-nav-item"><Heart className="h-5 w-5" /><span>Избранное</span></button>
      </nav>

      <MenuModal venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
      <MiniOrderTracker />
    </div>
  );
}
