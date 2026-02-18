import { Category } from "../types/product";
import { getAuthHeaders } from "./headersHelpers";

const API_URL = "http://localhost:8081/api/categories";

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(API_URL, {
    next: { revalidate: 60 }, // cache 60 secondes
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des catégories");
  }
  const json = await response.json();
  return json.data;
}
export async function getCategoryById(id: string): Promise<Category> {
  const response = await fetch(`${API_URL}/id/${id}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de la catégorie");
  }
  const json = await response.json();
  return json.data;
}

export async function createCategory(
  category: Partial<Category>,
): Promise<Category> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur lors de la création de la catégorie",
    );
  }
  const json = await response.json();
  return json.data || json;
}

export async function deleteCategory(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de la catégorie");
  }
}
