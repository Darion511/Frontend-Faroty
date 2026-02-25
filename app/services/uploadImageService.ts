import { getAuthHeadersWithoutContentType } from "./headersHelpers";

const UPLOAD_URL = "http://localhost:8081/api/upload";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${UPLOAD_URL}/image`, {
    method: "POST",
    headers: getAuthHeadersWithoutContentType(), // ✅ IMPORTANT
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erreur lors de l'upload de l'image");
  }

  const json = await response.json();
  return json.data?.url || json.url;
}
