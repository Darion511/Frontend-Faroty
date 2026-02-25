import { Message } from "../types/message";

import { getAuthHeaders } from "./headersHelpers";

const API_URL = "http://localhost:8081/api/messages";

export async function getAllMessage(): Promise<Message[]> {
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

export async function CreateMessage(
  message: Partial<Message>,
): Promise<Message> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(message),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur lors de la création du message ",
    );
  }

  const json = await response.json();
  return json.data || json;
}

export async function deleteMessage(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur lors de la suppression du message",
    );
  }
}
