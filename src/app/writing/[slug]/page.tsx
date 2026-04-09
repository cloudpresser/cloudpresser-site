import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllPostSlugs,
  getPostBySlug,
  getAdjacentSeriesPosts,
  SERIES_NAME,
  SERIES_DEFINITION,
} from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { SeriesNav } from "@/components/series-nav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const url = `https://cloudpresser.com/writing/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: ["Luiz Ozorio"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const isSeriesPost = post.series === SERIES_NAME;
  const { prev, next } = isSeriesPost
    ? getAdjacentSeriesPosts(slug)
    : { prev: null, next: null };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Luiz Ozorio",
      url: "https://cloudpresser.com",
    },
    publisher: {
      "@type": "Person",
      name: "Luiz Ozorio",
      url: "https://cloudpresser.com",
    },
    url: `https://cloudpresser.com/writing/${slug}`,
    keywords: post.tags,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cloudpresser.com/writing/${slug}`,
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mb-10 space-y-4">
        <h1 className="font-serif text-[2rem] sm:text-[2.75rem] sm:leading-[1.1] font-semibold tracking-tight text-foreground text-wrap-balance">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.series && (
            <>
              <span className="text-border">|</span>
              <span className="font-mono text-xs text-muted-foreground/60">
                {post.series}
                {post.seriesPart
                  ? ` — Part ${post.seriesPart} of ${SERIES_DEFINITION.filter((e) => !e.isBoundary).length}`
                  : ""}
              </span>
            </>
          )}
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Series traversal: prev/next arrows + full series nav */}
      {isSeriesPost && (
        <div className="mt-16 space-y-8">
          {/* Prev / Next arrows */}
          {(prev || next) && (
            <nav
              aria-label="Previous and next posts in series"
              className="flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                {prev && (
                  <Link
                    href={`/writing/${prev.slug}`}
                    className="group inline-flex flex-col gap-1"
                  >
                    <span className="text-xs text-muted-foreground">
                      &larr; Previous
                    </span>
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {prev.layer}
                    </span>
                  </Link>
                )}
              </div>
              <div className="flex-1 text-right">
                {next && (
                  <Link
                    href={`/writing/${next.slug}`}
                    className="group inline-flex flex-col gap-1 items-end"
                  >
                    <span className="text-xs text-muted-foreground">
                      Next &rarr;
                    </span>
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {next.layer}
                    </span>
                  </Link>
                )}
              </div>
            </nav>
          )}

          {/* Full series navigation */}
          <SeriesNav currentSlug={slug} />
        </div>
      )}

      <footer className="border-t border-border pt-6 mt-16">
        <p className="text-sm text-muted-foreground">
          Luiz Ozorio builds control systems for intelligent software —
          orchestration pipelines, execution tracing, and supervision interfaces
          where humans direct AI agents.
        </p>
        <div className="mt-4">
          <Link
            href="/writing"
            className="text-sm text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
          >
            All posts
          </Link>
        </div>
      </footer>
    </article>
  );
}
