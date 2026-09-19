"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChefHat, ChevronRight, Clock3, PackageCheck, ReceiptText, X } from "lucide-react";
import {
  BUSINESS_ORDER_EVENT,
  BusinessOrder,
  getBusinessOrders,
} from "@/lib/businessStore";

export default function MiniOrderTracker() {
  const [order, setOrder] = useState<BusinessOrder | null>(null);
  const [now, setNow] = useState(Date.now());
  const [dismissedOrderId, setDismissedOrderId] = useState<string | null>(null);

  const refresh = useCallback(() => {
    const activeOrder = getBusinessOrders().find((item) =>
      !["PICKED_UP", "CANCELLED"].includes(item.status)
    ) || null;
    setOrder(activeOrder);
    setDismissedOrderId((current) => current && current !== activeOrder?.id ? null : current);
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

  if (!order || dismissedOrderId === order.id) return null;

  const estimatedAt = order.estimatedReadyAt
    ? new Date(order.estimatedReadyAt).getTime()
    : new Date(order.createdAt).getTime() + 30 * 60 * 1000;
  const remainingMs = estimatedAt - now;
  const createdAt = new Date(order.createdAt).getTime();
  const duration = Math.max(60_000, estimatedAt - createdAt);
  const progress = Math.min(100, Math.max(6, ((now - createdAt) / duration) * 100));
  const isReady = order.status === "READY";
  const isPreparing = order.status === "PREPARING";

  return (
    <aside className="fixed bottom-24 left-3 right-3 z-40 overflow-hidden rounded-2xl border border-[#dfe8e5] bg-white shadow-[0_18px_55px_rgba(18,63,53,0.22)] sm:left-auto sm:right-5 sm:w-[370px] md:bottom-5">
      <div className="flex items-start gap-3 p-4">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${isReady ? "bg-[#00a082] text-white" : "bg-[#e9f8f5] text-[#007e68]"}`}>
          {isReady ? <PackageCheck className="h-6 w-6" /> : isPreparing ? <ChefHat className="h-5 w-5" /> : <ReceiptText className="h-5 w-5" />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-[#173f35]">{order.venueName}</p>
              <p className="mt-0.5 text-xs font-semibold text-[#6a7b76]">
                {isReady ? "Заказ готов — можно забирать" : isPreparing ? "Заказ готовится" : "Ожидает принятия заведением"}
              </p>
            </div>
            <button onClick={() => setDismissedOrderId(order.id)} className="rounded-full p-1 text-[#888] hover:bg-[#f1f1f1]" aria-label="Скрыть трекер">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#84918d]">{isReady ? "Код выдачи" : remainingMs > 0 ? "Примерно через" : "Готовность"}</p>
              <p className={`mt-0.5 font-mono text-xl font-black ${isReady ? "text-[#00a082]" : remainingMs > 0 ? "text-[#173f35]" : "text-[#c77800]"}`}>
                {isReady ? order.pickupCode : remainingMs > 0 ? formatRemaining(remainingMs) : "Скоро"}
              </p>
            </div>
            <Link href="/orders" className="flex items-center gap-1 rounded-xl bg-[#173f35] px-3 py-2 text-xs font-bold text-white">
              Подробнее <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {!isReady && (
        <div className="px-4 pb-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-[#e1ebe8]">
            <div className="h-full rounded-full bg-[#00a082] transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] font-semibold text-[#7a8985]">
            <span className="flex items-center gap-1"><Clock3 className="h-3 w-3" /> Заказ #{order.id.slice(-6).toUpperCase()}</span>
            <span>К {new Date(estimatedAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </div>
      )}
    </aside>
  );
}

function formatRemaining(milliseconds: number) {
  const secondsTotal = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = secondsTotal % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
