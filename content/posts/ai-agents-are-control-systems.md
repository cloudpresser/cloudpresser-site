---
title: "AI Agents Are Control Systems"
date: "2026-04-13"
description: "We're building AI systems like they're chatbots. They're not. They're control systems. The architecture that robotics solved decades ago — machine, telemetry, interface, human — is the same architecture AI agents need."
tags: ["AI", "Control Systems", "Agent Architecture", "ArduPilot"]
series: "Control Systems for Intelligent Software"
seriesPart: 3
---

We're building AI systems like they're chatbots. They're not. They're control systems.

If [execution is solved](/writing/bash-is-all-you-need) and [verification is bounded](/writing/smart-model-reviewer-is-backwards) — then the real question is: what's the architecture that ties it all together?

The architecture that robotics solved decades ago — machine, telemetry, interface, human — is the same architecture AI agents need. If you've built control systems for autonomous vehicles, you've already built it. The industry just hasn't recognized the pattern yet.

## The Architecture Robotics Already Solved

I'm a contributor to ArduPilot, the open-source autopilot framework that powers drones, rovers, planes, and submarines worldwide. The ecosystem is built around a clean separation of concerns:

```
physical machine (drone, rover, plane)
    ↓
telemetry protocol (MAVLink)
    ↓
operator interface (QGroundControl, Mission Planner)
    ↓
human pilot / supervisor
```

The machine executes. The protocol observes. The interface presents. The human decides.

This architecture wasn't designed by committee. It was forced into existence by a hard constraint: autonomous systems operating in the real world are unpredictable. Not because the machines are incapable — ArduPilot can fly a drone through a waypoint mission with centimeter precision. The world is what's unpredictable. Wind shifts. GPS drops. A sensor returns garbage. The mission changes mid-flight.

So the architecture gives the human what they need: real-time state, intervention capability, and the ability to shift between full manual control and full autonomy at any moment.

## AI Agents Follow the Same Pattern

Now look at what's emerging in AI tooling:

```
agent runtime (Claude Code, Cursor, OpenCode)
    ↓
execution telemetry (traces, logs, diffs)
    ↓
supervision interface (terminal, dashboard, mobile client)
    ↓
human engineer
```

The agent executes. The telemetry observes. The interface presents. The human decides.

This isn't a metaphor. The structural requirements are identical. Teams that treat agents like chatbots will build systems they can't supervise.

Anthropic's 2026 Agentic Coding Trends Report makes this explicit, even if they don't use the term "control systems." Their Trend #4 — "Human oversight scales through intelligent collaboration" — describes engineers who use AI in roughly 60% of their work but can only fully delegate 0-20% of tasks. That gap is the supervision problem. It's the same gap that exists between a drone that can fly autonomously and a mission that can be trusted without an operator watching.

Their "Building Effective Agents" guide describes patterns like orchestrator-workers, evaluator-optimizer, and routing workflows. Read those descriptions carefully. They're control system topologies — feedback loops, hierarchical delegation, checkpoint-based human intervention. The vocabulary is different. The architecture is the same.

## Why This Isn't a Loose Analogy

Both systems share the same hard requirements:

**Real-time state.** A drone operator needs continuous telemetry — altitude, battery, GPS fix quality, motor RPM. An engineer supervising an AI agent needs the same: what file is it editing, what tool did it call, how much context has it consumed, is it stuck in a loop.

**Intervention capability.** QGroundControl lets you switch from AUTO to GUIDED to MANUAL with a single click. AI agent interfaces need the same: pause, redirect, abort, approve. The "Ralph Wiggum pattern" — letting Claude Code run autonomously until it succeeds — works for toy problems. Production systems need a kill switch.

**Mission planning.** In ArduPilot, the human defines waypoints and the autopilot plans the path. In AI systems, the human defines intent and the agent plans execution. The hard problem in both cases is the same: translating human intent into machine-executable plans while preserving the ability to intervene when the plan goes wrong.

**Supervised autonomy.** Both systems operate on a spectrum. ArduPilot has flight modes ranging from MANUAL (full human control) to AUTO (full autonomy) with GUIDED and LOITER in between. AI agents need the same spectrum — and the industry is discovering this in real time. Michael Linell's recent piece on AI governance describes the shift from "human-in-the-loop" to "human-on-the-loop," which is exactly the flight mode spectrum applied to software agents.

## What QGroundControl Got Right

QGroundControl is not a chat interface. It's a control surface.

It gives the operator a map view for spatial awareness. A telemetry dashboard for real-time system state. A mission planner for intent definition. Parameter tuning for system configuration. Log replay for post-hoc debugging.

Every one of these features exists because someone crashed a drone without it.

Chat interfaces for AI agents are the equivalent of flying a drone with a text terminal. You can do it. People do it with MAVProxy — a command-line MAVLink interface. It works for debugging and simple tests. Nobody uses it to supervise a real mission.

Yet that's exactly what we're doing with most AI agent interfaces today. A chat window. A scrolling log. Maybe a file tree. This is the MAVProxy era of AI supervision.

## The Control Architecture That's Coming

Researchers at Georgia Tech published OrchVis in late 2025 — a hierarchical multi-agent orchestration system built explicitly for human oversight. It includes per-goal progress tracking, inter-agent conflict detection, and adjustable autonomy levels. It looks nothing like a chat interface. It looks like a ground control station.

Anthropic's Trend #5 — "Agentic coding expands to new surfaces and users" — points in the same direction. The next generation of AI tools will look less like chat apps and more like mission control: dashboards with execution status across parallel agents, trace viewers for debugging agent decisions, mobile supervision interfaces for monitoring long-running tasks, and intervention points where the human can redirect execution.

This is the control surface layer. It's the missing piece between human intent and agent execution.

## The Pattern Is the Point

The architecture exists because the world is unpredictable — not because the agents are incapable. This was true for drones in 2014. It's true for AI agents in 2026.

In [the previous post](/writing/smart-model-reviewer-is-backwards), I argued that verification is a bounded problem — cheap models can handle it. But alignment with intent? Knowing whether the agent is doing what you actually wanted? That requires human judgment, delivered through purpose-built interfaces, informed by real-time telemetry.

That's a control system.

There's a deeper reason human judgment can't be automated away — one that has less to do with current model limitations and more to do with how complex systems fundamentally work. But that's a thread for another post.

The teams building AI agents without this architecture will keep hitting the same wall: agents that execute well but can't be trusted, supervised, or debugged at scale. The teams that recognize the pattern — machine, telemetry, interface, human — will build systems that actually work in production.

In the [next post](/writing/observability-for-ai-agents), I'll cover the instrumentation layer that makes all of this debuggable and trustworthy: observability.
