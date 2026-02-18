import { Payment } from "../types/Order";

const API_URL = "http://localhost:8081/api/payment";

export async function getAllPayment(): Promise<Payment[]> {
  const response = await fetch(API_URL, {
    next: { revalidate: 60 }, // cache 60 secondes
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement");
  }

  const json = await response.json();
  return json.data;
}
export async function createPayment(order: Payment): Promise<Payment> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur lors de la création du payment",
    );
  }

  const json = await response.json();
  return json.data || json;
}
export async function modifyPaymentStatus(
  id: string,
  order: Partial<Payment>,
): Promise<Payment> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur lors de la mise à jour du statut du payment",
    );
  }
  const json = await response.json();
  return json.data || json;
}
export async function deletePayment(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de la catégorie");
  }
}
