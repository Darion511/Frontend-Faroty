import { Order } from "../types/Order";
import { getAuthHeaders } from "./headersHelpers";

const API_URL = "http://localhost:8081/api/orders";

export async function getAllOrders(): Promise<Order[]> {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
    next: { revalidate: 60 }, // cache 60 secondes
  });
  if (!response.ok) {
    throw new Error("Erreur lors du chargement");
  }

  const json = await response.json();
  return json.data;
}

export async function createOrder(order: Order): Promise<Order> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur lors de la création de la commande ",
    );
  }

  const json = await response.json();
  return json.data || json;
}

export async function modifyOrderStatus(
  id: string,
  order: Partial<Order>,
): Promise<Order> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        "Erreur lors de la mise à jour du statut de la commande",
    );
  }
  const json = await response.json();
  return json.data || json;
}
