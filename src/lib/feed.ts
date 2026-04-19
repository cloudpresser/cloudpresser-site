import { getAllPosts } from "@/lib/posts";

export const SITE_URL = "https://cloudpresser.com";
export const FEED_TITLE = "CloudPresser";
export const FEED_URL = `${SITE_URL}/writing`;
export const FEED_DESCRIPTION =
  "Writing from Luiz Ozorio on AI systems, agent architecture, LLM infrastructure, observability, evals, and supervised control systems for reliable intelligent software.";

export interface FeedItem {
  title: string;
  url: string;
  published: string;
  summary: string;
  tags: string[];
}

export function getFeedItems(): FeedItem[] {
  return getAllPosts().map((post) => ({
    title: post.title,
    url: `${SITE_URL}/writing/${post.slug}`,
    published: new Date(post.date).toISOString(),
    summary: post.description,
    tags: post.tags,
  }));
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
