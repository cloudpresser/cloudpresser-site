import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/posts";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CursorSpotlightCard } from "@/components/ui/cursor-spotlight-card";
import { PipelineSequence } from "@/components/ui/pipeline-sequence";

const HOME_URL = "https://cloudpresser.com";
const THESIS_URL = `${HOME_URL}/control-systems-for-ai`;
const SYSTEMS_URL = `${HOME_URL}/systems`;
const WRITING_URL = `${HOME_URL}/writing`;

const homeDescription =
  "Luiz Ozorio builds AI systems and agent infrastructure for production reliability, with a focus on orchestration, evals, observability, control surfaces, and human supervision. CloudPresser's core thesis is that reliable AI systems should be built as supervised control systems, not chat systems.";

export const metadata: Metadata = {
  title: "Luiz Ozorio",
  description: homeDescription,
  alternates: {
    canonical: HOME_URL,
  },
  keywords: [
    "AI systems",
    "AI agents",
    "agent architecture",
    "LLM infrastructure",
    "LLMOps",
    "orchestration",
    "evals",
    "observability",
    "control systems",
    "human-in-the-loop",
    "supervised AI execution",
    "intelligent software",
  ],
  openGraph: {
    title: "Luiz Ozorio",
    description: homeDescription,
    url: HOME_URL,
    siteName: "CloudPresser",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luiz Ozorio",
    description: homeDescription,
  },
};

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
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${HOME_URL}/#person`,
      name: "Luiz Ozorio",
      url: HOME_URL,
      description: homeDescription,
      jobTitle: "Staff AI Systems Engineer",
      sameAs: [
        "https://github.com/cloudpresser",
        "https://www.linkedin.com/in/luiz-ozorio/",
        "https://www.npmjs.com/~cloudpresser",
      ],
      knowsAbout: [
        "AI systems",
        "AI agents",
        "agent architecture",
        "LLM infrastructure",
        "LLMOps",
        "orchestration",
        "evals",
        "observability",
        "OpenTelemetry",
        "control systems",
        "human-in-the-loop systems",
        "supervised AI execution",
        "intelligent software",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${HOME_URL}/#website`,
      name: "CloudPresser",
      url: HOME_URL,
      description:
        "CloudPresser is a thesis and artifact stack on reliable AI systems, arguing that agent architecture should be built as a supervised control system with orchestration, verification, observability, control surfaces, and human supervision.",
      author: {
        "@id": `${HOME_URL}/#person`,
      },
      about: [
        {
          "@type": "Thing",
          name: "AI systems",
        },
        {
          "@type": "Thing",
          name: "Agent architecture",
        },
        {
          "@type": "Thing",
          name: "Control systems",
        },
        {
          "@type": "Thing",
          name: "Supervised AI execution",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${HOME_URL}/#profile-page`,
      url: HOME_URL,
      name: "Luiz Ozorio",
      description: homeDescription,
      isPartOf: {
        "@id": `${HOME_URL}/#website`,
      },
      mainEntity: {
        "@id": `${HOME_URL}/#person`,
      },
      significantLink: [THESIS_URL, SYSTEMS_URL, WRITING_URL],
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="pt-12 pb-4 sm:pt-20 sm:pb-8 lg:pt-32">
        {/* Eyebrow */}
        <ScrollReveal delay={0}>
          <p className="text-sm font-mono text-muted-foreground/70 mb-4 tracking-wide lg:mb-6">
            Staff AI Systems Engineer
          </p>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={100}>
          <h1 className="font-serif text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] leading-[1.08] font-semibold tracking-tight text-foreground max-w-4xl lg:max-w-none">
            I design and build
            <br className="lg:hidden" />
            <span className="hidden lg:inline"> </span>
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              production AI systems.
            </span>
          </h1>
        </ScrollReveal>

        {/* Subtext */}
        <ScrollReveal delay={200}>
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl leading-relaxed text-muted-foreground max-w-[640px] lg:max-w-4xl xl:max-w-5xl lg:mt-8">
            End-to-end AI platforms with control loops across every layer.
            <br className="hidden sm:inline lg:hidden" />
            <span className="hidden lg:inline"> </span>
            Built for reliability, observability, and real-world execution.
          </p>
        </ScrollReveal>

        {/* Pipeline Visual */}
        <ScrollReveal delay={300}>
          <div className="mt-5 space-y-2">
            <PipelineSequence />
            <Link
              href="/control-systems-for-ai"
              className="inline-block text-xs text-muted-foreground/60 hover:text-primary transition-colors underline underline-offset-4 decoration-border/60 hover:decoration-primary"
            >
              Read the full control systems thesis →
            </Link>
          </div>
        </ScrollReveal>

        {/* Proof */}
        <ScrollReveal delay={400}>
          <div className="mt-10 space-y-1 text-[0.9375rem] text-muted-foreground">
            <p>
              Sr Software Architect @{" "}
              <span className="text-foreground font-medium">VectorVest</span>
            </p>
            <p>
              Built AI-assisted engineering systems → ~3x throughput to production
            </p>
          </div>
        </ScrollReveal>

        {/* Action Block */}
        <ScrollReveal delay={500}>
          <div className="mt-10 space-y-4">
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="#systems"
                className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-5 h-10 text-sm font-medium transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                View Systems
              </Link>
              <Link
                href="/writing"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 h-10 text-sm font-medium transition-all hover:bg-muted hover:text-foreground hover:scale-[1.02] active:scale-[0.98]"
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
        </ScrollReveal>
      </section>

      {/* What I Do */}
      <section className="space-y-5">
        <ScrollReveal>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Most AI systems fail in production.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-muted-foreground leading-relaxed max-w-[640px]">
            Not because the model is wrong — but because the system has no control
            loop.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-foreground leading-relaxed">
            I build AI platforms that:
          </p>
          <ul className="space-y-2.5 text-muted-foreground leading-relaxed mt-2.5">
            {[
              "orchestrate end-to-end workflows (retrieval → inference → tools)",
              "define a source of truth (evals, golden datasets)",
              "trace execution across every layer (OpenTelemetry, replay)",
              "enforce verification at execution time (tests, outputs, tool validation)",
              "expose supervision interfaces for human control",
            ].map((item, index) => (
              <li key={index} className="flex gap-2.5 group">
                <span className="text-primary shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <p className="text-foreground font-medium pt-2">
            This is LLMOps as a system, not just model integration.
          </p>
        </ScrollReveal>
      </section>

      {/* Selected Systems */}
      <section id="systems" className="scroll-mt-16 space-y-8">
        <ScrollReveal>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Selected Systems
            </h2>
            <p className="mt-2 text-muted-foreground text-[0.9375rem]">
              Production AI systems I&apos;ve designed and built.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
          {featuredSystems.map((s, idx) => (
            <ScrollReveal key={s.title} delay={idx * 100} className="h-full">
              <CursorSpotlightCard className="h-full rounded-2xl border border-transparent hover:border-border/50 transition-colors">
                <article className="group relative -mx-4 lg:mx-0 h-full p-4 transition-all hover:bg-muted/40 sm:p-6">
                  <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-[1.625rem] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
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

                  <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                    {s.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs font-normal transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                </article>
              </CursorSpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <Link
            href="/systems"
            className="inline-flex items-center text-sm text-primary font-medium hover:text-primary/80 transition-colors group"
          >
            <span className="underline underline-offset-4 decoration-primary/40 group-hover:decoration-primary/80">
              View all systems
            </span>
            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </ScrollReveal>
      </section>

      {/* Thesis */}
      <section className="space-y-5">
        <ScrollReveal>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            AI systems in production behave like control systems.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="font-mono text-sm text-muted-foreground">
            intent → orchestration → execution → verification → supervision
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="space-y-4 text-muted-foreground leading-relaxed max-w-[640px]">
            <p>Failures come from:</p>
            <ul className="space-y-2">
              {[
                "misaligned intent (did we deliver value?)",
                "weak retrieval / context quality",
                "lack of observability across system layers",
                "missing or delayed feedback loops"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2.5 group">
                  <span className="text-primary shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-foreground font-medium pt-2">
              My focus is making these systems reliable, measurable, and
              controllable.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Focus Areas */}
      <section className="space-y-4">
        <ScrollReveal>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Focus Areas
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <Badge
                key={area}
                variant="secondary"
                className="text-sm font-normal px-3 py-1.5 transition-all hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5"
              >
                {area}
              </Badge>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Writing */}
      <section className="space-y-6">
        <ScrollReveal>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Writing
            </h2>
            <p className="mt-2 text-muted-foreground text-[0.9375rem]">
              I write about building reliable AI systems in production.
            </p>
          </div>
        </ScrollReveal>

        {posts.length > 0 && (
          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            {posts.map((post, idx) => (
              <ScrollReveal key={post.slug} delay={idx * 100} className="h-full">
                <CursorSpotlightCard className="h-full rounded-xl border border-transparent hover:border-border/50 transition-colors">
                  <article className="group -mx-4 lg:mx-0 h-full p-4 transition-all hover:bg-muted/40">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="flex flex-col h-full space-y-2.5"
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
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          {post.description}
                        </p>
                      )}
                    </Link>
                  </article>
                </CursorSpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal>
          <Link
            href="/writing"
            className="inline-flex items-center text-sm text-primary font-medium hover:text-primary/80 transition-colors group mt-2"
          >
            <span className="underline underline-offset-4 decoration-primary/40 group-hover:decoration-primary/80">
              Read more
            </span>
            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </ScrollReveal>
      </section>

      {/* Close / CTA */}
      <section className="border-t border-border pt-12 space-y-6 mb-12">
        <ScrollReveal>
          <div className="space-y-3 max-w-[560px]">
            <p className="text-foreground leading-relaxed">
              If you&apos;re building AI platforms, agent systems, or production
              LLM features where correctness, observability, and control matter —
            </p>
            <p className="text-foreground font-medium">let&apos;s talk.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-3">
            <Link
              href="mailto:luiz@cloudpresser.com"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-5 h-10 text-sm font-medium transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              Email me
            </Link>
            <Link
              href="https://www.linkedin.com/in/luiz-ozorio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 h-10 text-sm font-medium transition-all hover:bg-muted hover:text-foreground hover:scale-[1.02] active:scale-[0.98]"
            >
              Connect on LinkedIn
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
