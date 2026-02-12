import { Product } from "../types/product";

const API_URL = "http://localhost:8080/api/products";

// Fonction utilitaire pour obtenir le token
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Fonction utilitaire pour les headers avec authentification
const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Récupérer tous les produits
export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
    next: { revalidate: 60 }, // cache 60 secondes
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des produits");
  }

  const json = await response.json();
  return json.data || json;
}

// Alias pour fetchProducts (compatibilité)
export const fetchProducts = getAllProducts;

// Récupérer les produits par catégorie
export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const response = await fetch(`${API_URL}/category/${category}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erreur lors du filtrage par catégorie");
  }

  const json = await response.json();
  return json.data || json;
}

// Récupérer un produit par ID
export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement du produit");
  }

  const json = await response.json();
  return json.data || json;
}

// Supprimer un produit
export async function deleteProduct(id: number): Promise<void> {
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

// Créer un nouveau produit
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

// Mettre à jour un produit
export async function updateProduct(
  id: number,
  product: Partial<Product>,
): Promise<Product> {
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

// Rechercher des produits
export async function searchProducts(query: string): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(query)}`,
    {
      headers: getAuthHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche de produits");
  }

  const json = await response.json();
  return json.data || json;
}
