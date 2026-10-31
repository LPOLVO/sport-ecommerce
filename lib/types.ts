export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNew: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  text: string;
  verified: boolean;
  helpful: number;
  date: string;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
  }>;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxUses: number;
  currentUses: number;
  minPurchase?: number;
  expiresAt: string;
  description: string;
}

export interface WheelReward {
  id: string;
  type: 'coupon' | 'points' | 'free_shipping';
  value: string | number;
  probability: number;
  label: string;
  color: string;
}
