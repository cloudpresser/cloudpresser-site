---
title: "Why Coherence Doesn't Scale with Capability"
date: "2026-04-28"
description: "There's a quiet assumption underneath most AI discussions: if capability keeps improving, coherence will eventually follow. Gödel's incompleteness theorems suggest otherwise. The supervision layer isn't a temporary workaround — it's part of the design."
tags: ["AI", "Control Systems", "Gödel", "System Design"]
series: "Control Systems for Intelligent Software"
seriesPart: 6
---

There's a quiet assumption underneath most discussions about AI:

> If capability keeps improving, coherence will eventually follow.

That is — if a system becomes good enough across enough domains, it will become consistent, self-correcting, and fully reliable.

This assumption shows up everywhere:

- "More intelligence will solve alignment"
- "Better models will eliminate hallucinations"
- "Eventually the system will understand what it's doing"

But if you look at how current systems behave, something doesn't line up.

---

## Strong Systems, Strange Failures

Modern AI systems are already broadly capable.

They can:

- write code across large codebases
- analyze data and generate insights
- reason through multi-step problems
- operate across many domains

In many isolated tasks, they outperform the average human.

At the same time, they are:

- inconsistent
- context-fragile
- prone to subtle, hard-to-detect errors
- capable of producing outputs that look correct but aren't

These are not edge cases. They are structural.

The system can be highly capable and still fail in ways that feel obvious in hindsight.

---

## The Missing Assumption

The default interpretation is:

> these failures will go away as models improve

But that assumes something stronger:

> that capability and coherence scale together

There's no clear evidence that they do.

What we're actually seeing looks more like:

> capability is scaling much faster than coherence

---

## Systems Have Boundaries

If you step back from AI and look at complex systems more generally, a pattern shows up.

A system can:

- operate within its environment
- process information
- produce outputs

But it cannot fully:

- observe all of its internal state
- validate all of its behavior
- define correctness in every context

There are always parts of the system that only make sense from outside the system boundary.

This is not a temporary limitation. It's a structural one.

---

## A Historical Parallel

This idea shows up in mathematics as well.

In the 1930s, Kurt Gödel proved that any sufficiently expressive formal system contains true statements it cannot prove from within itself.

Not because the system is flawed.

Because that's how complex systems behave.

---

## Back to AI Systems

Modern AI systems follow the same pattern.

They can:

- generate outputs
- reason within a given context
- apply transformations across large domains

But they still depend on something outside the system to:

- interpret results
- resolve ambiguity
- determine whether the outcome is actually correct

This is exactly what shows up in practice:

- human supervision layers
- evaluation pipelines
- observability and trace analysis
- control surfaces for intervention

Not as temporary scaffolding — but as required structure.

---

## What Actually Gets Automated

If you look at work through this lens, the boundary becomes clearer.

The parts that get automated are the ones that can be:

- specified
- constrained
- verified against clear criteria

These are compressible problems.

The parts that remain are the ones that:

- depend on context that isn't fully captured
- require interpretation of intent
- involve tradeoffs that aren't formally defined

These are not just "harder" problems. They are different in kind.

---

## Reframing the Trajectory

The common story is:

> narrow intelligence → general intelligence → fully coherent system

A more accurate description of what's emerging is:

> broad competence across many domains
> without full internal coherence

Or more simply:

> locally strong, globally incomplete

The system works well within a context, but does not fully resolve across contexts.

---

## Implications for System Design

This connects directly to how AI systems are actually being built.

Across the previous posts, a pattern emerged:

- smart models generate
- systems execute
- cheap models verify
- observability captures behavior
- control surfaces expose it
- humans supervise

That architecture isn't accidental.

It's what you get when you build a system that can act, but cannot fully validate itself from the inside.

The supervision layer isn't a temporary workaround.

It's part of the design.

---

## Where This Leaves Us

The goal is not to eliminate the boundary.

It's to build systems that operate well within it.

That means:

- designing for supervision, not autonomy
- instrumenting systems so behavior is visible
- creating interfaces that allow intervention
- accepting that correctness is not fully internal

The hard part was never intelligence.

It was building systems that can be understood, supervised, and trusted.

---

## Final Thought

Capability will keep improving.

Systems will get faster, broader, and more useful.

But the idea that they will become fully self-consistent, self-validating, and complete —

— that assumption is doing more work than it should.

There is always a boundary.

We're not removing it.

We're learning how to build around it.
