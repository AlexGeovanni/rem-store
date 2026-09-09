export const imageService = {
  upload: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("No se pudo subir la imagen");
    }

    const data = (await response.json()) as { url?: string; error?: string };

    if (!data.url) {
      throw new Error(data.error ?? "La respuesta no contiene una URL válida");
    }

    return data.url;
  },
};
