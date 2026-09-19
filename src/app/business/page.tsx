"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  ImagePlus,
  LayoutDashboard,
  MapPin,
  Plus,
  Rocket,
  Store,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import { MenuItem, Venue } from "@/data/mockVenues";
import {
  BusinessProfile,
  createVenueMenuItem,
  getBusinessProfile,
  saveBusinessProfile,
} from "@/lib/businessStore";

const DEMO_COVER = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&auto=format&fit=crop&q=85";
const DEMO_DISHES = [
  { name: "Фирменный бургер", description: "Говяжья котлета, сыр, овощи и фирменный соус", price: 3190, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80", category: "Основное" },
  { name: "Боул с цыплёнком", description: "Цыплёнок, сезонные овощи и свежая зелень", price: 2890, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80", category: "Основное" },
  { name: "Паста с томатами", description: "Домашняя паста, томатный соус и пармезан", price: 2990, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=700&auto=format&fit=crop&q=80", category: "Паста" },
];

const categoryOptions = [
  ["restaurants", "Ресторан"],
  ["coffee", "Кофейня"],
  ["burgers", "Бургеры и гриль"],
  ["pizza", "Пицца"],
  ["asian", "Азиатская кухня"],
  ["doner", "Донер и fast food"],
  ["desserts", "Десерты"],
];

interface DraftDish {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  complexityWeight: string;
}

const emptyDish = (): DraftDish => ({
  id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
  name: "",
  description: "",
  price: "",
  image: "",
  category: "Основное",
  complexityWeight: "2",
});

export default function BusinessSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [existingProfile, setExistingProfile] = useState<BusinessProfile | null>(null);
  const [error, setError] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    categorySlug: "restaurants",
    phone: "",
    email: "",
    address: "",
    description: "",
    prepTime: "20–30 мин",
    openingHours: "Ежедневно, 09:00–22:00",
    cover: "",
  });
  const [dishes, setDishes] = useState<DraftDish[]>([emptyDish()]);

  useEffect(() => setExistingProfile(getBusinessProfile()), []);

  const categoryName = categoryOptions.find(([slug]) => slug === form.categorySlug)?.[1] || "Ресторан";
  const validDishes = useMemo(() => dishes.filter((dish) => dish.name.trim() && Number(dish.price) > 0), [dishes]);

  const updateDish = (id: string, field: keyof DraftDish, value: string) => {
    setDishes((current) => current.map((dish) => dish.id === id ? { ...dish, [field]: value } : dish));
  };

  const fillDemoMenu = () => {
    setDishes(DEMO_DISHES.map((dish, index) => ({ ...dish, id: `demo-${Date.now()}-${index}`, price: String(dish.price), complexityWeight: String(index === 1 ? 3 : 2) })));
  };

  const handleCover = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Выберите изображение в формате JPG, PNG или WebP.");
      return;
    }
    if (file.size > 1_500_000) {
      setError("Для демо используйте изображение размером до 1,5 МБ.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, cover: String(reader.result) }));
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const validateStep = () => {
    if (step === 1 && (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.address.trim())) {
      setError("Заполните название, телефон, email и адрес заведения.");
      return false;
    }
    if (step === 2 && !form.cover) {
      setError("Добавьте обложку заведения или используйте демо-обложку.");
      return false;
    }
    if (step === 3 && validDishes.length === 0) {
      setError("Добавьте хотя бы одно блюдо с названием и ценой.");
      return false;
    }
    setError("");
    return true;
  };

  const goNext = () => {
    if (validateStep()) setStep((current) => Math.min(4, current + 1));
  };

  const publishVenue = (event: FormEvent) => {
    event.preventDefault();
    if (!form.cover || validDishes.length === 0) {
      setError("Добавьте обложку и хотя бы одно блюдо перед публикацией.");
      return;
    }
    setPublishing(true);
    const venueId = `business-${Date.now()}`;
    const menu: MenuItem[] = validDishes.map((dish) => createVenueMenuItem({
      name: dish.name.trim(),
      description: dish.description.trim() || "Фирменное блюдо заведения",
      price: Number(dish.price),
      image: dish.image || form.cover,
      category: dish.category || "Основное",
      popular: false,
      complexityWeight: Number(dish.complexityWeight),
    }));
    const venue: Venue = {
      id: venueId,
      name: form.name.trim(),
      category: categoryName,
      categorySlug: form.categorySlug,
      ratingScore: 5,
      ratingPercent: 100,
      reviewsCount: "новое",
      prepTime: form.prepTime,
      distance: "1.0 км",
      address: form.address.trim(),
      badgeTag: "Самовывоз",
      bonuses: "Без бонусов сейчас",
      bonusAmount: 0,
      bonusWindow: null,
      image: form.cover,
      tags: [categoryName, "Новое заведение", "Самовывоз"],
      lat: 43.238 + Math.random() * 0.018,
      lng: 76.93 + Math.random() * 0.03,
      menu,
    };
    saveBusinessProfile({
      venue,
      email: form.email.trim(),
      phone: form.phone.trim(),
      description: form.description.trim(),
      openingHours: form.openingHours,
      acceptsOrders: true,
      createdAt: new Date().toISOString(),
    });
    router.push("/business/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#202124]">
      <header className="border-b border-[#e8e8e8] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="grid h-10 w-10 place-items-center rounded-full bg-[#f4f4f4]" aria-label="Назад в каталог"><ArrowLeft className="h-5 w-5" /></Link>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#ffc244] text-xl font-black text-[#173f35]">Q</span>
              <div><p className="font-black text-[#173f35]">QoS Business</p><p className="text-xs text-[#777]">Подключение без ожидания</p></div>
            </div>
          </div>
          {existingProfile && <Link href="/business/dashboard" className="flex items-center gap-2 rounded-xl bg-[#e9f8f5] px-4 py-2.5 text-sm font-bold text-[#007e68]"><LayoutDashboard className="h-4 w-4" /> Открыть кабинет</Link>}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 max-w-3xl">
          <span className="inline-flex rounded-full bg-[#e9f8f5] px-3 py-1 text-xs font-extrabold text-[#007e68]">Публикация за несколько минут</span>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#173f35] sm:text-5xl">Добавьте заведение в QoS</h1>
          <p className="mt-3 text-base leading-7 text-[#5f6f6b]">Заполните данные, добавьте обложку и меню — заведение сразу появится в общем каталоге без проверки менеджером.</p>
        </div>

        <div className="mb-6 grid grid-cols-4 gap-2">
          {["Заведение", "Обложка", "Меню", "Публикация"].map((label, index) => {
            const number = index + 1;
            return <button key={label} type="button" onClick={() => number < step && setStep(number)} className={`rounded-xl px-2 py-3 text-xs font-bold sm:text-sm ${step === number ? "bg-[#00a082] text-white" : number < step ? "bg-[#e9f8f5] text-[#007e68]" : "bg-white text-[#888]"}`}><span className="hidden sm:inline">{number}. </span>{label}</button>;
          })}
        </div>

        <form onSubmit={publishVenue} className="rounded-[28px] border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-8">
          {step === 1 && (
            <section>
              <div className="mb-6 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e9f8f5] text-[#007e68]"><Store className="h-5 w-5" /></div><div><h2 className="text-xl font-black">Основные данные</h2><p className="text-sm text-[#777]">Эта информация появится в каталоге.</p></div></div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Название заведения" required><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Например, Urban Coffee" className="business-input" /></Field>
                <Field label="Категория" required><select value={form.categorySlug} onChange={(e) => setForm({ ...form, categorySlug: e.target.value })} className="business-input">{categoryOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
                <Field label="Телефон" required><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (707) 000-00-00" className="business-input" /></Field>
                <Field label="Email" required><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="owner@cafe.kz" className="business-input" /></Field>
                <Field label="Адрес" required className="md:col-span-2"><div className="relative"><MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00a082]" /><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Алматы, улица и номер дома" className="business-input pl-12" /></div></Field>
                <Field label="Описание" className="md:col-span-2"><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Расскажите о кухне и атмосфере" className="business-input min-h-24 resize-none" /></Field>
                <Field label="Время приготовления"><select value={form.prepTime} onChange={(e) => setForm({ ...form, prepTime: e.target.value })} className="business-input"><option>10–15 мин</option><option>15–20 мин</option><option>20–30 мин</option><option>30–40 мин</option></select></Field>
                <Field label="График"><input value={form.openingHours} onChange={(e) => setForm({ ...form, openingHours: e.target.value })} className="business-input" /></Field>
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <div className="mb-6 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#fff5d6] text-[#856500]"><ImagePlus className="h-5 w-5" /></div><div><h2 className="text-xl font-black">Обложка заведения</h2><p className="text-sm text-[#777]">Лучше всего подходит горизонтальное фото.</p></div></div>
              {form.cover ? <div className="relative overflow-hidden rounded-3xl"><img src={form.cover} alt="Предпросмотр обложки" className="aspect-[16/7] w-full object-cover" /><button type="button" onClick={() => setForm({ ...form, cover: "" })} className="absolute right-4 top-4 rounded-full bg-white p-2.5 shadow-lg"><Trash2 className="h-5 w-5" /></button></div> : <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#cfd7d4] bg-[#fafafa] text-center hover:border-[#00a082]"><ImagePlus className="h-9 w-9 text-[#00a082]" /><span className="mt-3 font-bold">Загрузить обложку</span><span className="mt-1 text-sm text-[#777]">JPG, PNG или WebP до 1,5 МБ</span><input type="file" accept="image/*" onChange={handleCover} className="hidden" /></label>}
              {!form.cover && <button type="button" onClick={() => setForm({ ...form, cover: DEMO_COVER })} className="mt-4 w-full rounded-xl bg-[#f3f3f3] px-4 py-3 text-sm font-bold">Использовать демо-обложку</button>}
            </section>
          )}

          {step === 3 && (
            <section>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#fff0f3] text-[#ff2d55]"><UtensilsCrossed className="h-5 w-5" /></div><div><h2 className="text-xl font-black">Меню</h2><p className="text-sm text-[#777]">Добавьте минимум одно блюдо.</p></div></div><button type="button" onClick={fillDemoMenu} className="rounded-xl bg-[#fff5d6] px-4 py-2.5 text-sm font-bold text-[#6c5200]">Заполнить тестовым меню</button></div>
              <div className="space-y-4">
                {dishes.map((dish, index) => <div key={dish.id} className="rounded-2xl border border-[#e5e5e5] p-4"><div className="mb-4 flex items-center justify-between"><p className="font-black">Блюдо {index + 1}</p>{dishes.length > 1 && <button type="button" onClick={() => setDishes((current) => current.filter((item) => item.id !== dish.id))} className="rounded-full p-2 text-[#ff2d55] hover:bg-[#fff0f3]"><Trash2 className="h-4 w-4" /></button>}</div><div className="grid gap-3 md:grid-cols-2"><input value={dish.name} onChange={(e) => updateDish(dish.id, "name", e.target.value)} placeholder="Название блюда" className="business-input" /><input type="number" min="1" value={dish.price} onChange={(e) => updateDish(dish.id, "price", e.target.value)} placeholder="Цена, ₸" className="business-input" /><input value={dish.category} onChange={(e) => updateDish(dish.id, "category", e.target.value)} placeholder="Категория меню" className="business-input" /><select value={dish.complexityWeight} onChange={(e) => updateDish(dish.id, "complexityWeight", e.target.value)} className="business-input"><option value="1">Лёгкая · 1 балл нагрузки</option><option value="2">Обычная · 2 балла нагрузки</option><option value="3">Средняя · 3 балла нагрузки</option><option value="4">Сложная · 4 балла нагрузки</option><option value="5">Очень сложная · 5 баллов нагрузки</option></select><input value={dish.image} onChange={(e) => updateDish(dish.id, "image", e.target.value)} placeholder="Ссылка на изображение (необязательно)" className="business-input md:col-span-2" /><textarea value={dish.description} onChange={(e) => updateDish(dish.id, "description", e.target.value)} placeholder="Описание" className="business-input min-h-20 resize-none md:col-span-2" /></div></div>)}
              </div>
              <button type="button" onClick={() => setDishes((current) => [...current, emptyDish()])} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#00a082] px-4 py-3 text-sm font-bold text-[#007e68]"><Plus className="h-4 w-4" /> Добавить блюдо</button>
            </section>
          )}

          {step === 4 && (
            <section>
              <div className="mb-6 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e9f8f5] text-[#007e68]"><Rocket className="h-5 w-5" /></div><div><h2 className="text-xl font-black">Всё готово к публикации</h2><p className="text-sm text-[#777]">Заведение появится в каталоге сразу после нажатия кнопки.</p></div></div>
              <div className="overflow-hidden rounded-3xl border border-[#e5e5e5]"><img src={form.cover} alt={form.name} className="aspect-[16/7] w-full object-cover" /><div className="p-5"><span className="rounded-full bg-[#e9f8f5] px-3 py-1 text-xs font-bold text-[#007e68]">{categoryName}</span><h3 className="mt-3 text-2xl font-black">{form.name}</h3><p className="mt-1 flex items-center gap-1.5 text-sm text-[#777]"><MapPin className="h-4 w-4" /> {form.address}</p><p className="mt-1 flex items-center gap-1.5 text-sm text-[#777]"><Clock3 className="h-4 w-4" /> {form.prepTime} · {form.openingHours}</p><div className="mt-5 grid gap-2 sm:grid-cols-2">{validDishes.map((dish) => <div key={dish.id} className="flex items-center justify-between rounded-xl bg-[#f7f7f7] p-3 text-sm"><span className="font-bold">{dish.name}</span><span>{Number(dish.price).toLocaleString()} ₸</span></div>)}</div></div></div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#e9f8f5] p-4 text-sm text-[#285b50]"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[#00a082]" /><p>После публикации вы попадёте в кабинет. Там можно принимать заказы, менять статусы, управлять меню и смотреть аналитику.</p></div>
            </section>
          )}

          {error && <p className="mt-5 rounded-xl bg-[#fff0f3] px-4 py-3 text-sm font-semibold text-[#c7193d]">{error}</p>}
          <div className="mt-7 flex items-center justify-between border-t border-[#eeeeee] pt-5">
            <button type="button" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1} className="rounded-xl px-4 py-3 text-sm font-bold disabled:invisible">Назад</button>
            {step < 4 ? <button type="button" onClick={goNext} className="flex items-center gap-2 rounded-xl bg-[#00a082] px-5 py-3 text-sm font-black text-white">Продолжить <ArrowRight className="h-4 w-4" /></button> : <button type="submit" disabled={publishing} className="flex items-center gap-2 rounded-xl bg-[#00a082] px-6 py-3 text-sm font-black text-white disabled:opacity-60"><Rocket className="h-4 w-4" /> {publishing ? "Публикуем…" : "Опубликовать и открыть кабинет"}</button>}
          </div>
        </form>
      </main>
    </div>
  );
}

function Field({ label, required, className = "", children }: { label: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return <label className={className}><span className="mb-1.5 block text-sm font-bold">{label}{required && <span className="text-[#ff2d55]"> *</span>}</span>{children}</label>;
}
