import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const BASE_URL = "https://cloudpresser.com";
const lastmodManifestPath = path.join(process.cwd(), "generated", "lastmod.json");

function readLastmodManifest(): Record<string, string> {
  try {
    if (!fs.existsSync(lastmodManifestPath)) {
      return {};
    }

    return JSON.parse(fs.readFileSync(lastmodManifestPath, "utf8")) as Record<string, string>;
  } catch {
    return {};
  }
}

function getLastModified(
  manifest: Record<string, string>,
  route: string,
  fallback?: string,
): Date | undefined {
  if (manifest[route]) {
    return new Date(manifest[route]);
  }

  if (fallback) {
    return new Date(fallback);
  }

  return undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const lastmodManifest = readLastmodManifest();

  const postUrls = posts.map((post) => ({
    url: `${BASE_URL}/writing/${post.slug}`,
    lastModified: getLastModified(lastmodManifest, `/writing/${post.slug}`, post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: getLastModified(lastmodManifest, "/"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/control-systems-for-ai`,
      lastModified: getLastModified(lastmodManifest, "/control-systems-for-ai"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/systems`,
      lastModified: getLastModified(lastmodManifest, "/systems"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified: getLastModified(lastmodManifest, "/writing"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postUrls,
  ];
}
