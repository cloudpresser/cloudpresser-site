---
title: "Why AI Needs Control Surfaces, Not Just Chat"
date: "2026-04-14"
description: "Once you can see what the system is doing, the next problem is interacting with it. Chat interfaces for AI agents are like flying a drone through a text terminal. The industry needs purpose-built control surfaces."
tags: ["AI", "Control Systems", "Agent Architecture", "React Native"]
series: "Control Systems for Intelligent Software"
seriesPart: 5
---

If execution is solved, verification is bounded, agents are control systems, and observability makes them visible — then one question remains: how does a human actually operate this thing?

Once you can see what the system is doing, the next problem is interacting with it.

Chat interfaces for AI agents are like flying a drone through a text terminal. You can do it. People do it every day. But the moment you're running three agents in parallel, monitoring a long-running refactor, and trying to understand what changed across forty files — a scrolling text window stops being an interface and starts being a liability.

The [previous post](/writing/observability-for-ai-agents) in this series built the instrumentation layer — traces, flight recorders, the telemetry that makes agent execution visible. But visibility without an interface is just data. We need to talk about what the operator interface actually looks like. Because right now, for most AI tools, it's a chat box.

That's not enough.

## The Chat Box Is a Bottleneck

Chat is natural for conversation. It is terrible for supervision.

Try monitoring parallel agent execution in a chat window. Try understanding the spatial layout of changes across a codebase. Try debugging why an agent made a particular decision three steps ago when the evidence has already scrolled off screen.

Médéric Hurier put it sharply earlier this year: "We are stapling rocket engines to bicycles by forcing advanced agents to communicate through basic markdown chatbots." He's right. The models have gotten dramatically more capable — they can fork into parallel sub-agents, execute multi-step terminal workflows, iterate on their own failures. But the interface through which humans supervise all of this? Still a text box.

This mismatch has real consequences. When the interface can't represent system state, the human can't supervise effectively. And unsupervised agents are unreliable agents.

## What Control Surfaces Actually Look Like

A control surface is a purpose-built interface for system supervision. Not a chat wrapper. Not a dashboard bolted onto a chat app. A dedicated layer designed to answer the question: *what is happening right now, and what do I need to decide?*

The components are predictable because the requirements are universal:

```
control surface
├── dashboard     — real-time state across agents and tasks
├── task board    — visual pipeline: intent → planning → execution → verification
├── telemetry     — execution traces, token usage, decision trees
├── intervention  — pause, redirect, abort, approve
└── notifications — push alerts on completion, failure, or human-needed
```

Jeremy Knox hit this wall in February when he realized he had 49 AI services running and no way to understand their collective state. His solution was Mission Control — a 14-panel dashboard where, in his words, the goal was "zero-effort situational awareness." Not more visibility. Not more logs. The system explaining itself to the operator in under 30 seconds.

That's the right framing. A control surface doesn't give you more information. It gives you the right information, structured for decisions.

## Why Mobile Changes the Equation

Here's the thing about AI agents: they run long tasks. A complex refactor takes twenty minutes. A multi-file migration takes an hour. A full test suite with retries can run while you're at lunch.

Humans are not always at their desk. Mobile control surfaces solve this.

Push notifications when an agent completes a task or hits a failure. Quick approval from your phone when an agent needs a human decision. Monitoring execution state while you're in a meeting, on a walk, or between bench press sets (Jonathan Tsai literally codes at the gym via Slack on his phone while managing his OpenClaw agent fleet — the future is already weird).

This isn't about convenience. It's about reducing the feedback loop between agent execution and human supervision. A desktop-only control surface means the agent blocks until you get back to your computer. A mobile control surface means the agent gets unblocked in seconds.

React Native is strong here. One codebase delivers native interfaces across phone, tablet, and desktop. Real-time streaming, push notifications, native device integration — all the primitives you need for a supervision interface that works everywhere.

## Building One: The OpenCode Mobile Client

I built a concrete example of this pattern. The React Native OpenCode Client is a mobile control surface for the OpenCode AI coding agent. It's not a chat app that happens to be on your phone. It's a supervision interface designed around the question: *what is this agent doing, and does it need me?*

The architecture maps directly to the control surface pattern:

```
OpenCode Mobile Client
├── server management  — connect to multiple agent instances
├── real-time stream   — monitor agent reasoning as it happens
├── terminal emulator  — see execution output live (xterm.js)
├── git viewer         — understand what changed and where
├── file annotations   — spatial awareness of modifications
├── interactive Q&A    — human-in-the-loop decision points
└── push notifications — know when the agent needs attention
```

Thirty-seven pull requests in two weeks. The speed came from React Native's cross-platform primitives and from having a clear architectural target — I wasn't building a chat app, I was building a control surface. That distinction guided every design decision.

The git viewer exists because a chat log can't show you the spatial layout of changes across a codebase. The terminal emulator exists because execution output is fundamentally different from conversational text. The server management panel exists because in a multi-agent world, you need to see all your agents, not just the one you're talking to.

## The Industry Is Figuring This Out

The pattern is emerging everywhere. Knox built Mission Control for his 49-service ecosystem. Tsai built the OpenClaw Command Center with the insight that you should "bring the work to where humans are." Supervity ships an "AI Agents Command Center" with role-based dashboards and real-time performance metrics. The Anthropic team's work on MCP is building the protocol layer that these control surfaces will connect through.

The next generation of AI tools will look less like chat apps and more like mission control.

Not because chat is bad — it's great for expressing intent. But expressing intent is one step in a five-step pipeline:

```
human intent (chat is fine here)
    → orchestration (needs a task board)
    → execution (needs a terminal view)
    → verification (needs diff and test views)
    → supervision (needs a dashboard)
```

Chat covers the first step. Control surfaces cover the rest.

## The Full Picture

This is the fifth and final post in this series. Here's what the complete architecture looks like — not as a system diagram, but as what it enables:

```
intent → system → visibility → control → decision
```

Everything before this post builds the system. Execution, verification, control system architecture, observability — those are the layers that make AI agents capable, correct, and visible. This post is about the layer that lets a human actually operate it.

The compressible parts of work can be systematized. What remains — judgment, intent, taste — is irreducible. Not because the models aren't good enough yet, but because some parts of a system's behavior can only be understood from outside it.

Execution, verification, observability, and control surfaces — this is the architecture. The hard part was never intelligence. It was building systems that can be understood, supervised, and trusted.

This is what turns AI from a demo into something you can actually rely on. Without it, you don't have a system. You have a demo with good marketing.

---

*Luiz Ozorio is a Tech Lead and engineer who builds control systems for intelligent software — orchestration pipelines, execution tracing, and supervision interfaces where humans direct AI agents. More at [cloudpresser.com](https://cloudpresser.com).*
