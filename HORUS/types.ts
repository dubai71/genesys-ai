export type Screen = 'login' | 'dashboard' | 'inventory' | 'sales' | 'chat' | 'entry' | 'settings' | 'profile';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  isLowStock?: boolean;
}

export interface SaleItem {
  product: Product;
  quantity: number;
}