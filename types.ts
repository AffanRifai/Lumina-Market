
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSED = 'Processed',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  address: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export type AuthMode = 'login' | 'signup' | null;
