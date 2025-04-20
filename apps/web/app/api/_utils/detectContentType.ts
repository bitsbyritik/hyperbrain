import { Metadata } from "unfurl.js/dist/types";

export function detectContentType(
  meta: Metadata,
  url: string,
): "article" | "video" | "pdf" | "others" {
  const ogType = meta?.open_graph?.type?.toLowerCase();
  const currUrl = url.toLowerCase();

  if (currUrl.endsWith(".pdf")) return "pdf";
  if (
    ogType?.includes("video") ||
    currUrl.includes("youtube") ||
    currUrl.endsWith(".mp4")
  )
    return "video";

  if (
    ogType === "article" ||
    ogType === "website" ||
    currUrl.includes("notion")
  )
    return "article";

  return "others";
}
