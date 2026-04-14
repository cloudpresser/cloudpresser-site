import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/posts";

const featuredSystems = [
  {
    title: "AI PR Generation System",
    problem:
      "Manual PR authoring was the primary bottleneck across the engineering org.",
    system: "User story → code → tests/lint → review gate.",
    control:
      "Execution-time evals + feedback loop into prompts and system tuning.",
    outcome: "~3x increase in throughput to production.",
    tags: ["LLMOps", "RAG", "MCP", "Evals"],
  },
  {
    title: "Distributed AI Ingestion Pipeline",
    problem:
      "Large-document ingestion was unreliable — silent failures corrupted retrieval quality.",
    system: "Queue-based chunking + distributed workers + DLQ.",
    control: "Data validation + retrieval evals.",
    outcome:
      "Stable ingestion for large-scale knowledge systems.",
    tags: ["AI Platform", "RAG", "Distributed Systems", "Evals"],
  },
  {
    title: "Agent Execution + Supervision System",
    problem:
      "Agent workflows were opaque — no tracing, no intervention, no post-hoc debugging.",
    system:
      "Real-time supervision interface for AI agent execution (OpenCode).",
    control:
      "Execution tracing + human-in-the-loop checkpoints.",
    outcome:
      "Debuggable, controllable agent workflows.",
    tags: ["AI Agent Supervision", "Observability", "TypeScript"],
  },
];

const focusAreas = [
  "AI Platform Engineering / LLMOps",
  "Retrieval systems + evaluation (RAG, grounding)",
  "Agent orchestration + workflows",
  "Observability + tracing (OpenTelemetry)",
  "Execution-time verification + eval systems",
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero */}
      <section className="pt-12 pb-4 sm:pt-20 sm:pb-8">
        {/* Eyebrow */}
        <p className="text-sm font-mono text-muted-foreground/70 mb-4 tracking-wide">
          Staff AI Systems Engineer
        </p>

        {/* Headline */}
        <h1 className="font-serif text-[2.5rem] sm:text-[3.5rem] leading-[1.08] font-semibold tracking-tight text-foreground">
          I design and build
          <br />
          <span className="text-primary">production AI systems.</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-[640px]">
          End-to-end AI platforms with control loops across every layer.
          <br className="hidden sm:inline" />
          Built for reliability, observability, and real-world execution.
        </p>

        {/* Pipeline Visual */}
        <div className="mt-5 space-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-muted-foreground">
            {[
              "intent",
              "orchestration",
              "execution",
              "verification",
              "supervision",
            ].map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md text-sm tracking-tight">
                  {step}
                </span>
                {i < 4 && (
                  <span className="text-border text-xs select-none">
                    &rarr;
                  </span>
                )}
              </span>
            ))}
          </div>
          <Link
            href="/control-systems-for-ai"
            className="inline-block text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-4 decoration-border/60 hover:decoration-muted-foreground"
          >
            Read the full control systems thesis →
          </Link>
        </div>

        {/* Proof */}
        <div className="mt-10 space-y-1 text-[0.9375rem] text-muted-foreground">
          <p>
            Sr Software Architect @{" "}
            <span className="text-foreground font-medium">VectorVest</span>
          </p>
          <p>
            Built AI-assisted engineering systems → ~3x throughput to production
          </p>
        </div>

        {/* Action Block */}
        <div className="mt-10 space-y-4">
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="#systems"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 h-9 text-sm font-medium transition-colors hover:bg-primary/90"
            >
              View Systems
            </Link>
            <Link
              href="/writing"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-9 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              Read Writing
            </Link>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            {[
              { href: "https://github.com/cloudpresser", label: "GitHub" },
              {
                href: "https://www.linkedin.com/in/luiz-ozorio/",
                label: "LinkedIn",
              },
              { href: "https://www.npmjs.com/~cloudpresser", label: "npm" },
              { href: "mailto:luiz@cloudpresser.com", label: "Email" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="space-y-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Most AI systems fail in production.
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-[640px]">
          Not because the model is wrong — but because the system has no control
          loop.
        </p>
        <p className="text-foreground leading-relaxed">
          I build AI platforms that:
        </p>
        <ul className="space-y-2.5 text-muted-foreground leading-relaxed">
          <li className="flex gap-2.5">
            <span className="text-primary shrink-0 mt-0.5">—</span>
            <span>
              orchestrate end-to-end workflows (retrieval → inference → tools)
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="text-primary shrink-0 mt-0.5">—</span>
            <span>
              define a source of truth (evals, golden datasets)
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="text-primary shrink-0 mt-0.5">—</span>
            <span>
              trace execution across every layer (OpenTelemetry, replay)
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="text-primary shrink-0 mt-0.5">—</span>
            <span>
              enforce verification at execution time (tests, outputs, tool
              validation)
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="text-primary shrink-0 mt-0.5">—</span>
            <span>expose supervision interfaces for human control</span>
          </li>
        </ul>
        <p className="text-foreground font-medium">
          This is LLMOps as a system, not just model integration.
        </p>
      </section>

      {/* Selected Systems */}
      <section id="systems" className="scroll-mt-16 space-y-8">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Selected Systems
          </h2>
          <p className="mt-2 text-muted-foreground text-[0.9375rem]">
            Production AI systems I&apos;ve designed and built.
          </p>
        </div>

        <div className="space-y-10">
          {featuredSystems.map((s) => (
            <article
              key={s.title}
              className="border-b border-border pb-10 last:border-0 last:pb-0"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-[1.625rem] font-semibold text-foreground leading-snug">
                    {s.title}
                  </h3>
                </div>

                <dl className="space-y-2.5 text-[0.9375rem] leading-relaxed">
                  <div>
                    <dt className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-0.5">
                      Problem
                    </dt>
                    <dd className="text-muted-foreground">{s.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-0.5">
                      System
                    </dt>
                    <dd className="text-muted-foreground">{s.system}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-0.5">
                      Control
                    </dt>
                    <dd className="text-muted-foreground">{s.control}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-0.5">
                      Outcome
                    </dt>
                    <dd className="text-foreground font-medium">{s.outcome}</dd>
                  </div>
                </dl>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {s.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/systems"
          className="inline-block text-sm text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
        >
          View all systems →
        </Link>
      </section>

      {/* Thesis */}
      <section className="space-y-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          AI systems in production behave like control systems.
        </h2>
        <p className="font-mono text-sm text-muted-foreground">
          intent → orchestration → execution → verification → supervision
        </p>
        <div className="space-y-4 text-muted-foreground leading-relaxed max-w-[640px]">
          <p>Failures come from:</p>
          <ul className="space-y-2">
            <li className="flex gap-2.5">
              <span className="text-primary shrink-0 mt-0.5">—</span>
              <span>misaligned intent (did we deliver value?)</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-primary shrink-0 mt-0.5">—</span>
              <span>weak retrieval / context quality</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-primary shrink-0 mt-0.5">—</span>
              <span>lack of observability across system layers</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-primary shrink-0 mt-0.5">—</span>
              <span>missing or delayed feedback loops</span>
            </li>
          </ul>
          <p className="text-foreground font-medium">
            My focus is making these systems reliable, measurable, and
            controllable.
          </p>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Focus Areas
        </h2>
        <div className="flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <Badge
              key={area}
              variant="secondary"
              className="text-sm font-normal px-3 py-1.5"
            >
              {area}
            </Badge>
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Writing
          </h2>
          <p className="mt-2 text-muted-foreground text-[0.9375rem]">
            I write about building reliable AI systems in production.
          </p>
        </div>

        {posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link
                  href={`/writing/${post.slug}`}
                  className="block space-y-1.5"
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
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.description}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}

        <Link
          href="/writing"
          className="inline-block text-sm text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
        >
          Read more →
        </Link>
      </section>

      {/* Close / CTA */}
      <section className="border-t border-border pt-12 space-y-6">
        <div className="space-y-3 max-w-[560px]">
          <p className="text-foreground leading-relaxed">
            If you&apos;re building AI platforms, agent systems, or production
            LLM features where correctness, observability, and control matter —
          </p>
          <p className="text-foreground font-medium">let&apos;s talk.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="mailto:luiz@cloudpresser.com"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 h-9 text-sm font-medium transition-colors hover:bg-primary/90"
          >
            Email me
          </Link>
          <Link
            href="https://www.linkedin.com/in/luiz-ozorio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 h-9 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          >
            Connect on LinkedIn
          </Link>
        </div>
      </section>
    </div>
  );
}
