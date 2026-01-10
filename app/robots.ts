import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://surfstrength.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/workouts", "/workouts/", "/success"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
