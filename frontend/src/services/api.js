
export async function uploadImage(file) {

  const form = new FormData();
  form.append("image", file);

  const res = await fetch("/api/mask-pii", {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error("Failed to upload");

  const blob = await res.blob();

  return URL.createObjectURL(blob);
}
