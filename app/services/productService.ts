import { Product } from "../types/product";
import { getAuthHeaders } from "./headersHelpers";

const API_URL = "http://localhost:8081/api/products";

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

export async function getProductById(id: string | undefined): Promise<Product> {
  const response = await fetch(`${API_URL}/id/${id}`);

  if (!response.ok) {
    throw new Error("Erreur lors du filtrage");
  }

  const json = await response.json();
  return json.data;
}

export async function createProduct(
  product: Partial<Product>,
): Promise<Product> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur lors de la création du produit",
    );
  }

  const json = await response.json();
  return json.data || json;
}

export async function updateProduct(
  id: string,
  product: Partial<Product>,
): Promise<Product> {
  console.log(id);
  // console.log(product);
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur lors de la mise à jour du produit",
    );
  }

  const json = await response.json();
  return json.data || json;
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur lors de la suppression du produit",
    );
  }
}
