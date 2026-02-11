import {
  Wallet,
  Car,
  PiggyBank,
  ShoppingCart,
  Building2,
  Calendar,
  Utensils,
  Accessibility,
  Home,
  Gift,
  Gamepad2,
  Smartphone,
  TreePine,
  Monitor,
  FileText,
  TrendingUp,
  Briefcase,
  Heart,
  Zap,
  Film,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  wallet: Wallet,
  car: Car,
  "piggy-bank": PiggyBank,
  "shopping-cart": ShoppingCart,
  building: Building2,
  calendar: Calendar,
  utensils: Utensils,
  accessibility: Accessibility,
  home: Home,
  gift: Gift,
  gamepad: Gamepad2,
  smartphone: Smartphone,
  tree: TreePine,
  monitor: Monitor,
  file: FileText,
  "trending-up": TrendingUp,
  briefcase: Briefcase,
  heart: Heart,
  zap: Zap,
  film: Film,
};

const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    badge: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    badge: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    badge: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-600",
    badge: "bg-pink-100 text-pink-700 hover:bg-pink-100",
  },
  rose: {
    bg: "bg-rose-100",
    text: "text-rose-600",
    badge: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    badge: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    badge: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    badge: "bg-red-100 text-red-700 hover:bg-red-100",
  },
  teal: {
    bg: "bg-teal-100",
    text: "text-teal-600",
    badge: "bg-teal-100 text-teal-700 hover:bg-teal-100",
  },
  lime: {
    bg: "bg-lime-100",
    text: "text-lime-600",
    badge: "bg-lime-100 text-lime-700 hover:bg-lime-100",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    badge: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
};

export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || Wallet;
}

export function getColorClasses(colorName: string): {
  bg: string;
  text: string;
  badge: string;
} {
  return (
    colorMap[colorName] || {
      bg: "bg-secondary",
      text: "text-muted-foreground",
      badge: "bg-secondary text-foreground hover:bg-secondary",
    }
  );
}

export const iconOptions = Object.entries(iconMap).map(([id, icon]) => ({
  id,
  icon,
}));

export const colorOptions = [
  { id: "green", bg: "bg-green-500", ring: "ring-green-500" },
  { id: "blue", bg: "bg-blue-500", ring: "ring-blue-500" },
  { id: "purple", bg: "bg-purple-500", ring: "ring-purple-500" },
  { id: "pink", bg: "bg-pink-500", ring: "ring-pink-500" },
  { id: "rose", bg: "bg-rose-500", ring: "ring-rose-500" },
  { id: "orange", bg: "bg-orange-500", ring: "ring-orange-500" },
  { id: "amber", bg: "bg-amber-500", ring: "ring-amber-500" },
];
