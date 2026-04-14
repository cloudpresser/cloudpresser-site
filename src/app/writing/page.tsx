import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Blog posts by Luiz Ozorio on AI systems, control architecture, and engineering.",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-serif text-[2.25rem] sm:text-[3rem] leading-[1.1] font-semibold tracking-tight text-foreground">
          Writing
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Writing on production AI systems, control loops, and reliable
          execution.
        </p>
      </section>

      {posts.length === 0 ? (
        <p className="text-muted-foreground italic">Posts coming soon.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link
                href={`/writing/${post.slug}`}
                className="block space-y-2"
              >
                <div className="flex items-baseline gap-3 flex-wrap">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                  {post.series && (
                    <p className="text-xs text-muted-foreground/60 font-mono">
                      {post.series}
                      {post.seriesPart ? ` #${post.seriesPart}` : ""}
                    </p>
                  )}
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {post.description}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
