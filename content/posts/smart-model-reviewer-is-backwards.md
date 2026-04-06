---
title: "Why the Smart Model Reviewer Pattern Is Backwards"
date: "2026-03-24"
description: "Most AI pipelines have generation and verification backwards. Smart models should generate. Cheap models should verify. The industry is putting its best capability in the wrong place — and it's creating a quality ceiling, not just a cost problem."
tags: ["AI", "Control Systems", "Agent Architecture", "LLM Infrastructure"]
series: "Control Systems for Intelligent Software"
seriesPart: 2
---

Most AI pipelines have generation and verification backwards.

The dominant pattern in 2026 looks like this: use a cheap model to generate output, then throw a frontier model at it to catch mistakes. The intuition is appealing — save money on the bulk work, deploy your best reasoning to quality-check the result. Anthropic just shipped Code Review in Claude Code, a multi-agent system specifically designed to review AI-generated pull requests before a human sees them. The industry is doubling down on smart reviewers.

This is architecturally wrong. Not because verification doesn't matter, but because we're putting our best capability in the wrong place.

## Verification Is the Easy Part

There's a reason P != NP is the most important unsolved problem in computer science. It captures something we all know intuitively: checking an answer is fundamentally easier than producing one.

Given a concrete output — a function, a PR, a generated document — verifying it is a bounded problem. The code either compiles or it doesn't. Tests pass or they fail. The output matches the spec or it deviates. The answer space is constrained, the inputs are concrete, and the criteria are known.

Generation is the opposite. Producing correct code across a large, unfamiliar codebase from an ambiguous prompt is an open-ended problem. The solution space is enormous. The model needs to reason about architecture, navigate competing constraints, and synthesize something new. That's where deep reasoning earns its keep.

You need your best capability where the problem is hardest. Verification is not that place.

## The Quality Ceiling

This is not mainly about cost — though the cost argument is real when Opus runs at $75/M output tokens and Flash runs at $0.30.

It's about output quality. Here's the backwards pipeline that most teams are running:

```
cheap model generates → mediocre output → smart model reviews → "approved" mediocre output
```

And here's what the pipeline should look like:

```
smart model generates → high-quality output → cheap model verifies → confirmed high-quality output
```

The ceiling is fundamentally different. A smart reviewer can catch errors in mediocre work, but it can't elevate mediocre work to excellent. It can flag that a function has a bug. It can't retroactively make the architecture decision that would have avoided the bug entirely. A smart generator produces better work from the start — better abstractions, better edge case handling, better alignment with the codebase's patterns.

This isn't a cost inefficiency. It's a quality ceiling. You are structurally limiting how good your system can get.

The reviewer pattern has a second, less obvious failure mode: rework loops. When the cheap generator produces poor output, the pipeline cycles — regenerate, re-review, regenerate again. Each cycle burns tokens and latency. I've seen pipelines where the rework cost exceeds what it would have cost to use the frontier model for generation in the first place.

The industry pattern is: cheap generation + expensive verification + rework loops. The correct pattern is: expensive generation + cheap verification + done.

## What Cheap Models Are Actually Good At

The model routing conversation in 2026 is everywhere — RouteLLM, OpenRouter, Not Diamond, dozens of blog posts about cutting inference costs 40-85%. But almost all of it frames routing as a cost optimization problem. Match model capability to task complexity. Don't use Opus for JSON extraction.

That framing is correct but incomplete. The deeper insight is structural: cheap models excel at any task where the answer space is constrained and the inputs are concrete. That's not just "simple tasks." It's a specific category of work:

- Checking outputs against specs, tests, types, lint rules
- Routing and classification — which tool? which agent? which model?
- Extraction from structured artifacts
- Formatting and transformation

These are all verification-shaped problems. The information is already there. The model just needs to check or classify it. A $0.30/M token model handles this as well as a $75/M token model, because the task doesn't require open-ended reasoning. It requires pattern matching against known criteria.

## What Smart Models Are Actually Good At

Open-ended reasoning across wide domains:

- Novel code generation in large, unfamiliar codebases
- Architectural decisions with competing constraints
- Creative problem-solving where the solution space is unbounded
- Tasks where context is ambiguous and the right approach hasn't been invented yet

These are generation-shaped problems. The model needs to produce something new, not evaluate something existing. This is where the 250x price difference between Gemini Flash and Claude Opus actually buys you something — not just more tokens processed, but qualitatively different reasoning.

Cursor understood this instinctively. Their Composer model is a frontier-class agent optimized for generation — the hard, open-ended part. Their apply model handles bounded transformations: taking a known diff and applying it to a file. That's not a smart reviewer. It's a fast executor operating on already-decided changes. Right capability at the right stage.

## The Correct Pipeline

```
smart model (generates high-quality output)
    ↓
cheap model (verifies against concrete criteria)
    ↓
human supervisor (handles alignment with intent)
```

Verification is a bounded problem. Generation is an open-ended one. Put your best capability where the problem is hardest.

But notice the third layer. Cheap verification catches mechanical errors — does the code compile? Do tests pass? Does the output match the format spec? What it doesn't catch is alignment with intent. "Is this what I actually wanted?" is not a verification-shaped problem. It requires understanding context, goals, and tradeoffs that neither the generator nor the verifier can fully resolve.

The supervisor remains essential. Not because the models are bad at their jobs, but because the world is open-ended and intent is ambiguous. Same reason pilots still sit in cockpits and operators still monitor industrial systems. The machine executes. The telemetry reports. The human decides.

## Where This Goes

If execution isn't the hard part ([post #1](/writing/bash-is-all-you-need)), and verification isn't either — then what is?

The hard problem is the control system that connects human intent to agent execution to verified outcomes. It's the orchestration layer, the supervision interface, the feedback loop that keeps the whole pipeline aligned with what you actually wanted.

That's not a model problem. It's an architecture problem. And it has a name — one that robotics and industrial automation solved decades ago.

---

*Luiz Ozorio is a Tech Lead who builds control systems for intelligent software — orchestration pipelines, execution tracing, and supervision interfaces where humans direct AI agents. More at [cloudpresser.com](https://cloudpresser.com).*
