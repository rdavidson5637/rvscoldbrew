import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menu", "/order", "/rewards", "/builder", "/process", "/contact"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/menu" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
