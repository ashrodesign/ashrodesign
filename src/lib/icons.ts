import {
  MapPin,
  LayoutGrid,
  SlidersHorizontal,
  BarChart3,
  HeartHandshake,
  ShoppingBag,
  Mail,
  MessageSquare,
  Megaphone,
  Search,
  Palette,
  PhoneCall,
  ClipboardList,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/** Stable keys used throughout the data layer to reference an icon. */
export type IconKey =
  | "market"
  | "everything"
  | "customize"
  | "measure"
  | "invested"
  | "web"
  | "email"
  | "sms"
  | "social"
  | "google"
  | "graphic"
  | "book"
  | "plan"
  | "build"
  | "grow";

export const Icons: Record<IconKey, LucideIcon> = {
  market: MapPin,
  everything: LayoutGrid,
  customize: SlidersHorizontal,
  measure: BarChart3,
  invested: HeartHandshake,
  web: ShoppingBag,
  email: Mail,
  sms: MessageSquare,
  social: Megaphone,
  google: Search,
  graphic: Palette,
  book: PhoneCall,
  plan: ClipboardList,
  build: Rocket,
  grow: TrendingUp,
};
