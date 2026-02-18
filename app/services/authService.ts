// Backend: AuthenticationController @RequestMapping("/auth"), server.port=8081
const API_URL = "http://localhost:8081/auth";

export interface LoginResponse {
  token: string;
  expiresIn: number;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

interface BackendError {
  message?: string;
  errors?: { detail?: string };
}

// LOGIN
export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  } catch (err) {
    const msg =
      err instanceof TypeError &&
      (err as Error).message?.toLowerCase().includes("fetch")
        ? "Impossible de contacter le serveur. Vérifiez que le backend est démarré (port 8081) ou réessayez."
        : err instanceof Error
          ? err.message
          : "Erreur de connexion";
    throw new Error(msg);
  }

  let data: unknown = null;
  const text = await response.text();

  if (text) {
    try {
      data = JSON.parse(text) as ApiResponse<LoginResponse> | BackendError;
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const err = data as BackendError;
    const errorMessage =
      err?.message ||
      (err as ApiResponse<unknown>)?.message ||
      (err as { errors?: { detail?: string } })?.errors?.detail ||
      `Erreur ${response.status}`;
    throw new Error(errorMessage);
  }

  const successData = (data as ApiResponse<LoginResponse>).data;
  if (!successData?.token) {
    throw new Error("Réponse invalide du serveur (token manquant)");
  }
  localStorage.setItem("token", successData.token);
  localStorage.setItem(
    "expiresIn",
    (Date.now() + successData.expiresIn * 1000).toString(),
  );
  return successData;
}

// LOGOUT
export const logout = async () => {
  try {
    const user = await getCurrentUser(); // Vérifier si le token est valide avant de tenter le logout
    // (OPTIONNEL) appel backend si tu as un endpoint logout
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ email: user.email, password: user.password }), // ou juste {} selon ton backend
    });

    clearAuthData();
  } catch (error) {
    console.error("Erreur logout :", error);
  }
};

// Nettoyer les données d'authentification
function clearAuthData(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
}

// Vérifier si l'utilisateur est authentifié
export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  if (!token) return false;

  // Vérifier l'expiration du token
  const expiresIn = localStorage.getItem("expiresIn");
  if (expiresIn) {
    const expirationTime = parseInt(expiresIn, 10);
    if (Date.now() > expirationTime) {
      clearAuthData();
      return false;
    }
  }

  return true;
}

// Obtenir les informations de l'utilisateur
export async function getCurrentUser(): Promise<any> {
  const response = await fetch("http://localhost:8081/api/admins/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors du filtrage");
  }

  const json = await response.json();
  return json.data;
}
