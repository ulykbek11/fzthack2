import { BusinessOrder, getBusinessOrders } from "@/lib/businessStore";

export const SLOT_DURATION_MINUTES = 10;
export const SLOT_CAPACITY_POINTS = 30;

export interface PickupCapacitySlot {
  id: string;
  start: string;
  end: string;
  label: string;
  currentLoad: number;
  projectedLoad: number;
  capacity: number;
  occupancyPercent: number;
  bonusAmount: number;
  available: boolean;
  state: "QUIET" | "AVAILABLE" | "BUSY" | "FULL";
}

export function calculateCartComplexity(items: Array<{ quantity: number; item: { complexityWeight?: number } }>) {
  return items.reduce((sum, entry) => sum + entry.quantity * (entry.item.complexityWeight ?? 2), 0);
}

export function getVenuePickupSlots(venueId: string, projectedComplexity = 0, count = 10): PickupCapacitySlot[] {
  const orders = getBusinessOrders(venueId).filter((order) =>
    ["NEW", "PREPARING", "READY"].includes(order.status)
  );
  const firstStart = roundUpToSlot(new Date(Date.now() + 15 * 60 * 1000));

  return Array.from({ length: count }, (_, index) => {
    const start = new Date(firstStart.getTime() + index * SLOT_DURATION_MINUTES * 60 * 1000);
    const end = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
    const currentLoad = orders.reduce((sum, order) => {
      return isOrderInSlot(order, start)
        ? sum + getOrderComplexity(order)
        : sum;
    }, 0);
    const projectedLoad = currentLoad + projectedComplexity;
    const occupancy = projectedLoad / SLOT_CAPACITY_POINTS;
    const available = projectedLoad <= SLOT_CAPACITY_POINTS;
    const bonusAmount = available ? bonusForOccupancy(occupancy) : 0;
    const state = !available
      ? "FULL"
      : occupancy >= 0.8
        ? "BUSY"
        : occupancy <= 0.35
          ? "QUIET"
          : "AVAILABLE";

    return {
      id: start.toISOString(),
      start: start.toISOString(),
      end: end.toISOString(),
      label: `${formatTime(start)}–${formatTime(end)}`,
      currentLoad,
      projectedLoad,
      capacity: SLOT_CAPACITY_POINTS,
      occupancyPercent: Math.min(100, Math.round(occupancy * 100)),
      bonusAmount,
      available,
      state,
    };
  });
}

export function getBestAvailableBonus(venueId: string) {
  return Math.max(0, ...getVenuePickupSlots(venueId).map((slot) => slot.bonusAmount));
}

function bonusForOccupancy(occupancy: number) {
  if (occupancy <= 0.35) return 250;
  if (occupancy <= 0.55) return 150;
  if (occupancy <= 0.75) return 70;
  return 0;
}

function roundUpToSlot(date: Date) {
  const result = new Date(date);
  const minutes = result.getMinutes();
  const roundedMinutes = Math.ceil(minutes / SLOT_DURATION_MINUTES) * SLOT_DURATION_MINUTES;
  result.setSeconds(0, 0);
  result.setMinutes(roundedMinutes);
  return result;
}

function isOrderInSlot(order: BusinessOrder, slotStart: Date) {
  const orderStart = order.slotStart
    ? new Date(order.slotStart)
    : new Date(order.estimatedReadyAt || order.createdAt);
  return orderStart.getTime() === slotStart.getTime();
}

function getOrderComplexity(order: BusinessOrder) {
  return order.complexityPoints ?? order.items.reduce((sum, item) => sum + item.quantity * 2, 0);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}
