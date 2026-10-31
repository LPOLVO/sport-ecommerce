export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  description: string;
  longDescription: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sizes: string[];
  colors: string[];
  specs: Record<string, string>;
  badge?: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  color?: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponApplied?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  icon?: string;
  description?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful?: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  maxDiscount?: number;
  expiryDate: string;
  description: string;
  usageLimit?: number;
  used?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  rewardPoints: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  wishlist: string[];
  lastSpinDate?: string;
  spinsRemaining: number;
  joinedDate: string;
}

export interface SpinReward {
  id: string;
  type: 'coupon' | 'points' | 'freeShipping';
  value: string | number;
  label: string;
  color: string;
  probability: number;
}

export interface WheelSpin {
  id: string;
  userId: string;
  rewardId: string;
  reward: SpinReward;
  timestamp: string;
  claimed: boolean;
}
