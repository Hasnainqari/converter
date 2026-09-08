import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const b = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    "/",
    "/jpg-to-webp",
    "/png-to-jpg",
    "/heic-to-jpg",
    "/webp-to-jpg",
    "/png-to-webp",
    "/compress-image",
    "/resize-image",
    "/image-to-pdf",
    "/pricing",
  ].map((p) => ({
    url: b + p,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
