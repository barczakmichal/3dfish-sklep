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
  makerWorldUrl: string;
  makerWorldModelId: string;
  designer: string;
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

export type OrderStatus =
  | "nowe"
  | "oplacone"
  | "w_druku"
  | "wysłane"
  | "dostarczone"
  | "anulowane";

export interface OrderItem {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: OrderForm;
  payment: string;
  subtotal: number;
  deliveryCost: number;
  codFee: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  statusHistory: { status: OrderStatus; timestamp: string; note?: string }[];
}

export interface PrintInfo {
  productId: string;
  stlSource: string;
  stlFileName: string;
  slicerProfile: string;
  filamentType: string;
  filamentBrand: string;
  nozzleTemp: number;
  bedTemp: number;
  infill: string;
  supports: boolean;
  estimatedTime: string;
  notes: string;
}
