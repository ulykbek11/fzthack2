"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChefHat,
  Clock3,
  MapPin,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  Store,
  Timer,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";
import {
  BUSINESS_ORDER_EVENT,
  BusinessOrder,
  BusinessOrderStatus,
  getBusinessOrders,
} from "@/lib/businessStore";

const steps: Array<{ status: BusinessOrderStatus; label: string; icon: typeof Store }> = [
  { status: "NEW", label: "Оформлен", icon: ReceiptText },
  { status: "PREPARING", label: "Готовится", icon: ChefHat },
  { status: "READY", label: "Готов", icon: PackageCheck },
  { status: "PICKED_UP", label: "Выдан", icon: CheckCircle2 },
];

const statusIndex: Record<BusinessOrderStatus, number> = {
  NEW: 0,
  PREPARING: 1,
  READY: 2,
  PICKED_UP: 3,
  CANCELLED: -1,
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<BusinessOrder[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  const refresh = useCallback(() => {
    const nextOrders = getBusinessOrders();
    setOrders(nextOrders);
    setSelectedId((current) => current && nextOrders.some((order) => order.id === current)
      ? current
      : nextOrders.find((order) => !["PICKED_UP", "CANCELLED"].includes(order.status))?.id || nextOrders[0]?.id || null);
  }, []);

  useEffect(() => {
    refresh();
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    window.addEventListener(BUSINESS_ORDER_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener(BUSINESS_ORDER_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const activeOrders = useMemo(() => orders.filter((order) => !["PICKED_UP", "CANCELLED"].includes(order.status)), [orders]);
  const historyOrders = useMemo(() => orders.filter((order) => ["PICKED_UP", "CANCELLED"].includes(order.status)), [orders]);
  const selectedOrder = orders.find((order) => order.id === selectedId) || null;

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#202124]">
      <header className="sticky top-0 z-30 border-b border-[#e8e8e8] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="grid h-10 w-10 place-items-center rounded-full bg-[#f3f3f3]" aria-label="Вернуться в каталог"><ArrowLeft className="h-5 w-5" /></Link>
            <div className="flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#ffc244] text-xl font-black text-[#173f35]">Q</span><div><p className="font-black text-[#173f35]">Мои заказы</p><p className="text-xs text-[#777]">Статус обновляется автоматически</p></div></div>
          </div>
          {activeOrders.length > 0 && <span className="rounded-full bg-[#e9f8f5] px-3 py-1.5 text-xs font-black text-[#007e68]">Активных: {activeOrders.length}</span>}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        {orders.length === 0 ? (
          <div className="rounded-[28px] border border-[#e8e8e8] bg-white px-5 py-20 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-11 w-11 text-[#aaa]" />
            <h1 className="mt-4 text-2xl font-black">Заказов пока нет</h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777]">Выберите заведение, добавьте блюда и оформите первый предзаказ.</p>
            <Link href="/" className="mt-6 inline-flex rounded-xl bg-[#00a082] px-5 py-3 text-sm font-black text-white">Перейти к заведениям</Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="space-y-5">
              {activeOrders.length > 0 && <OrderList title="Активные" orders={activeOrders} selectedId={selectedId} onSelect={setSelectedId} />}
              {historyOrders.length > 0 && <OrderList title="История" orders={historyOrders} selectedId={selectedId} onSelect={setSelectedId} />}
            </aside>
            {selectedOrder && <TrackingCard order={selectedOrder} now={now} />}
          </div>
        )}
      </main>
    </div>
  );
}

function OrderList({ title, orders, selectedId, onSelect }: { title: string; orders: BusinessOrder[]; selectedId: string | null; onSelect: (id: string) => void }) {
  return <section><h2 className="mb-2 px-1 text-sm font-black text-[#555]">{title}</h2><div className="space-y-2">{orders.map((order) => <button key={order.id} onClick={() => onSelect(order.id)} className={`w-full rounded-2xl border p-4 text-left transition ${selectedId === order.id ? "border-[#00a082] bg-[#e9f8f5]" : "border-[#e6e6e6] bg-white hover:border-[#b9d8d1]"}`}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-black">{order.venueName}</p><p className="mt-0.5 text-xs text-[#777]">Заказ #{order.id.slice(-6).toUpperCase()}</p></div><StatusPill status={order.status} /></div><div className="mt-3 flex items-center justify-between text-sm"><span className="font-semibold">{order.items.reduce((sum, item) => sum + item.quantity, 0)} поз.</span><strong>{order.totalAmount.toLocaleString()} ₸</strong></div></button>)}</div></section>;
}

function TrackingCard({ order, now }: { order: BusinessOrder; now: number }) {
  const estimatedAt = getEstimatedTime(order);
  const remainingMs = estimatedAt - now;
  const isFinished = ["PICKED_UP", "CANCELLED"].includes(order.status);
  const isReady = order.status === "READY";
  const createdAt = new Date(order.createdAt).getTime();
  const totalDuration = Math.max(60_000, estimatedAt - createdAt);
  const timeProgress = Math.min(100, Math.max(4, ((now - createdAt) / totalDuration) * 100));
  const currentStep = statusIndex[order.status];

  return <article className="overflow-hidden rounded-[28px] border border-[#e8e8e8] bg-white shadow-sm">
    <div className={`${order.status === "CANCELLED" ? "bg-[#fff0f3]" : isReady ? "bg-[#dff7f1]" : "bg-[#eaf8f5]"} p-5 sm:p-8`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-sm font-bold text-[#56736c]">Заказ из</p><h1 className="mt-1 text-2xl font-black tracking-[-0.035em] text-[#173f35] sm:text-3xl">{order.venueName}</h1><p className="mt-2 flex items-center gap-1.5 text-sm text-[#56736c]"><MapPin className="h-4 w-4" /> Самовывоз · {order.pickupTime}</p></div>
        <StatusPill status={order.status} large />
      </div>

      {!isFinished && <div className="mt-7 rounded-2xl bg-white/80 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#678079]">{isReady ? "Можно забирать" : remainingMs > 0 ? "Примерно будет готов через" : "Ожидаем готовность"}</p>
            <p className={`mt-1 font-mono text-4xl font-black tracking-[-0.05em] ${isReady ? "text-[#00a082]" : remainingMs > 0 ? "text-[#173f35]" : "text-[#d17a00]"}`}>{isReady ? "Готово" : remainingMs > 0 ? formatCountdown(remainingMs) : "Скоро"}</p>
          </div>
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e9f8f5] text-[#00a082]">{isReady ? <PackageCheck className="h-7 w-7" /> : <Timer className="h-7 w-7" />}</div>
        </div>
        {!isReady && <><div className="mt-5 h-2 overflow-hidden rounded-full bg-[#dceae7]"><div className="h-full rounded-full bg-[#00a082] transition-all duration-1000" style={{ width: `${timeProgress}%` }} /></div><div className="mt-2 flex justify-between text-xs text-[#678079]"><span>Заказ оформлен</span><span>{formatClock(estimatedAt)}</span></div></>}
      </div>}

      {order.status === "CANCELLED" && <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/75 p-4 text-[#a62040]"><XCircle className="h-6 w-6 shrink-0" /><div><p className="font-black">Заказ отменён</p><p className="text-sm">Выберите другое заведение или оформите новый заказ.</p></div></div>}
    </div>

    <div className="p-5 sm:p-8">
      <section>
        <h2 className="text-lg font-black">Статус заказа</h2>
        <div className="mt-5 grid grid-cols-4 gap-1 sm:gap-3">{steps.map((step, index) => { const Icon = step.icon; const complete = currentStep >= index; const active = currentStep === index; return <div key={step.status} className="relative text-center"><div className={`relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full border-2 transition sm:h-12 sm:w-12 ${complete ? "border-[#00a082] bg-[#00a082] text-white" : "border-[#dedede] bg-white text-[#aaa]"}`}>{complete && !active ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}</div>{index < steps.length - 1 && <div className={`absolute left-[calc(50%+20px)] right-[calc(-50%+20px)] top-5 h-0.5 sm:left-[calc(50%+24px)] sm:right-[calc(-50%+24px)] sm:top-6 ${currentStep > index ? "bg-[#00a082]" : "bg-[#dedede]"}`} />}<p className={`mt-2 text-[10px] font-bold sm:text-xs ${complete ? "text-[#007e68]" : "text-[#999]"}`}>{step.label}</p></div>; })}</div>
      </section>

      <div className="mt-8 grid gap-5 md:grid-cols-[1fr_220px]">
        <section className="rounded-2xl border border-[#eeeeee] p-4"><h2 className="flex items-center gap-2 font-black"><UtensilsCrossed className="h-4 w-4 text-[#00a082]" /> Состав заказа</h2><div className="mt-4 space-y-3">{order.items.map((item) => <div key={item.id} className="flex justify-between gap-4 text-sm"><span><strong>{item.quantity} ×</strong> {item.name}</span><span className="shrink-0 font-bold">{(item.price * item.quantity).toLocaleString()} ₸</span></div>)}</div><div className="mt-4 flex justify-between border-t border-[#eeeeee] pt-4 font-black"><span>Итого</span><span>{order.totalAmount.toLocaleString()} ₸</span></div></section>
        <section className="rounded-2xl bg-[#173f35] p-5 text-white"><p className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">Код выдачи</p><p className="mt-2 font-mono text-4xl font-black tracking-[0.08em]">{order.pickupCode}</p><p className="mt-3 text-xs leading-5 text-white/70">Назовите этот код сотруднику на стойке самовывоза.</p></section>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#f7f7f7] p-4 text-sm"><span className="flex items-center gap-2 text-[#666]"><Clock3 className="h-4 w-4" /> Оформлен {new Date(order.createdAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</span><span className="font-bold">Ожидаемая готовность: {formatClock(estimatedAt)}</span></div>
    </div>
  </article>;
}

function StatusPill({ status, large = false }: { status: BusinessOrderStatus; large?: boolean }) {
  const meta: Record<BusinessOrderStatus, { label: string; className: string }> = {
    NEW: { label: "Ожидает принятия", className: "bg-[#fff5d6] text-[#735900]" },
    PREPARING: { label: "Готовится", className: "bg-[#e8f2ff] text-[#205fa9]" },
    READY: { label: "Готов", className: "bg-[#00a082] text-white" },
    PICKED_UP: { label: "Выдан", className: "bg-[#eeeeee] text-[#666]" },
    CANCELLED: { label: "Отменён", className: "bg-[#ffe1e8] text-[#ae1f3e]" },
  };
  return <span className={`shrink-0 rounded-full font-black ${large ? "px-4 py-2 text-sm" : "px-2.5 py-1 text-[10px]"} ${meta[status].className}`}>{meta[status].label}</span>;
}

function getEstimatedTime(order: BusinessOrder) {
  if (order.estimatedReadyAt) return new Date(order.estimatedReadyAt).getTime();
  return new Date(order.createdAt).getTime() + 30 * 60 * 1000;
}

function formatCountdown(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatClock(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}
