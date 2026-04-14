import type { Metadata } from "next";
import Link from "next/link";
import { getSeriesPosts, SERIES_NAME } from "@/lib/posts";

const url = "https://cloudpresser.com/control-systems-for-ai";
const description =
  "AI agents aren't chatbots. They're control systems. A series mapping the architecture — execution, verification, observability, control surfaces, and human supervision.";

export const metadata: Metadata = {
  title: SERIES_NAME,
  description,
  alternates: { canonical: url },
  openGraph: {
    title: SERIES_NAME,
    description,
    url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SERIES_NAME,
    description,
  },
};

export default function ControlSystemsPage() {
  const series = getSeriesPosts();
  const coreEntries = series.filter((e) => !e.isBoundary);
  const boundaryEntries = series.filter((e) => e.isBoundary);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Thesis */}
      <section className="pt-8 sm:pt-12 space-y-6">
        <h1 className="font-serif text-[2.25rem] sm:text-[3rem] leading-[1.1] font-semibold tracking-tight text-foreground text-wrap-balance">
          {SERIES_NAME}
        </h1>
        <div className="space-y-4 text-muted-foreground leading-relaxed max-w-[640px]">
          <p>
            AI agents aren&apos;t chatbots. They&apos;re control systems — with
            the same architectural requirements as robotics and industrial
            automation: execution, verification, observability, control surfaces,
            and human supervision.
          </p>
          <p className="text-sm text-muted-foreground/80">
            This is a system, not a collection of posts. Each layer builds on
            the previous.
          </p>
        </div>
      </section>

      {/* Pipeline visual */}
      <section>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-muted-foreground">
          {[
            "strong model generates",
            "constrained verification checks",
            "observability instruments",
            "control surface presents",
            "human supervises",
          ].map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md text-xs tracking-tight">
                {step}
              </span>
              {i < 4 && (
                <span className="text-border text-xs select-none">&rarr;</span>
              )}
            </span>
          ))}
        </div>
      </section>

      {/* The Stack */}
      <section className="space-y-8">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
          The Stack
        </h2>

        <ol className="space-y-6">
          {coreEntries.map((entry) => (
            <li key={entry.slug} className="flex gap-4">
              <div className="flex flex-col items-center shrink-0 pt-1">
                <span className="font-mono text-xs text-muted-foreground w-4 text-right">
                  {entry.part}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-mono text-xs text-muted-foreground">
                    {entry.layer}
                  </span>
                </div>
                {entry.isPublished ? (
                  <Link
                    href={`/writing/${entry.slug}`}
                    className="block group"
                  >
                    <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      {entry.description}
                    </p>
                  </Link>
                ) : (
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-muted-foreground/40 leading-snug">
                      {entry.title}
                    </h3>
                    <p className="text-xs text-muted-foreground/30 mt-1">
                      Coming soon
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Boundary condition */}
        {boundaryEntries.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="border-t border-dashed border-border" />
            {boundaryEntries.map((entry) => (
              <div key={entry.slug} className="flex gap-4">
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <span className="font-mono text-xs text-muted-foreground/40 w-4 text-right" />
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {entry.layer}
                  </span>
                  {entry.isPublished ? (
                    <Link
                      href={`/writing/${entry.slug}`}
                      className="block group"
                    >
                      <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        {entry.description}
                      </p>
                    </Link>
                  ) : (
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-muted-foreground/40 leading-snug">
                        {entry.title}
                      </h3>
                      <p className="text-xs text-muted-foreground/30 mt-1">
                        Coming soon
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Author */}
      <section className="border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          Luiz Ozorio is a Staff AI Systems Engineer building production AI
          platforms — orchestration, evals, observability, and supervision for
          reliable LLM systems.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/writing"
            className="text-sm text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
          >
            All writing
          </Link>
          <Link
            href="/"
            className="text-sm text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
          >
            About
          </Link>
        </div>
      </section>
    </div>
  );
}
