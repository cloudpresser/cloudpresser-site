import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const BASE_URL = "https://cloudpresser.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${BASE_URL}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postUrls,
  ];
}
