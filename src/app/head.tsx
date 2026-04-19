export default function Head() {
  return (
    <>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="CloudPresser RSS Feed"
        href="/rss.xml"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title="CloudPresser Atom Feed"
        href="/atom.xml"
      />
    </>
  );
}
