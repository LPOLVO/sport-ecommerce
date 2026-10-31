import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cart } from '../types/product';

interface CartStore {
  items: CartItem[];
  couponCode?: string;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  getCart: (products: any[]) => Cart;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: undefined,

      addItem: (item: CartItem) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId && i.size === item.size
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (productId: string, size: string) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.size === size)
          ),
        })),

      updateQuantity: (productId: string, size: string, quantity: number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.size === size
              ? { ...i, quantity: Math.max(0, quantity) }
              : i
          ).filter(i => i.quantity > 0),
        })),

      applyCoupon: (code: string) =>
        set({ couponCode: code }),

      removeCoupon: () =>
        set({ couponCode: undefined }),

      clearCart: () =>
        set({ items: [], couponCode: undefined }),

      getCart: (products: any[]) => {
        const state = get();
        let subtotal = 0;

        state.items.forEach((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (product) {
            subtotal += product.price * item.quantity;
          }
        });

        const discount = state.couponCode ? calculateDiscount(subtotal, state.couponCode) : 0;
        const tax = Number(((subtotal - discount) * 0.08).toFixed(2));
        const shipping = subtotal > 100 ? 0 : 10;

        return {
          items: state.items,
          subtotal: Number(subtotal.toFixed(2)),
          tax,
          shipping,
          discount: Number(discount.toFixed(2)),
          total: Number((subtotal - discount + tax + shipping).toFixed(2)),
          couponApplied: state.couponCode,
        };
      },
    }),
    {
      name: 'cart-store',
      version: 1,
    }
  )
);

function calculateDiscount(subtotal: number, couponCode: string): number {
  const couponMap: Record<string, { type: 'percentage' | 'fixed'; value: number; min: number }> = {
    WELCOME10: { type: 'percentage', value: 10, min: 50 },
    SAVE20: { type: 'percentage', value: 20, min: 100 },
    FREESHIP: { type: 'fixed', value: 15, min: 75 },
    SUMMER25: { type: 'percentage', value: 25, min: 150 },
    SPIN10: { type: 'percentage', value: 10, min: 0 },
    SPIN20: { type: 'percentage', value: 20, min: 0 },
    SPIN5: { type: 'percentage', value: 5, min: 0 },
  };

  const coupon = couponMap[couponCode.toUpperCase()];
  if (!coupon || subtotal < coupon.min) return 0;

  return coupon.type === 'percentage'
    ? (subtotal * coupon.value) / 100
    : coupon.value;
}
