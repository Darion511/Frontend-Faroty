const API_URL = "http://localhost:8080/api/auth";

interface BackendError {
  message?: string;
  errors?: {
    detail?: string;
  };
  status?: number;
  timestamp?: string;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  let data: unknown = null;

  // Vérifier si le backend renvoie du contenu
  const text = await response.text();

  if (text) {
    data = JSON.parse(text);
  }

  if (!response.ok) {
    const errorData = data as BackendError;

    const errorMessage =
      errorData?.message ||
      errorData?.errors?.detail ||
      `Erreur ${response.status}`;

    throw new Error(errorMessage);
  }

  return data;
}
