---
title: "Observability for AI Agents"
date: "2026-04-20"
description: "AI systems fail in ways that look like success. You can't find these failures in a chat log. You need traces. AI agent systems need the same observability infrastructure that distributed systems built over the past decade."
tags: ["AI", "Control Systems", "Observability", "OpenTelemetry"]
series: "Control Systems for Intelligent Software"
seriesPart: 4
---

AI systems fail in ways that look like success. Incorrect but well-formed outputs. Unnecessary tool calls. Actions that are syntactically valid but semantically wrong. You can't find these failures in a chat log. You need traces. And without observability, you won't know until it's already in production.

If execution is solved, and verification is bounded, and agents are control systems — then the next problem is obvious: how do you observe them?

AI agent systems need the same observability infrastructure that distributed systems built over the past decade. We don't need to invent it — we need to apply it.

This is the fourth post in a five-part series. We've established that [execution is solved](/writing/bash-is-all-you-need) but context management isn't. That [smart models should generate, cheap models should verify](/writing/smart-model-reviewer-is-backwards). That AI agents follow the [same architecture as robotics control systems](/writing/ai-agents-are-control-systems). But none of that works without instrumentation. Without observability, control surfaces are blind and supervisors are guessing.

## The Gap

Distributed systems have mature observability. Metrics, logs, traces — the "three pillars" — are table stakes for any production backend. If your API goes down at 3 AM, you open Datadog or Grafana, find the failing span, trace it back through the call chain, and fix it. The debugging path is well-understood.

AI agent systems have almost none of this. Most agent frameworks give you chat logs (unstructured text), token counts (billing, not debugging), and maybe a tool call history. That's it.

What they don't give you: structured execution traces, decision tree visualization, context window snapshots at each step, replayable sessions, or cross-agent correlation.

This matters because agent failures don't look like software failures. As Arize's team documented, the failure modes are unique to agentic systems — and invisible in unstructured logs. You need traces.

## What OpenTelemetry Got Right

The industry is converging on OpenTelemetry as the standard telemetry layer for AI agents. The OpenTelemetry GenAI Semantic Conventions SIG is actively defining attribute schemas for LLM calls, agent invocations, tool executions, and session-level metrics. Major vendors — Datadog, Honeycomb, New Relic — already support them. Frameworks like LangChain, CrewAI, and AutoGen emit OTel-compliant spans natively.

The concepts translate directly to agent systems:

- **Spans** → individual agent actions (tool calls, reasoning steps, file edits)
- **Traces** → complete execution of a task from intent to outcome
- **Context propagation** → how context flows between agents, tools, and sub-tasks
- **Attributes** → metadata (model, tokens, temperature, context window size)

This is the right approach. AI observability should flow through the same pipeline as your HTTP traces and database spans. When an agent call triggers a file write that breaks a test, you should see both the agent span and the test failure span in one trace. No context-switching between tools.

## Trace Trees Capture What Chat Logs Can't

Agent execution is hierarchical. Chat logs flatten that hierarchy into a wall of text. Trace trees preserve it:

```
Task: "Refactor authentication module"
├── Plan: identify files to change
│   ├── Search: grep for auth patterns
│   └── Read: examine 3 files
├── Execute: modify files
│   ├── Edit: auth.ts (lines 45-120)
│   ├── Edit: middleware.ts (lines 12-30)
│   └── Write: auth.test.ts
└── Verify: run tests
    ├── Test: unit tests (pass)
    └── Test: integration tests (1 failure → retry)
```

Each node in this tree is a span with timing, token cost, inputs, outputs, and the context window state at that moment. When the integration test fails and the agent retries, you see exactly what changed between attempts. When the agent makes a bad decision at the planning stage, you trace it back to what was in the context window when it decided.

Agent execution is hierarchical. Trace trees capture that hierarchy. Chat logs don't.

## The Flight Recorder

The ability to replay an agent session is the debugging equivalent of a flight recorder.

This isn't theoretical. The open-source project `claude-replay` converts Claude Code session logs — stored as JSONL files with every message, tool call, tool result, and thinking block timestamped — into interactive HTML replays. You can step through the agent's reasoning, collapse and expand tool calls, and see exactly what the agent saw at each decision point.

Rudel.ai took this further, analyzing 1,573 real Claude Code sessions across 15 million tokens. What they found is exactly what observability reveals and chat logs hide: 26% of sessions get abandoned (most within 60 seconds), error cascade patterns appear in the first two minutes and predict abandonment, and session success rate varies significantly by task type. None of this is visible in a chat transcript.

Replayable sessions enable:
- **Debugging failures** without re-running expensive agent tasks
- **Understanding decisions** — why the agent chose path A over path B
- **Training supervisors** on when to intervene
- **Regression testing** agent pipelines against known sessions
- **Comparing models** on identical tasks with identical context

## Observability Feeds the Control Surface

This connects directly to the control surface argument in the [next post](/writing/why-ai-needs-control-surfaces). Observability is what gives control surfaces something to display:

- **Dashboards** aggregate metrics from traces — success rates, token costs, task durations
- **Task boards** derive execution state from spans — planning, executing, verifying, complete
- **Trace viewers** render the hierarchical execution tree directly
- **Mobile notifications** trigger on span events — failure, completion, human-needed
- **Session replay** uses the recorded flight data

Without observability, a control surface is a dashboard with no data. A mission control room with blank screens.

## The Full Stack

Putting the entire series together:

```
human intent
    ↓
smart model generates (post #2)
    ↓
bash executes (post #1)
    ↓
cheap model verifies (post #2)
    ↓
observability instruments everything (this post)
    ↓
control surface presents state (post #5)
    ↓
human supervisor decides (post #3)
```

This is a control system. The human expresses intent. The smart model reasons about it. The execution layer acts on it. The cheap model checks it. Observability captures every step. The control surface renders it. The human supervisor — seeing the full picture through traces, metrics, and replay — makes the final call.

Without this layer, agents don't fail loudly — they fail silently. And silent failure is what makes systems untrustworthy.

Observability gives you the data. But data without an interface is just logs. The next problem is obvious: how do you turn this into something a human can actually act on?

That's the subject of the [next post](/writing/why-ai-needs-control-surfaces): control surfaces — the interfaces that turn telemetry into human decisions.

---

*Luiz Ozorio is a Tech Lead and control systems engineer building AI execution infrastructure and supervision interfaces. He writes at [cloudpresser.com](https://cloudpresser.com).*
