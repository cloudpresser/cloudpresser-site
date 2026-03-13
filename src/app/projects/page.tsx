import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects by Luiz Ozorio.",
};

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
}

const projects: Project[] = [
  {
    title: "React Native OpenCode Client",
    description:
      "Full-featured mobile supervision interface for the OpenCode AI coding agent. Server management, real-time chat streaming, terminal emulation (xterm.js), git viewer, and file annotations. 37+ PRs shipped in 2 weeks.",
    tags: [
      "React Native",
      "TypeScript",
      "AI Agent Supervision",
      "xterm.js",
      "Mobile",
    ],
    link: "https://github.com/cloudpresser/react-native-opencode-client",
    linkLabel: "GitHub",
  },
  {
    title: "Cross-Platform Financial Analysis App",
    description:
      "Founding architect and tech lead. Expanded from a Windows-only desktop app to 5 platforms (macOS, Linux, Windows, iOS, Android) with a single React Native codebase. Boosted release cadence by 300% and automated deployments 98% faster.",
    tags: [
      "React Native",
      "TypeScript",
      "C#/.NET",
      "Cross-Platform",
      "Architecture",
    ],
  },
  {
    title: "AI-Assisted Engineering Toolchain",
    description:
      "Led org-wide adoption of AI-assisted development tools. Reduced PR authoring time by 93%, code review time by 80%, and achieved ~10% developer cost savings. Built custom MCP servers, RAG pipelines, and open-sourced an AI-driven Azure DevOps PR tool.",
    tags: ["AI/ML", "RAG", "MCP", "DevOps", "Cursor", "Aider"],
  },
  {
    title: "OpenCode Contributions",
    description:
      "Fixed a critical JavaScript sandbox crash in the Recursive Language Model (RLM) REPL tool. Rebased a diverged feature branch with 2,744 files changed while preserving original author attribution. Created the Learn plugin for AI agent knowledge persistence.",
    tags: ["TypeScript", "Open Source", "AI Agents", "RLM"],
    link: "https://github.com/anomalyco/opencode",
    linkLabel: "OpenCode",
  },
  {
    title: "Wildlife Detection API",
    description:
      "Flask REST API using Microsoft MegaDetector v5a (YOLOv5/PyTorch) for automated species identification from camera trap images. Deployed as a containerized ML inference service.",
    tags: ["Python", "Flask", "PyTorch", "YOLOv5", "ML", "Docker"],
  },
  {
    title: "AutoEq",
    description:
      "Native Android audio equalizer app built with Kotlin and Jetpack Compose. Full CI/CD pipeline, Maestro E2E tests, and semantic-release. From scaffold to v0.3.0 in under a week.",
    tags: ["Kotlin", "Jetpack Compose", "Android", "CI/CD", "Maestro"],
  },

];

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-serif text-[2.25rem] sm:text-[3rem] leading-[1.1] font-semibold tracking-tight text-foreground">
          Projects
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Selected work spanning AI agent infrastructure, cross-platform apps,
          ML deployments, and open source.
        </p>
      </section>

      <div className="space-y-10">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group border-b border-border pb-10 last:border-0 last:pb-0"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-serif text-xl sm:text-[1.625rem] font-semibold text-foreground leading-snug">
                  {project.title}
                </h2>
                {project.link && (
                  <Link
                    href={project.link}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0 underline underline-offset-4 decoration-border"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.linkLabel || "Link"}
                  </Link>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
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
