---
title: "Bash Is All You Need — Until It Isn't"
date: "2026-03-17"
description: "The industry phrase 'bash is all you need' is technically correct. But it hides the real problems: context management, execution reliability, alignment with outcomes, and human supervision."
tags: ["AI", "Control Systems", "Agent Architecture"]
series: "Control Systems for Intelligent Software"
seriesPart: 1
---

"Bash is all you need" is technically correct. And that's exactly why it's misleading.

Vercel recently [stripped 80% of the tools](https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools) from their internal data agent, gave it a bash shell, and watched accuracy jump to 100% while execution time dropped 3.5x. Mario Zechner's [Pi](https://github.com/badlogic/pi-mono) — the minimal coding agent that powers OpenClaw — takes this even further: four tools (read, write, edit, bash), a system prompt under 1,000 tokens, and it [competes with full-featured agents](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) on Terminal-Bench. Minimalism isn't a limitation. It's winning.

Execution is a solved problem. The model generates a command, bash runs it, the output comes back. This loop works for file manipulation, git operations, test runs, deployments, database queries. It works so well that smart people are concluding the architecture problem is done.

It isn't. Bash lives in one box of a much larger pipeline:

```
human intent → context curation → task orchestration → agent execution → verification → human supervision
```

The hard engineering is everything else. What we're actually building — whether we recognize it or not — is a control system. And the AI agent is the actuator, not the decision maker.

## What Bash Actually Solves

Bash succeeds as an execution layer because it has the properties you'd want in an actuator: universal, deterministic, observable, composable. Every system has it. Commands either succeed or fail. Output is text. You can pipe anything into anything.

This makes it the perfect bottom layer of an agent stack:

```
LLM reasons → generates command → bash executes → output returns
```

No framework needed. No plugin system. No custom tool definitions. The model already knows bash, and bash already knows your system. Pi proves this radically — no MCP, no sub-agents, no plan mode, no built-in to-do lists. The entire system prompt and tool definitions come in under 1,000 tokens. The philosophy: "if I don't need it, it won't be built." And it works.

But notice what's happening in that loop. The model is doing two things: reasoning about what to do, and generating the command to do it. Bash handles the second part flawlessly. Nobody is handling the first part.

## Progressive Discovery and Its Limits

If execution is minimal, how does a minimal agent learn new capabilities? The emerging pattern is progressive context disclosure — loading capability descriptions on demand rather than baking everything into the system prompt upfront. Some agents use [skill files](https://github.com/badlogic/pi-mono): markdown documents that describe bash commands, CLI patterns, and workflows, read only when relevant.

The motivation is clear. Popular MCP servers like Playwright MCP (21 tools, 13.7k tokens) and Chrome DevTools MCP (26 tools, 18k tokens) dump their entire tool descriptions into context on every session — 7-9% of your context window gone before you've started working. Progressive disclosure avoids that tax.

The pattern goes further than static documentation. Agents can hot-reload skills, meaning they can write a new capability description, load it, test it, and iterate — all within a single session. Software building its own tooling in real time. Engineers have used this to [replace entire browser automation stacks](https://github.com/mitsuhiko/agent-stuff/blob/main/skills/web-browser/SKILL.md) with a single skill file that talks directly to Chrome DevTools Protocol. No marketplace, no framework — the agent builds and maintains its own functionality.

But even this elegant approach can't escape the fundamental constraint. Context windows are a fixed budget. Load too many skills and the system becomes wasteful — tokens spent on tool descriptions instead of reasoning, output quality degrading as context fills up. Discovery works well enough in stable environments. But in a changing environment where new tools appear, old patterns shift, and the combinatorial space of possible capabilities keeps growing, discovery becomes the bottleneck. What to load, when to load it, and whether the agent even knows what it doesn't know — those aren't execution problems. Those are control problems.

## The Context Problem Nobody Talks About

A developer on Reddit recently tracked their AI coding agent's behavior on a real codebase. Every time they asked it to add a new API endpoint, the agent spent 15-20 tool calls just *figuring out where things are* — grepping for routes, reading middleware files, checking types, reading more files. By the time it started writing code, it had burned through a significant chunk of its context window on orientation, not execution.

This is the norm, not the exception.

Claude Code advertises 200K tokens. In practice, you start a fresh session with roughly 120K usable. That number drops fast as the agent works. Research on attention degradation ("Lost in the Middle," Liu et al.) shows models reason best at the start of their context window — exactly when the agent is still searching, not yet building. Zechner built Pi specifically because he realized "context engineering is paramount" — that exactly controlling what goes into the model's context yields better outputs. His solution was to strip everything else away so the context window is available for actual code and project-specific information, not consumed by bloated system prompts and tool definitions.

The context problem compounds across real workflows:

- **Large codebases** don't fit in any context window. The agent always operates on partial knowledge.
- **Long tasks** accumulate tool outputs that push early reasoning out of the attention window.
- **Dynamic environments** change between sessions. Yesterday's context is stale today.
- **Novel problems** — the ones that actually need AI — have no existing patterns to retrieve.

Perfect context is impossible in a world where new solutions are constantly created. And without perfect context, the agent is reasoning probabilistically — which means it's sometimes wrong.

## Why "Sometimes Wrong" Changes Everything

When a bash command fails, you get an exit code. When an agent's *reasoning* fails, you get confident, plausible, wrong output.

The agent writes a function that looks correct, passes a quick review, but misunderstands a domain constraint buried in a file it never read. It refactors a module cleanly but breaks an implicit contract with a service three directories away. It generates a migration that works on the test database but corrupts production data because it didn't know about a trigger.

These aren't execution failures. Bash ran every command perfectly. These are alignment failures — the gap between what the agent did and what you actually needed.

JetBrains recently gave this a name: *AI agent debt*. The subtle, compounding cost of code that works but wasn't what you meant. And unlike technical debt, you often don't notice it until something breaks in production.

## The Missing Layer

Here's what that pipeline actually looks like in teams that ship reliably with AI agents. Each layer has a distinct engineering problem:

**Context curation** is deciding what the agent needs to know before it starts — project structure, domain constraints, recent changes, relevant patterns. Not "dump everything in the prompt." Targeted, curated context that puts the right information where the model reasons best.

**Task orchestration** is breaking ambiguous human intent into bounded, verifiable steps. "Add user authentication" is not a task. "Create a middleware that validates JWT tokens against the existing auth service and returns 401 on failure" is a task.

**Verification** is confirming the output matches intent — not just "does it compile" but "is this what I actually wanted." Tests, type checks, and linting catch mechanical errors. Alignment with intent still requires a human looking at the result.

**Supervision** is the human staying in the loop — not because the AI is stupid, but because the world is open-ended and context is always incomplete. Same reason pilots still supervise autopilot. Same reason operators still monitor industrial control systems. The machine handles execution; the human handles judgment.

The right metric isn't "agent completed task." It's "engineer approved merge."

## Control Systems, Not Chat Systems

This architecture — intent, orchestration, execution, verification, supervision — isn't new. It's the same pattern from robotics, aviation, and industrial automation. Machine telemetry flows up, operator commands flow down, and humans supervise outcomes.

The AI agent is an actuator. A powerful one. But actuators don't run unsupervised in any serious system. Even the most minimal agents — the ones that run in full YOLO mode with no permission prompts — are designed around observability. Sub-agents get rejected because "you have zero visibility into what that sub-agent does." Engineers who adopt these minimal execution layers immediately start building extensions on top: code review tooling, file change tracking, diff summaries — supervision tooling, not execution tooling. The minimal execution layer works precisely because the human stays in the loop.

Bash may be all you need for execution. But reliable AI systems require something more: control systems that manage context, verify outcomes, and keep humans in the loop. As agents become more capable, the problem shifts from generating commands to supervising intelligent systems operating in an open world.

The industry has spent two years optimizing the actuator. The real engineering challenge is the control system around it.

That's what I'll dig into next: why the way most teams handle verification — using expensive models to review cheap model output — has the entire pipeline backwards.
