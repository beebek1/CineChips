const IMAGE_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

export const getCoverUrl = (filename?: string) => {
  if (!filename) return "https://picsum.photos/500/750?random=1";
  if (filename.startsWith("http")) return filename;
  return `${IMAGE_BASE}/uploads/${filename}`;
};

export const formatYear = (iso?: string) =>
  iso ? new Date(iso).getFullYear() : "—";

export const formatDate = (iso?: string) =>
  iso
    ? new Date(iso)
        .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
        .toUpperCase()
    : "—";
