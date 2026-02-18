import { statistics } from "../types/statistics";
import { getAuthHeaders } from "./headersHelpers";

const API_URL = "http://localhost:8081/api/statistics/sales";

export async function getStatistics(): Promise<statistics> {
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
