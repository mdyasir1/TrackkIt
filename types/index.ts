// types/index.ts
export type ID = string;

export interface User {
  id: ID;
  storeName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: ID;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: ID;
  company: string;
  model: string;
  category?: Category | null;
  categoryId?: string | null;
  quantity: number;
  price: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: ID;
  inventoryId: string;
  inventory?: InventoryItem;
  quantity: number;
  totalPrice: number;
  soldAt: string;
  userId: string;
}

export interface AuthRegisterInput {
  storeName: string;
  email: string;
  password: string;
}

export interface AuthLoginInput {
  email: string;
  password: string;
}

export interface InventoryCreateInput {
  company: string;
  model: string;
  categoryId?: string | null;
  quantity: number;
  price: number;
}

export interface InventoryUpdateInput {
  company?: string;
  model?: string;
  categoryId?: string | null;
  quantity?: number;
  price?: number;
}

export interface SaleCreateInput {
  inventoryId: string;
  quantity: number;
  totalPrice: number;
}
