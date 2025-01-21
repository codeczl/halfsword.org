import type { MetadataRoute } from "next";

const BASE_URL = 'https://halfsword.org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/category/*", 
        "/article/*", 
        "/changelog",
        "/zh/*",  // 允许中文页面
        "/en/*"   // 允许英文页面
      ],
      disallow: [
        "/api/*", 
        "/admin/*",
        "/_next/*",
        "/static/*"
      ]
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
