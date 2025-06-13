import { Product } from "@/types/product";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant: string;
  size?: string;
  price: number;
  discount?: number;
  totalCartValue?: number;
  totalPrice?: number;
  totalDiscount?: number;
}

export interface CartState {
  items: CartItem[];
  appliedCoupon?: Coupon | null;
}

export type Coupon = {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
};
