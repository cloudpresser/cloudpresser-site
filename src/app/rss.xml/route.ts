import {
  escapeXml,
  FEED_DESCRIPTION,
  FEED_TITLE,
  FEED_URL,
  getFeedItems,
  SITE_URL,
} from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  const items = getFeedItems();
  const updated = items[0]?.published ?? new Date().toISOString();
  const rssItems = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <pubDate>${new Date(item.published).toUTCString()}</pubDate>
      <description>${escapeXml(item.summary)}</description>
${item.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${FEED_URL}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>${rssItems}
  </channel>
</rss>
`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
