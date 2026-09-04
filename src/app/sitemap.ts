import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { catalogItems } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ui.thinkai.studio";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/r/registry.json`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.9,
    },
  ];

  try {
    const registryPath = path.resolve("public/r/registry.json");
    if (fs.existsSync(registryPath)) {
      const componentRoutes: MetadataRoute.Sitemap = catalogItems.map((item) => ({
        url: `${baseUrl}/docs/${item.kind}/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
      return [...staticRoutes, ...componentRoutes];
    }
  } catch {
    // Fallback if registry not ready
  }

  return staticRoutes;
}
