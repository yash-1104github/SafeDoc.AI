const API_URL = import.meta.env.VITE_API_URL;

export async function uploadImage(file) {

  const form = new FormData();
  form.append("image", file);

  const res = await fetch(`${API_URL}/api/mask-pii`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error("Failed to upload");

  const blob = await res.blob();

  return URL.createObjectURL(blob);
}
