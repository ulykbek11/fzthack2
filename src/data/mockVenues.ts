export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  popular?: boolean;
}

export interface Venue {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  ratingScore: number;
  ratingPercent: number;
  reviewsCount: string;
  prepTime: string;
  distance: string;
  address: string;
  badgeTag: string;
  bonuses: string;
  bonusAmount: number;
  bonusWindow: string | null;
  image: string;
  tags: string[];
  lat: number;
  lng: number;
  menu: MenuItem[];
}

type RawVenue = [string, string, string, number, number, number, number];

// Выборка организаций Алматы получена через Places API 2ГИС 19.09.2026.
// Названия, адреса, координаты, рейтинги и число отзывов взяты из ответа API.
const rawVenues: RawVenue[] = [
  ["70000001021119686", "Ziyafet Steak House", "ул. Желтоксан, 172", 43.238684, 76.942003, 4.9, 551],
  ["70000001096804127", "Renee cafe", "пр. Назарбаева, 220/3", 43.239168, 76.949355, 4.9, 1715],
  ["9429940000797330", "Line Brew", "пр. Назарбаева, 187а", 43.241251, 76.948046, 4.9, 1124],
  ["9429940001666193", "Nedelka", "пр. Абая, 19", 43.24342, 76.953382, 4.9, 2649],
  ["70000001098476962", "Zere restaurant", "пр. Абая, 10а", 43.241993, 76.94798, 4.7, 257],
  ["70000001029224506", "Хосе и Josper", "ул. Желтоксан, 162", 43.244484, 76.941241, 4.8, 1420],
  ["70000001084456166", "Arabica city cafe", "ул. Наурызбай батыра, 127 блок 1", 43.236827, 76.938269, 4.9, 1024],
  ["70000001038205162", "Lugo bar", "ул. Тимирязева, 1а", 43.233653, 76.937806, 4.9, 3351],
  ["70000001055319350", "Chechil", "пр. Сейфуллина, 617", 43.233508, 76.934492, 4.8, 3033],
  ["70000001017359164", "Harat’s Irish Pub", "пр. Аль-Фараби, 7 блок 5а", 43.230382, 76.947112, 4.9, 132],
  ["70000001039986429", "Мята Platinum", "пр. Абая, 26г", 43.241522, 76.938713, 4.8, 1713],
  ["70000001052408859", "Six Coffee+Wine", "пр. Абая, 17", 43.243281, 76.953818, 4.9, 5563],
  ["70000001035014267", "Friendly", "пр. Достык, 89г", 43.237495, 76.956818, 4.9, 2525],
  ["70000001020401745", "Бочонок", "пр. Назарбаева, 193", 43.239899, 76.948295, 4.7, 805],
  ["70000001091773590", "Tomchi", "пр. Абая, 47", 43.242511, 76.942445, 4.6, 825],
  ["9429940000786240", "Cafeteria", "ул. Байсеитовой, 32", 43.244383, 76.944884, 4.8, 875],
  ["70000001112491007", "Mist city cafe", "пр. Назарбаева, 223", 43.232728, 76.9476, 4.9, 399],
  ["70000001068736870", "The Банка Bar", "ул. Желтоксан, 148", 43.247138, 76.940859, 4.8, 809],
  ["70000001100070853", "tao tao", "пр. Абая, 8а", 43.242282, 76.948981, 4.8, 1148],
  ["9429940000852197", "Kish-Mish", "ул. Каныша Сатпаева, 18в", 43.237717, 76.938073, 4.8, 840],
  ["70000001028643779", "Пекинская Утка", "ул. Каныша Сатпаева, 3", 43.23926, 76.950642, 4.9, 162],
  ["70000001047914609", "Medovic", "пр. Абая, 35/37", 43.242857, 76.947478, 4.8, 1479],
  ["9429940001141548", "Теплица", "ул. Курмангазы, 25", 43.245482, 76.954458, 4.9, 1276],
  ["70000001041455023", "Harvey’s pub & grill", "пр. Назарбаева, 223", 43.232787, 76.949199, 4.9, 830],
  ["9429940001683326", "La Barca Fish & Wine", "пр. Абылай хана, 145", 43.243993, 76.942533, 4.9, 242],
  ["70000001031507411", "Mongol Bar", "ул. Курмангазы, 43", 43.244878, 76.947125, 4.8, 1255],
  ["70000001090818975", "Libera Restaurant & Terrace", "ул. Каныша Сатпаева, 4а", 43.238987, 76.955343, 4.9, 713],
  ["9429940001144717", "Coffeeroom", "пр. Назарбаева, 220", 43.239213, 76.949983, 4.7, 255],
  ["70000001104378233", "Lavka by Proshenkov", "пр. Аль-Фараби, 15/1 к5в", 43.230723, 76.94488, 4.8, 624],
  ["70000001094742446", "Megafish", "пр. Абая, 30а", 43.241154, 76.935331, 4.8, 2300],
  ["70000001090141934", "Trattoria", "пр. Назарбаева, 220", 43.239239, 76.950357, 4.9, 64],
  ["70000001086700592", "Каусар", "мкр. Самал-1, 2Б", 43.237163, 76.956926, 4.9, 8536],
  ["70000001082541601", "Jameson Camp", "пр. Абылай хана, 141", 43.244884, 76.942038, 4.9, 292],
  ["9429940000913844", "Белый слон", "пр. Назарбаева, 226", 43.233497, 76.950326, 4.9, 303],
  ["70000001088771538", "Akami", "ул. Курмангазы, 66", 43.244189, 76.942311, 4.9, 164],
  ["70000001029895467", "Cafe Leffe", "пр. Достык, 168/2", 43.233614, 76.95937, 4.9, 1687],
  ["70000001059420089", "Chicago Pizza & Burgers", "ул. Курмангазы, 54", 43.244414, 76.945342, 4.9, 1483],
  ["9429940000825785", "Del Papa", "ул. Кабанбай батыра, 83", 43.250083, 76.946929, 4.9, 896],
  ["70000001115184364", "Table", "пр. Абылай хана, 112/116", 43.245827, 76.942819, 4.8, 52],
  ["70000001094198050", "Giardino", "ул. Курмангазы, 79", 43.24426, 76.936649, 4.9, 1735],
  ["70000001116548857", "Pikapika", "ул. Юрия Померанцева, 5", 43.233356, 76.943344, 4.4, 32],
  ["70000001033784044", "Sydyk", "ул. Желтоксан, 155", 43.244535, 76.940768, 4.8, 815],
  ["70000001101780768", "Soul kitchen", "ул. Каныша Сатпаева, 16а", 43.237646, 76.93981, 4.8, 187],
  ["70000001038688037", "Friends bar & terrace", "пр. Сейфуллина, 617", 43.23314, 76.935367, 4.8, 1822],
  ["70000001031134923", "Crystal Karaoke", "пр. Аль-Фараби, 7 к5а", 43.230226, 76.947195, 4.7, 1209],
  ["70000001062008372", "Mood karaoke & terrace", "пр. Сейфуллина, 617", 43.234215, 76.93608, 4.9, 681],
  ["70000001041538101", "Trendy", "ул. Байтурсынова, 98", 43.238966, 76.928457, 4.9, 1942],
  ["70000001059741772", "Sky17", "ул. Наурызбай батыра, 99/1", 43.245204, 76.93719, 4.7, 746],
  ["70000001058707630", "Театралка", "пр. Абылай хана, 96", 43.248369, 76.942512, 4.8, 1772],
  ["70000001045303704", "Gaucho Grill", "пр. Сейфуллина, 577", 43.246369, 76.933263, 4.9, 581],
];

const venueImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=82",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=82",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop&q=82",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&auto=format&fit=crop&q=82",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=82",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&auto=format&fit=crop&q=82",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=82",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200&auto=format&fit=crop&q=82",
];

const dishImages = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=700&auto=format&fit=crop&q=80",
];

function getCategory(name: string, index: number) {
  const value = name.toLowerCase();
  if (value.includes("coffee") || value.includes("arabica") || value.includes("cafe")) return ["Кофе и завтраки", "coffee"];
  if (value.includes("pizza") || value.includes("trattoria") || value.includes("del papa")) return ["Пицца", "pizza"];
  if (value.includes("утка") || value.includes("akami") || value.includes("tao") || value.includes("pikapika")) return ["Азиатская", "asian"];
  if (value.includes("grill") || value.includes("steak") || value.includes("burger")) return ["Бургеры и гриль", "burgers"];
  return index % 5 === 0 ? ["Кафе", "coffee"] : ["Рестораны", "restaurants"];
}

function buildMenu(venueId: string): MenuItem[] {
  const dishes = [
    ["Боул с цыплёнком", "Сезонные овощи, нежный цыплёнок и фирменная заправка", 2890],
    ["Фирменный бургер", "Говяжья котлета, сыр, свежие овощи и соус", 3190],
    ["Пицца Маргарита", "Томаты, моцарелла, базилик и оливковое масло", 3490],
    ["Паста с томатами", "Домашняя паста, томатный соус и пармезан", 2990],
  ] as const;
  return dishes.map((dish, index) => ({
    id: `${venueId}-${index + 1}`,
    name: dish[0],
    description: dish[1],
    price: dish[2],
    image: dishImages[index],
    category: index === 2 ? "Пицца" : "Основное",
    popular: index < 2,
  }));
}

export const mockVenuesData: Venue[] = rawVenues.map((item, index) => {
  const [id, name, address, lat, lng, rating, reviews] = item;
  const [category, categorySlug] = getCategory(name, index);
  const hasBonusSlot = index % 3 !== 1;
  const bonusAmount = hasBonusSlot ? 120 + (index % 4) * 40 : 0;
  return {
    id, name, category, categorySlug, ratingScore: rating,
    ratingPercent: Math.round(rating * 20),
    reviewsCount: reviews > 999 ? `${(reviews / 1000).toFixed(1)}k` : String(reviews),
    prepTime: `${15 + (index % 3) * 5}–${25 + (index % 4) * 5} мин`,
    distance: `${(0.3 + (index % 12) * 0.2).toFixed(1)} км`,
    address,
    badgeTag: "Самовывоз",
    bonuses: hasBonusSlot ? `+${bonusAmount} в тихий час` : "Без бонусов сейчас",
    bonusAmount,
    bonusWindow: hasBonusSlot ? (index % 2 ? "15:00–17:00" : "10:00–12:00") : null,
    image: venueImages[index % venueImages.length],
    tags: [category, "Предзаказ", "Самовывоз"],
    lat, lng,
    menu: buildMenu(id),
  };
});

export const catalogCategories = [
  { slug: "all", name: "Все", iconKey: "all" },
  { slug: "restaurants", name: "Рестораны", iconKey: "all" },
  { slug: "coffee", name: "Кофе и завтраки", iconKey: "coffee" },
  { slug: "burgers", name: "Бургеры и гриль", iconKey: "burgers" },
  { slug: "pizza", name: "Пицца", iconKey: "pizza" },
  { slug: "asian", name: "Азиатская", iconKey: "asian" },
];
