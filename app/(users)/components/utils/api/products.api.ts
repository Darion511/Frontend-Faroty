import { apiClient } from "../apiClient";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand?: string;
  category?: string;
}

export function getAllProducts() {
  return apiClient.get<Product[]>("/api/products");
}

export function getProductById(id: number) {
  return apiClient.get<Product>(`/api/products/${id}`);
}
