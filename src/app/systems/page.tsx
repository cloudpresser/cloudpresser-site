import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Production AI systems by Luiz Ozorio — orchestration, retrieval, supervision, and platform infrastructure.",
};

interface System {
  title: string;
  problem: string;
  system: string;
  control: string;
  outcome: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
}

const systems: System[] = [
  {
    title: "Control-Surface Reliability System",
    problem:
      "A system judged safe once is not therefore reliable in production. Agentic decision workflows need telemetry, reconciliation, and operator intervention after deployment, not just a passing eval in staging.",
    system:
      "`control-surface-agent` is a bounded supervision system for agentic decisions: explicit intent framing, explicit planning, live telemetry, evidence review, reconciliation, operator controls, and a final decision artifact in one interface.",
    control:
      "Reliability is maintained as a closed loop. Structured telemetry captures each step, reconciliation checks divergence between plan and reality, and operator feedback can redirect execution before the artifact is finalized.",
    outcome:
      "A concrete production-reliability artifact that makes supervised runs legible, auditable, and correctable instead of hiding them inside chat transcripts.",
    tags: [
      "Control Surfaces",
      "AI Reliability",
      "Telemetry",
      "Reconciliation",
      "Human-in-the-Loop",
    ],
    link: "https://github.com/cloudpresser/control-surface-agent",
    linkLabel: "GitHub",
  },
  {
    title: "AI PR Generation System",
    problem:
      "Manual PR authoring was the primary bottleneck across the engineering org — slow cycle times, inconsistent quality, high context-switching cost.",
    system:
      "End-to-end pipeline from user story to production-ready PR: code generation, test/lint execution, and automated review gating.",
    control:
      "Execution-time evals at each stage. Feedback from review failures loops back into prompt and system tuning — a closed control loop, not a one-shot pipeline.",
    outcome:
      "~3x increase in throughput to production. PR authoring time reduced by 93%, code review time by 80%.",
    tags: [
      "LLMOps",
      "RAG",
      "MCP",
      "Evals",
      "DevOps",
      "Cursor",
      "Aider",
    ],
  },
  {
    title: "Distributed AI Ingestion Pipeline",
    problem:
      "Large-document ingestion was unreliable — failures were silent, partial ingestion corrupted retrieval quality, and there was no visibility into pipeline state.",
    system:
      "Queue-based chunking with distributed workers and dead-letter queues. Designed for long-document ingestion into knowledge systems used by retrieval pipelines.",
    control:
      "Data validation gates at ingestion boundaries. Retrieval evals measure downstream quality — ingestion failures surface as retrieval regressions, not silent corruption.",
    outcome:
      "Stable, observable ingestion for large-scale knowledge systems. Eliminated silent failures and improved retrieval grounding quality.",
    tags: [
      "AI Platform",
      "RAG",
      "Distributed Systems",
      "Queue Architecture",
      "Evals",
    ],
  },
  {
    title: "Agent Execution + Supervision System",
    problem:
      "Agent workflows were opaque — no way to trace execution, intervene mid-task, or debug failures after the fact.",
    system:
      "Real-time supervision interface for AI agent execution (OpenCode). Server management, streaming chat, terminal emulation, git viewer, and file annotations. 37+ PRs shipped in 2 weeks.",
    control:
      "Execution tracing across every layer. Human-in-the-loop checkpoints for approval, redirection, and abort. Full session replay for post-hoc debugging.",
    outcome:
      "Debuggable, controllable agent workflows. Engineers can observe, intervene, and approve agent execution in real time.",
    tags: [
      "AI Agent Supervision",
      "React Native",
      "TypeScript",
      "Observability",
      "Mobile",
    ],
    link: "https://github.com/cloudpresser/react-native-opencode-client",
    linkLabel: "GitHub",
  },
  {
    title: "Cross-Platform Financial Analysis Platform",
    problem:
      "A Windows-only desktop application needed to reach 5 platforms without fragmenting the engineering team or codebase.",
    system:
      "Single React Native codebase serving macOS, Linux, Windows, iOS, and Android. CI/CD automation, OTA updates, and platform-specific build infrastructure for a 25-engineer org.",
    control:
      "Automated release pipelines with platform-specific validation gates. Deployment infrastructure reduced release friction by 98%.",
    outcome:
      "Release cadence increased 300%. Platform coverage expanded from 1 to 5 with no team fragmentation.",
    tags: [
      "Platform Engineering",
      "React Native",
      "TypeScript",
      "C#/.NET",
      "CI/CD",
      "Architecture",
    ],
  },
];

export default function SystemsPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-serif text-[2.25rem] sm:text-[3rem] leading-[1.1] font-semibold tracking-tight text-foreground">
          Systems
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Selected production AI systems I&apos;ve designed and built.
        </p>
      </section>

      <div className="space-y-10">
        {systems.map((s) => (
          <article
            key={s.title}
            className="group border-b border-border pb-10 last:border-0 last:pb-0"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="font-serif text-xl sm:text-[1.625rem] font-semibold text-foreground leading-snug">
                    {s.title}
                  </h2>
                </div>
                {s.link && (
                  <Link
                    href={s.link}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0 underline underline-offset-4 decoration-border"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.linkLabel || "Link"}
                  </Link>
                )}
              </div>

              <dl className="space-y-3 text-[0.9375rem] leading-relaxed">
                <div>
                  <dt className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1">
                    Problem
                  </dt>
                  <dd className="text-muted-foreground">{s.problem}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1">
                    System
                  </dt>
                  <dd className="text-muted-foreground">{s.system}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1">
                    Control
                  </dt>
                  <dd className="text-muted-foreground">{s.control}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1">
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
    </div>
  );
}
