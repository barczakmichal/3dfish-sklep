export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: Category;
  images: string[];
  features: string[];
  material: string;
  weight: string;
  dimensions: string;
  printTime: string;
  inStock: boolean;
  badge?: "nowość" | "bestseller" | "promocja";
  rating: number;
  reviewCount: number;
}

export type Category =
  | "uchwyty"
  | "organizery"
  | "sygnalizatory"
  | "podporki"
  | "narzedzia"
  | "akcesoria";

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  notes: string;
}
