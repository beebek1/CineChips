const IMAGE_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

export const getCoverUrl = (
  filename?: string,
  fallbackId?: string | number,
) => {
  if (!filename)
    return `https://picsum.photos/300/450?random=${fallbackId ?? 99}`;
  if (filename.startsWith("http")) return filename;
  return `${IMAGE_BASE}/uploads/${filename}`;
};

export const formatReleaseDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatReleaseYear = (iso?: string) => {
  if (!iso) return "";
  return new Date(iso).getFullYear();
};
