import { redirect } from "next/navigation";
import { getCurrentUser } from "./authService";

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export function requireAuth() {
  const token = getToken();

  try {
    if (token) {
      getCurrentUser();
    } else {
      redirect("/login");
    }
  } catch (e) {
    console.log("Please login : ", e);
    redirect("/login");
  }

  return token;
}

// Fonction utilitaire pour les headers avec authentification
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
export function getAuthHeadersWithoutContentType() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}
