import { Payment, PaymentCash } from "../types/order";
import { BASE_IP, getAuthHeaders } from "./headersHelpers";

const API_URL = `http://${BASE_IP.dev}/api/payments`;
// const API_URL = "http://192.168.1.105:8081/api/payments";

export async function getAllPayment(): Promise<Payment[]> {
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
export async function createPayment(orderId: string): Promise<Payment> {
  const response = await fetch(`${API_URL}/generate/${orderId}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderId),
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

export async function createCashPayment(
  payment: PaymentCash,
): Promise<Payment> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payment),
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
  status: string,
): Promise<Payment> {
  const response = await fetch(`${API_URL}/status/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(status),
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
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de la catégorie");
  }
}
