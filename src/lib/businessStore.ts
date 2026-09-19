import { MenuItem, Venue } from "@/data/mockVenues";

const VENUES_KEY = "qos-business-venues-v1";
const ORDERS_KEY = "qos-business-orders-v1";
const ACTIVE_VENUE_KEY = "qos-active-business-venue-v1";

export const BUSINESS_DATA_EVENT = "qos-business-data-changed";
export const BUSINESS_ORDER_EVENT = "qos-business-order-changed";

export type BusinessOrderStatus = "NEW" | "PREPARING" | "READY" | "PICKED_UP" | "CANCELLED";

export interface BusinessOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface BusinessOrder {
  id: string;
  venueId: string;
  venueName: string;
  pickupCode: string;
  pickupTime: string;
  customerPhone: string;
  status: BusinessOrderStatus;
  items: BusinessOrderItem[];
  totalAmount: number;
  bonusAmount: number;
  isBonusOrder: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessProfile {
  venue: Venue;
  email: string;
  phone: string;
  description: string;
  openingHours: string;
  acceptsOrders: boolean;
  createdAt: string;
}

function canUseStorage() {
  return typeof window !== "undefined";
}

function readArray<T>(key: string): T[] {
  if (!canUseStorage()) return [];
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T[]) : [];
  } catch {
    return [];
  }
}

function writeArray<T>(key: string, value: T[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function notify(eventName: string) {
  if (!canUseStorage()) return;
  window.dispatchEvent(new CustomEvent(eventName));
}

export function getBusinessProfiles(): BusinessProfile[] {
  return readArray<BusinessProfile>(VENUES_KEY);
}

export function getRegisteredVenues(): Venue[] {
  return getBusinessProfiles()
    .filter((profile) => profile.acceptsOrders)
    .map((profile) => profile.venue);
}

export function getBusinessProfile(venueId?: string | null): BusinessProfile | null {
  const profiles = getBusinessProfiles();
  const activeVenueId = venueId || (canUseStorage() ? window.localStorage.getItem(ACTIVE_VENUE_KEY) : null);
  return profiles.find((profile) => profile.venue.id === activeVenueId) || profiles.at(-1) || null;
}

export function setActiveBusinessVenue(venueId: string) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ACTIVE_VENUE_KEY, venueId);
}

export function saveBusinessProfile(profile: BusinessProfile) {
  const profiles = getBusinessProfiles();
  const existingIndex = profiles.findIndex((item) => item.venue.id === profile.venue.id);
  const nextProfiles = [...profiles];
  if (existingIndex >= 0) nextProfiles[existingIndex] = profile;
  else nextProfiles.push(profile);
  writeArray(VENUES_KEY, nextProfiles);
  setActiveBusinessVenue(profile.venue.id);
  notify(BUSINESS_DATA_EVENT);
  return profile;
}

export function updateBusinessProfile(venueId: string, update: (profile: BusinessProfile) => BusinessProfile) {
  const current = getBusinessProfile(venueId);
  if (!current) return null;
  return saveBusinessProfile(update(current));
}

export function getBusinessOrders(venueId?: string): BusinessOrder[] {
  const orders = readArray<BusinessOrder>(ORDERS_KEY);
  return (venueId ? orders.filter((order) => order.venueId === venueId) : orders)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getBusinessOrder(orderId: string): BusinessOrder | null {
  return readArray<BusinessOrder>(ORDERS_KEY).find((order) => order.id === orderId) || null;
}

export function createBusinessOrder(input: Omit<BusinessOrder, "id" | "createdAt" | "updatedAt" | "status">) {
  const timestamp = new Date().toISOString();
  const order: BusinessOrder = {
    ...input,
    id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: "NEW",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  const orders = readArray<BusinessOrder>(ORDERS_KEY);
  writeArray(ORDERS_KEY, [...orders, order]);
  notify(BUSINESS_ORDER_EVENT);
  return order;
}

export function updateBusinessOrderStatus(orderId: string, status: BusinessOrderStatus) {
  const orders = readArray<BusinessOrder>(ORDERS_KEY);
  const nextOrders = orders.map((order) => order.id === orderId
    ? { ...order, status, updatedAt: new Date().toISOString() }
    : order);
  writeArray(ORDERS_KEY, nextOrders);
  notify(BUSINESS_ORDER_EVENT);
}

export function createDemoOrder(profile: BusinessProfile) {
  const menu = profile.venue.menu;
  const selectedItems = menu.slice(0, Math.min(2, menu.length));
  const items = selectedItems.map((item, index) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: index === 0 ? 2 : 1,
  }));
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return createBusinessOrder({
    venueId: profile.venue.id,
    venueName: profile.venue.name,
    pickupCode: String(Math.floor(100 + Math.random() * 900)),
    pickupTime: "Через 30 минут",
    customerPhone: "+7 (707) 123-45-67",
    items,
    totalAmount,
    bonusAmount: 0,
    isBonusOrder: false,
  });
}

export function createVenueMenuItem(data: Omit<MenuItem, "id">): MenuItem {
  return {
    ...data,
    available: data.available ?? true,
    id: `menu-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  };
}
