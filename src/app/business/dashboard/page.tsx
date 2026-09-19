"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  CheckCircle2,
  ChefHat,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  LayoutDashboard,
  ListChecks,
  PackageCheck,
  PauseCircle,
  PlayCircle,
  Plus,
  Settings,
  ShoppingBag,
  Store,
  Timer,
  Trash2,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";
import { MenuItem } from "@/data/mockVenues";
import {
  BUSINESS_DATA_EVENT,
  BUSINESS_ORDER_EVENT,
  BusinessOrder,
  BusinessOrderStatus,
  BusinessProfile,
  createVenueMenuItem,
  deleteBusinessProfile,
  getBusinessProfiles,
  getBusinessOrders,
  getBusinessProfile,
  setActiveBusinessVenue,
  updateBusinessOrderStatus,
  updateBusinessProfile,
} from "@/lib/businessStore";

type DashboardView = "overview" | "orders" | "load" | "analytics" | "menu" | "venue";

const navigation: Array<{ id: DashboardView; label: string; icon: typeof LayoutDashboard }> = [
  { id: "overview", label: "Обзор", icon: LayoutDashboard },
  { id: "orders", label: "Заказы", icon: ShoppingBag },
  { id: "load", label: "Загрузка", icon: Clock3 },
  { id: "analytics", label: "Аналитика", icon: BarChart3 },
  { id: "menu", label: "Меню", icon: UtensilsCrossed },
  { id: "venue", label: "Заведение", icon: Settings },
];

const statusMeta: Record<BusinessOrderStatus, { label: string; className: string }> = {
  NEW: { label: "Новый", className: "bg-[#fff5d6] text-[#725700]" },
  PREPARING: { label: "Готовится", className: "bg-[#e8f2ff] text-[#1f5eaa]" },
  READY: { label: "Готово", className: "bg-[#e9f8f5] text-[#007e68]" },
  PICKED_UP: { label: "Выдано", className: "bg-[#f0f0f0] text-[#666]" },
  CANCELLED: { label: "Отменено", className: "bg-[#fff0f3] text-[#bd2041]" },
};

export default function BusinessDashboardPage() {
  const router = useRouter();
  const [view, setView] = useState<DashboardView>("overview");
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [profiles, setProfiles] = useState<BusinessProfile[]>([]);
  const [orders, setOrders] = useState<BusinessOrder[]>([]);
  const [toast, setToast] = useState("");

  const refresh = useCallback(() => {
    const nextProfile = getBusinessProfile();
    setProfiles(getBusinessProfiles());
    setProfile(nextProfile);
    setOrders(nextProfile ? getBusinessOrders(nextProfile.venue.id) : []);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(BUSINESS_DATA_EVENT, refresh);
    window.addEventListener(BUSINESS_ORDER_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(BUSINESS_DATA_EVENT, refresh);
      window.removeEventListener(BUSINESS_ORDER_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  if (!profile) {
    return <div className="grid min-h-screen place-items-center bg-[#f7f7f7] px-4"><div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-sm"><Store className="mx-auto h-10 w-10 text-[#00a082]" /><h1 className="mt-4 text-2xl font-black">Сначала создайте заведение</h1><p className="mt-2 text-sm text-[#777]">Заполните короткую форму — публикация происходит сразу.</p><Link href="/business" className="mt-5 inline-flex rounded-xl bg-[#00a082] px-5 py-3 text-sm font-bold text-white">Создать заведение</Link></div></div>;
  }

  const changeStatus = (orderId: string, status: BusinessOrderStatus) => {
    updateBusinessOrderStatus(orderId, status);
    notify(`Статус заказа изменён: ${statusMeta[status].label}`);
  };

  const toggleOrders = () => {
    const next = updateBusinessProfile(profile.venue.id, (current) => ({ ...current, acceptsOrders: !current.acceptsOrders }));
    if (next) setProfile(next);
    notify(next?.acceptsOrders ? "Приём заказов включён" : "Приём заказов приостановлен");
  };

  const activeOrders = orders.filter((order) => !["PICKED_UP", "CANCELLED"].includes(order.status));
  const newOrders = orders.filter((order) => order.status === "NEW").length;

  const switchBranch = (venueId: string) => {
    setActiveBusinessVenue(venueId);
    refresh();
    notify("Активный филиал изменён");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#202124]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[#e8e8e8] bg-white lg:flex">
        <div className="flex items-center gap-3 border-b border-[#eeeeee] p-5"><span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#ffc244] text-xl font-black text-[#173f35]">Q</span><div><p className="font-black text-[#173f35]">QoS Business</p><p className="max-w-40 truncate text-xs text-[#777]">{profile.venue.name}</p></div></div>
        <nav className="flex-1 space-y-1 p-3">{navigation.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setView(item.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${view === item.id ? "bg-[#e9f8f5] text-[#007e68]" : "text-[#626262] hover:bg-[#f5f5f5]"}`}><Icon className="h-5 w-5" /> {item.label}{item.id === "orders" && newOrders > 0 && <span className="ml-auto rounded-full bg-[#ff2d55] px-2 py-0.5 text-[10px] text-white">{newOrders}</span>}</button>; })}</nav>
        <div className="border-t border-[#eeeeee] p-4"><Link href="/" className="flex items-center justify-center gap-2 rounded-xl bg-[#f3f3f3] px-3 py-3 text-sm font-bold">Открыть каталог <ExternalLink className="h-4 w-4" /></Link></div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-[#e8e8e8] bg-white/95 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e9f8f5] text-[#007e68]"><Store className="h-5 w-5" /></div><div className="min-w-0">{profiles.length > 1 ? <select value={profile.venue.id} onChange={(event) => switchBranch(event.target.value)} className="max-w-52 bg-transparent font-black outline-none sm:max-w-72">{profiles.map((item) => <option key={item.venue.id} value={item.venue.id}>{item.venue.name}</option>)}</select> : <p className="truncate font-black">{profile.venue.name}</p>}<p className="truncate text-xs text-[#777]">{profile.venue.address}</p></div></div>
            <div className="flex items-center gap-2"><button onClick={toggleOrders} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold ${profile.acceptsOrders ? "bg-[#e9f8f5] text-[#007e68]" : "bg-[#fff0f3] text-[#bd2041]"}`}>{profile.acceptsOrders ? <PlayCircle className="h-4 w-4" /> : <PauseCircle className="h-4 w-4" />}{profile.acceptsOrders ? "Заказы включены" : "Заказы на паузе"}</button><Bell className="h-5 w-5 text-[#777]" /></div>
          </div>
          <nav className="scrollbar-none flex gap-1 overflow-x-auto px-3 pb-2 lg:hidden">{navigation.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setView(item.id)} className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold ${view === item.id ? "bg-[#e9f8f5] text-[#007e68]" : "text-[#777]"}`}><Icon className="h-4 w-4" /> {item.label}</button>; })}</nav>
        </header>

        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          {view === "overview" && <Overview profile={profile} orders={orders} activeOrders={activeOrders} newOrders={newOrders} onOpenOrders={() => setView("orders")} onChangeStatus={changeStatus} />}
          {view === "orders" && <OrdersView orders={orders} onChangeStatus={changeStatus} />}
          {view === "load" && <LoadView orders={orders} />}
          {view === "analytics" && <AnalyticsView orders={orders} />}
          {view === "menu" && <MenuView profile={profile} onProfileChange={(next) => { setProfile(next); notify("Меню обновлено в каталоге"); }} />}
          {view === "venue" && <VenueView key={profile.venue.id} profile={profile} onProfileChange={(next) => { setProfile(next); notify("Данные заведения сохранены"); }} onCreateBranch={() => router.push("/business?branch=1")} onDelete={() => { const nextProfile = deleteBusinessProfile(profile.venue.id); if (nextProfile) { setProfile(nextProfile); setOrders(getBusinessOrders(nextProfile.venue.id)); notify("Филиал удалён"); } else router.push("/business"); }} />}
        </main>
      </div>

      {toast && <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#173f35] px-4 py-3 text-sm font-bold text-white shadow-xl"><CheckCircle2 className="h-4 w-4 text-[#6ad9c2]" /> {toast}</div>}
    </div>
  );
}

function Overview({ profile, orders, activeOrders, newOrders, onOpenOrders, onChangeStatus }: { profile: BusinessProfile; orders: BusinessOrder[]; activeOrders: BusinessOrder[]; newOrders: number; onOpenOrders: () => void; onChangeStatus: (id: string, status: BusinessOrderStatus) => void }) {
  const todayOrders = today(orders);
  const revenue = todayOrders.filter((order) => order.status !== "CANCELLED").reduce((sum, order) => sum + order.totalAmount, 0);
  const ready = orders.filter((order) => order.status === "READY").length;
  return <div><PageTitle title="Обзор" subtitle="Текущая работа заведения и ближайшие заказы" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={ListChecks} label="Новые" value={newOrders} accent="#ff2d55" /><Metric icon={ChefHat} label="Готовятся" value={orders.filter((order) => order.status === "PREPARING").length} accent="#377dcc" /><Metric icon={PackageCheck} label="Готовы к выдаче" value={ready} accent="#00a082" /><Metric icon={CircleDollarSign} label="Сумма сегодня" value={`${revenue.toLocaleString()} ₸`} accent="#c08c00" /></div><div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]"><Panel><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-black">Текущие заказы</h2><p className="text-sm text-[#777]">{activeOrders.length ? `${activeOrders.length} требуют внимания` : "Активных заказов пока нет"}</p></div><button onClick={onOpenOrders} className="flex items-center gap-1 text-sm font-bold text-[#007e68]">Все заказы <ChevronRight className="h-4 w-4" /></button></div>{activeOrders.length ? <div className="space-y-3">{activeOrders.slice(0, 4).map((order) => <CompactOrder key={order.id} order={order} onChangeStatus={onChangeStatus} />)}</div> : <EmptyState icon={ShoppingBag} title="Ждём первый заказ" text="Новые клиентские заказы появятся здесь автоматически." />}</Panel><Panel><h2 className="text-lg font-black">Заведение сегодня</h2><div className="mt-4 space-y-3"><InfoRow label="Приём заказов" value={profile.acceptsOrders ? "Включён" : "На паузе"} good={profile.acceptsOrders} /><InfoRow label="Блюд в меню" value={String(profile.venue.menu.filter((item) => item.price > 0).length)} good /><InfoRow label="Заказов сегодня" value={String(todayOrders.length)} good={todayOrders.length > 0} /></div><Link href="/" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#f3f3f3] px-4 py-3 text-sm font-bold">Посмотреть как клиент <ExternalLink className="h-4 w-4" /></Link></Panel></div></div>;
}

function OrdersView({ orders, onChangeStatus }: { orders: BusinessOrder[]; onChangeStatus: (id: string, status: BusinessOrderStatus) => void }) {
  const groups: BusinessOrderStatus[] = ["NEW", "PREPARING", "READY", "PICKED_UP", "CANCELLED"];
  return <div><PageTitle title="Заказы" subtitle="Новые заказы появляются здесь автоматически" />{orders.length === 0 ? <Panel><EmptyState icon={ShoppingBag} title="Заказов пока нет" text="Откройте заведение в клиентском каталоге и оформите первый заказ." /></Panel> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{groups.map((status) => { const groupOrders = orders.filter((order) => order.status === status); return <div key={status}><div className="mb-3 flex items-center justify-between"><span className={`rounded-full px-3 py-1 text-xs font-black ${statusMeta[status].className}`}>{statusMeta[status].label}</span><span className="text-sm font-bold text-[#888]">{groupOrders.length}</span></div><div className="space-y-3">{groupOrders.map((order) => <OrderCard key={order.id} order={order} onChangeStatus={onChangeStatus} />)}{groupOrders.length === 0 && <div className="rounded-2xl border border-dashed border-[#ddd] p-6 text-center text-xs text-[#999]">Здесь пока пусто</div>}</div></div>; })}</div>}</div>;
}

function OrderCard({ order, onChangeStatus }: { order: BusinessOrder; onChangeStatus: (id: string, status: BusinessOrderStatus) => void }) {
  const nextStatus: Partial<Record<BusinessOrderStatus, BusinessOrderStatus>> = { NEW: "PREPARING", PREPARING: "READY", READY: "PICKED_UP" };
  const nextLabel: Partial<Record<BusinessOrderStatus, string>> = { NEW: "Принять", PREPARING: "Готово", READY: "Подтвердить выдачу" };
  return <article className={`rounded-2xl border bg-white p-4 shadow-sm ${order.status === "NEW" ? "border-[#ffc244]" : "border-[#e7e7e7]"}`}><div className="flex items-start justify-between gap-2"><div><p className="text-xs text-[#777]">Заказ</p><p className="font-black">#{order.id.slice(-6).toUpperCase()}</p></div><span className="rounded-lg bg-[#f3f3f3] px-2 py-1 font-mono text-sm font-black">Код {order.pickupCode}</span></div><div className="mt-4 space-y-1.5">{order.items.map((item) => <div key={item.id} className="flex justify-between gap-3 text-sm"><span>{item.quantity} × {item.name}</span><span className="shrink-0 font-semibold">{(item.price * item.quantity).toLocaleString()} ₸</span></div>)}</div><div className="mt-4 flex items-center justify-between border-t border-[#eee] pt-3"><span className="text-xs font-semibold text-[#777]"><Timer className="mr-1 inline h-3.5 w-3.5" />{order.pickupTime}</span><strong>{order.totalAmount.toLocaleString()} ₸</strong></div>{nextStatus[order.status] && <button onClick={() => onChangeStatus(order.id, nextStatus[order.status]!)} className="mt-4 w-full rounded-xl bg-[#00a082] px-3 py-2.5 text-sm font-black text-white">{nextLabel[order.status]}</button>}{!["PICKED_UP", "CANCELLED"].includes(order.status) && <button onClick={() => onChangeStatus(order.id, "CANCELLED")} className="mt-2 w-full rounded-xl px-3 py-2 text-xs font-bold text-[#c12849] hover:bg-[#fff0f3]">Отменить</button>}</article>;
}

function CompactOrder({ order, onChangeStatus }: { order: BusinessOrder; onChangeStatus: (id: string, status: BusinessOrderStatus) => void }) {
  const next = order.status === "NEW" ? "PREPARING" : order.status === "PREPARING" ? "READY" : order.status === "READY" ? "PICKED_UP" : null;
  return <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#ececec] p-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f4f4f4] font-mono font-black">{order.pickupCode}</span><div className="min-w-0 flex-1"><p className="truncate font-bold">{order.items.map((item) => `${item.quantity}× ${item.name}`).join(", ")}</p><p className="text-xs text-[#777]">{order.pickupTime} · {order.totalAmount.toLocaleString()} ₸</p></div><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusMeta[order.status].className}`}>{statusMeta[order.status].label}</span>{next && <button onClick={() => onChangeStatus(order.id, next)} className="rounded-xl bg-[#00a082] px-3 py-2 text-xs font-bold text-white">{next === "PREPARING" ? "Принять" : next === "READY" ? "Готово" : "Выдать"}</button>}</div>;
}

function LoadView({ orders }: { orders: BusinessOrder[] }) {
  const hourly = hourlyData(orders);
  const total = hourly.reduce((sum, item) => sum + item.count, 0);
  const peak = [...hourly].sort((a, b) => b.count - a.count)[0];
  return <div><PageTitle title="Загрузка" subtitle="Распределение поступивших заказов в течение дня" /><div className="grid gap-4 sm:grid-cols-3"><Metric icon={ShoppingBag} label="Заказов сегодня" value={total} accent="#00a082" /><Metric icon={TrendingUp} label="Пиковый интервал" value={peak.count ? peak.label : "—"} accent="#ff2d55" /><Metric icon={Clock3} label="Интервалов с заказами" value={hourly.filter((item) => item.count > 0).length} accent="#377dcc" /></div><div className="mt-6"><Panel><h2 className="text-lg font-black">Заказы по времени</h2><p className="text-sm text-[#777]">Сегодня, интервалы по часу</p><HourlyChart orders={orders} /></Panel></div></div>;
}

function AnalyticsView({ orders }: { orders: BusinessOrder[] }) {
  const todayOrders = today(orders);
  const completed = todayOrders.filter((order) => order.status === "PICKED_UP");
  const revenue = todayOrders.filter((order) => order.status !== "CANCELLED").reduce((sum, order) => sum + order.totalAmount, 0);
  const average = todayOrders.length ? Math.round(revenue / todayOrders.length) : 0;
  const itemCounts = new Map<string, number>();
  orders.forEach((order) => order.items.forEach((item) => itemCounts.set(item.name, (itemCounts.get(item.name) || 0) + item.quantity)));
  const popular = [...itemCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  return <div><PageTitle title="Аналитика" subtitle="Распределение заказов и ключевые показатели за сегодня" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={ShoppingBag} label="Заказов" value={todayOrders.length} accent="#00a082" /><Metric icon={CircleDollarSign} label="Оборот" value={`${revenue.toLocaleString()} ₸`} accent="#c08c00" /><Metric icon={TrendingUp} label="Средний чек" value={`${average.toLocaleString()} ₸`} accent="#377dcc" /><Metric icon={PackageCheck} label="Выдано" value={completed.length} accent="#713fc2" /></div><div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]"><Panel><h2 className="text-lg font-black">Распределение заказов</h2><p className="text-sm text-[#777]">Количество по часам</p><HourlyChart orders={orders} /></Panel><Panel><h2 className="text-lg font-black">Популярные блюда</h2>{popular.length ? <div className="mt-4 space-y-3">{popular.map(([name, count], index) => <div key={name} className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f3f3f3] text-sm font-black">{index + 1}</span><span className="min-w-0 flex-1 truncate text-sm font-bold">{name}</span><span className="text-sm text-[#777]">{count} шт.</span></div>)}</div> : <EmptyState icon={BarChart3} title="Данных пока нет" text="Популярные блюда появятся после первых заказов." />}</Panel></div></div>;
}

function HourlyChart({ orders }: { orders: BusinessOrder[] }) {
  const data = hourlyData(orders);
  const max = Math.max(1, ...data.map((item) => item.count));
  return <div className="mt-6 flex h-56 items-end gap-1.5 sm:gap-3">{data.map((item) => <div key={item.hour} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><span className="text-xs font-bold text-[#555]">{item.count || ""}</span><div className={`w-full rounded-t-lg transition-all ${item.count ? "bg-[#00a082]" : "bg-[#ececec]"}`} style={{ height: `${Math.max(7, (item.count / max) * 82)}%` }} /><span className="text-[10px] text-[#888] sm:text-xs">{item.hour}</span></div>)}</div>;
}

function MenuView({ profile, onProfileChange }: { profile: BusinessProfile; onProfileChange: (profile: BusinessProfile) => void }) {
  const [draft, setDraft] = useState({ name: "", price: "", description: "" });
  const saveMenu = (menu: MenuItem[]) => { const next = updateBusinessProfile(profile.venue.id, (current) => ({ ...current, venue: { ...current.venue, menu } })); if (next) onProfileChange(next); };
  const toggleItem = (item: MenuItem) => saveMenu(profile.venue.menu.map((current) => current.id === item.id ? { ...current, available: current.available === false } : current));
  const addItem = () => { if (!draft.name.trim() || Number(draft.price) <= 0) return; saveMenu([...profile.venue.menu, createVenueMenuItem({ name: draft.name, description: draft.description || "Фирменное блюдо", price: Number(draft.price), image: profile.venue.image, category: "Основное" })]); setDraft({ name: "", price: "", description: "" }); };
  const removeItem = (id: string) => saveMenu(profile.venue.menu.filter((item) => item.id !== id));
  return <div><PageTitle title="Меню" subtitle="Изменения сразу отображаются у клиентов" /><div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]"><Panel><div className="space-y-3">{profile.venue.menu.map((item) => { const unavailable = item.available === false; return <div key={item.id} className={`flex items-center gap-3 rounded-2xl border p-3 ${unavailable ? "border-[#eee] bg-[#f7f7f7] opacity-65" : "border-[#e5e5e5]"}`}><img src={item.image || profile.venue.image} alt={item.name} className="h-16 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate font-black">{item.name}</p><p className="text-sm text-[#777]">{item.price.toLocaleString()} ₸ · {unavailable ? "Стоп-лист" : "Доступно"}</p></div><button onClick={() => toggleItem(item)} className={`rounded-xl px-3 py-2 text-xs font-bold ${unavailable ? "bg-[#e9f8f5] text-[#007e68]" : "bg-[#fff5d6] text-[#6d5300]"}`}>{unavailable ? "Вернуть" : "Стоп"}</button><button onClick={() => removeItem(item.id)} className="rounded-full p-2 text-[#c12849]"><Trash2 className="h-4 w-4" /></button></div>; })}</div></Panel><Panel><h2 className="text-lg font-black">Новое блюдо</h2><div className="mt-4 space-y-3"><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Название" className="business-input" /><input type="number" min="1" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} placeholder="Цена, ₸" className="business-input" /><textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Описание" className="business-input min-h-24 resize-none" /><button onClick={addItem} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00a082] px-4 py-3 text-sm font-black text-white"><Plus className="h-4 w-4" /> Добавить в меню</button></div></Panel></div></div>;
}

function VenueView({ profile, onProfileChange, onCreateBranch, onDelete }: { profile: BusinessProfile; onProfileChange: (profile: BusinessProfile) => void; onCreateBranch: () => void; onDelete: () => void }) {
  const [draft, setDraft] = useState({ name: profile.venue.name, address: profile.venue.address, phone: profile.phone, email: profile.email, prepTime: profile.venue.prepTime, openingHours: profile.openingHours });
  const save = () => { const next = updateBusinessProfile(profile.venue.id, (current) => ({ ...current, phone: draft.phone, email: draft.email, openingHours: draft.openingHours, venue: { ...current.venue, name: draft.name, address: draft.address, prepTime: draft.prepTime } })); if (next) onProfileChange(next); };
  const confirmDelete = () => {
    if (window.confirm(`Удалить филиал / заведение «${profile.venue.name}»? Вместе с ним будет удалена локальная история его заказов.`)) onDelete();
  };
  return <div><PageTitle title="Заведение" subtitle="Контакты, режим работы и публикация" /><div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]"><Panel><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">Название<input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="business-input mt-1.5" /></label><label className="text-sm font-bold">Телефон<input value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} className="business-input mt-1.5" /></label><label className="text-sm font-bold">Email<input value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} className="business-input mt-1.5" /></label><label className="text-sm font-bold">Время приготовления<input value={draft.prepTime} onChange={(event) => setDraft({ ...draft, prepTime: event.target.value })} className="business-input mt-1.5" /></label><label className="text-sm font-bold sm:col-span-2">Адрес<input value={draft.address} onChange={(event) => setDraft({ ...draft, address: event.target.value })} className="business-input mt-1.5" /></label><label className="text-sm font-bold sm:col-span-2">График<input value={draft.openingHours} onChange={(event) => setDraft({ ...draft, openingHours: event.target.value })} className="business-input mt-1.5" /></label></div><button onClick={save} className="mt-5 rounded-xl bg-[#00a082] px-5 py-3 text-sm font-black text-white">Сохранить изменения</button></Panel><Panel><img src={profile.venue.image} alt={profile.venue.name} className="aspect-[16/10] w-full rounded-2xl object-cover" /><h2 className="mt-4 text-lg font-black">Публикация активна</h2><p className="mt-1 text-sm text-[#777]">Карточка доступна клиентам в общем каталоге.</p><Link href="/" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#f3f3f3] px-4 py-3 text-sm font-bold">Открыть в каталоге <ExternalLink className="h-4 w-4" /></Link><button onClick={onCreateBranch} className="mt-2 w-full rounded-xl px-4 py-3 text-sm font-bold text-[#007e68]">Добавить ещё один филиал</button><div className="my-3 border-t border-[#eeeeee]" /><button onClick={confirmDelete} className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#c12849] hover:bg-[#fff0f3]"><Trash2 className="h-4 w-4" /> Удалить филиал / заведение</button></Panel></div></div>;
}

function Metric({ icon: Icon, label, value, accent }: { icon: typeof Store; label: string; value: string | number; accent: string }) { return <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-[#777]">{label}</p><span className="grid h-9 w-9 place-items-center rounded-xl" style={{ backgroundColor: `${accent}18`, color: accent }}><Icon className="h-4 w-4" /></span></div><p className="mt-3 text-2xl font-black tracking-[-0.03em]">{value}</p></div>; }
function PageTitle({ title, subtitle }: { title: string; subtitle: string }) { return <div className="mb-6"><h1 className="text-2xl font-black tracking-[-0.035em] sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-[#777]">{subtitle}</p></div>; }
function Panel({ children }: { children: React.ReactNode }) { return <section className="rounded-3xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">{children}</section>; }
function EmptyState({ icon: Icon, title, text, action, onAction }: { icon: typeof Store; title: string; text: string; action?: string; onAction?: () => void }) { return <div className="py-10 text-center"><Icon className="mx-auto h-9 w-9 text-[#aaa]" /><h3 className="mt-3 font-black">{title}</h3><p className="mx-auto mt-1 max-w-sm text-sm text-[#777]">{text}</p>{action && onAction && <button onClick={onAction} className="mt-4 rounded-xl bg-[#00a082] px-4 py-2.5 text-sm font-bold text-white">{action}</button>}</div>; }
function InfoRow({ label, value, good }: { label: string; value: string; good: boolean }) { return <div className="flex items-center justify-between rounded-xl bg-[#f7f7f7] px-3 py-3 text-sm"><span className="text-[#666]">{label}</span><span className={`font-bold ${good ? "text-[#007e68]" : "text-[#8a6a00]"}`}>{value}</span></div>; }
function today(orders: BusinessOrder[]) { const key = new Date().toDateString(); return orders.filter((order) => new Date(order.createdAt).toDateString() === key); }
function hourlyData(orders: BusinessOrder[]) { const todaysOrders = today(orders).filter((order) => order.status !== "CANCELLED"); return Array.from({ length: 14 }, (_, index) => { const hour = index + 9; return { hour: String(hour).padStart(2, "0"), label: `${String(hour).padStart(2, "0")}:00–${String(hour + 1).padStart(2, "0")}:00`, count: todaysOrders.filter((order) => new Date(order.createdAt).getHours() === hour).length }; }); }
