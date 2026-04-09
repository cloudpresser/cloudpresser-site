import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero */}
      <section className="pt-12 pb-4 sm:pt-20 sm:pb-8">
        <h1 className="font-serif text-[3rem] sm:text-[4rem] leading-[1.05] font-semibold tracking-tight text-foreground">
          I build control systems
          <br />
          <span className="text-primary">for intelligent software.</span>
        </h1>
        <p className="mt-6 text-xl sm:text-2xl leading-relaxed text-muted-foreground max-w-[640px]">
          Orchestration pipelines, execution tracing, and supervision
          interfaces where humans direct AI agents performing complex work.
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap gap-6 mt-10 text-base">
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
      </section>

      {/* Pipeline Visual */}
      <section>
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
                <span className="text-border text-xs select-none">&rarr;</span>
              )}
            </span>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="space-y-5">
        <p>
          My work sits at the intersection of control systems, software
          infrastructure, and AI reasoning. I design execution environments
          where humans express intent and supervise AI agents performing
          long-running workflows — orchestration pipelines, execution tracing,
          context curation, and supervision interfaces that enable reliable,
          engineer-approved outcomes.
        </p>
        <p>
          The architecture mirrors patterns from robotics and industrial
          automation: machine telemetry, operator interfaces, and
          human-in-the-loop supervision — applied to software systems where AI
          agents are the actuators and humans remain the decision-makers.
        </p>
        <p>
          9+ years of professional experience spanning cross-platform app
          development (React Native across 5 platforms), AI-assisted engineering
          toolchains, and cloud-native microservices. Self-taught engineer, CTO
          of{" "}
          <Link
            href="https://github.com/cloudpresser"
            className="text-primary underline underline-offset-3 decoration-primary/40 hover:decoration-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            CloudPresser
          </Link>
          , and contributor to{" "}
          <Link
            href="https://github.com/facebook/react-native"
            className="text-primary underline underline-offset-3 decoration-primary/40 hover:decoration-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Native
          </Link>
          . My approach to AI agent supervision draws from control-systems
          patterns in robotics and industrial automation.
        </p>
        <p>
          Building a system for reliable AI agents:{" "}
          <Link
            href="/control-systems-for-ai"
            className="text-primary underline underline-offset-3 decoration-primary/40 hover:decoration-primary transition-colors"
          >
            Control Systems for Intelligent Software
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
