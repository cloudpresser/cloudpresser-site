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
  const entries = items
    .map(
      (item) => `
  <entry>
    <title>${escapeXml(item.title)}</title>
    <link href="${item.url}" />
    <id>${item.url}</id>
    <published>${item.published}</published>
    <updated>${item.published}</updated>
    <summary>${escapeXml(item.summary)}</summary>
  </entry>`,
    )
    .join("\n");

  const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(FEED_TITLE)}</title>
  <subtitle>${escapeXml(FEED_DESCRIPTION)}</subtitle>
  <link href="${FEED_URL}" />
  <link href="${SITE_URL}/atom.xml" rel="self" />
  <id>${FEED_URL}</id>
  <updated>${updated}</updated>${entries}
</feed>
`;

  return new Response(atom, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
