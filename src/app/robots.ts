import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the admin dashboard out of search results.
      disallow: ["/admin", "/api"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
