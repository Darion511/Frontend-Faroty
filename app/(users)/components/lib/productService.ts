import { Product } from "../../types/product";

const API_URL = "http://localhost:8080/api/products";

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    next: { revalidate: 60 }, // cache 60 secondes
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement");
  }

  const json = await response.json();
  return json.data;
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const response = await fetch(`${API_URL}/category/${category}`);

  if (!response.ok) {
    throw new Error("Erreur lors du filtrage");
  }

  return response.json();
}
