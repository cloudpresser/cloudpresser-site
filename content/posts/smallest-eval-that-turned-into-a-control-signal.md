---
title: "The Smallest Eval That Turned Into a Control Signal"
date: "2026-04-17"
description: "A minimal production case study: running the same decision step twice exposed input failures, surfaced hidden policy, and turned model disagreement into a control signal."
tags: ["AI", "Case Study", "Evals", "Control Systems", "LLM Reliability"]
---

Most AI systems don't fail loudly.

They fail by drifting.

Outputs still look plausible. Nothing crashes. But the system stops being trustworthy.

That's what happened here.

The pipeline was simple:

```
scrape -> rank -> research -> decide (apply / not)
```

That last step was the system. Everything downstream assumed it was correct.

Under real conditions, it wasn't.

Job descriptions were getting truncated. Scraping would intermittently fail due to user-agent blocks. Sometimes the model was operating on partial context and you couldn't tell unless you went looking for it.

The model didn't error. It just made worse decisions.

Sometimes too conservative. Sometimes compensating with weak signals.

Switching to a stronger model helped some.

Reliability went up. Fewer obvious mistakes.

But it didn't fix the system.

I still had to manually review a lot of edge cases. I still didn't know when the system was wrong unless I checked.

It just moved the line.

> Reliability improved, but the system was still blind.

If the only way to stabilize your system is to pay for a bigger model, you don't have a model problem.

You have a control problem.

## Thesis

I didn't build an eval system.

I added one extra execution.

Run the same step twice. Compare the decision.

That's it.

That single change introduced a new signal:

> model disagreement

At first it looked like an eval metric.

It wasn't.

It turned into something much more useful:

It exposed upstream data failures. It made decision policy visible. It generated high-value edge cases. And it closed feedback loops inside the system.

> Disagreement isn't error. It's telemetry.

## Where the System Broke

The pipeline was straightforward:

```
scrape -> rank -> research -> decide
```

The failure wasn't accuracy.

It was reliability under imperfect inputs.

When inputs degraded, behavior became inconsistent. Sometimes the model would reject too aggressively. Sometimes it would try to fill in the gaps and overreach.

There were clear failure modes:

- truncated job descriptions
- scraping failures
- missing context

But the system had no way to surface them. You only found out by manually reviewing outputs.

Nothing told you why a decision was made, or whether the input was trustworthy.

There was no signal for uncertainty.

## The Minimal Intervention

Instead of redesigning anything, I added one change.

Run the same step with a second model.

Same input. Same prompt. Same timing.

Then ignore everything except the decision:

> apply / research more / pass

No dataset. No labeling. No offline eval.

Just a second measurement of the same decision.

That's the whole move.

## Extracting Signal from Disagreement

At first it looks like noise.

Models disagree sometimes.

But after a few runs, a pattern shows up.

The disagreements cluster.

And when you look at those clusters, they line up almost perfectly with system issues:

- incomplete or degraded inputs
- scraping failures
- weak or missing context

The models aren't disagreeing randomly.

They're reacting differently to uncertainty.

One fails closed. It defaults to `Pass` when it doesn't trust the input.

The other tries to recover. It pulls in additional context and lands on `Research More`.

That difference is the signal.

> disagreement = information about input quality and decision boundaries

This is the pivot.

You stop asking which model is better.

You start asking what the disagreement is telling you about the system.

## Walkthrough: Disagreement Is Policy Telemetry

In one run, there were four disagreements:

- `zeta-global` -> `Pass` vs `Research More`
- `kyndryl` -> `Pass` vs `Research More`
- `red-hat` -> `Apply` vs `Research More`
- `rev-io` -> `Pass` vs `Research More`

The pattern is consistent. One model avoids hard rejection. It keeps borderline cases alive as `Research More`.

The other enforces stricter thresholds and collapses those cases to `Pass` or `Apply`.

This isn't about model quality.

It's about policy.

Each disagreement exposes a boundary condition:

`zeta-global` highlights the tension between role identity and architectural overlap.

`kyndryl` shows how platform lock-in gets treated: hard constraint or soft risk.

`red-hat` sits on the edge of "good enough to apply."

`rev-io` exposes ambiguity around bridge roles versus thesis-building roles.

Across all four, the same pattern holds.

One model enforces thresholds. The other preserves optionality.

> Disagreement shows you where your policy is undefined.

## Turning Signal into Control

Once you treat disagreement as signal, it starts closing loops.

First, the data loop.

You can detect bad inputs and trace them back to scraping issues. Truncation bugs become obvious. Upstream fixes become straightforward.

Then the policy loop.

Ambiguous decisions surface naturally. You define thresholds. You make explicit what was previously implicit. Behavior stabilizes.

Then the eval loop.

Disagreements become your dataset. Not synthetic examples, but real edge cases pulled from production.

And finally, the control loop.

When models agree, you can safely use the cheaper one.

When they disagree, you escalate to a stronger model or to human review.

This is the part most systems are missing.

Not better prompts.

Feedback.

## From Eval to Control Signal

At this point, this isn't an eval anymore.

It's a control signal.

The system now has structure:

- the pipeline is the system
- imperfect data is the disturbance
- disagreement is the sensor
- policy and routing are the controller

Same pattern as any control system.

Nothing special about AI here.

## Generalization

Any system with stochastic components and imperfect inputs has this property.

You can run two paths, compare outputs, and extract disagreement.

That disagreement becomes a signal.

And once you have a signal, you can build feedback.

This applies everywhere:

RAG systems. Agent pipelines. Ranking systems.

Anywhere decisions are made under uncertainty.

## Takeaway

The smallest useful eval isn't an eval.

It's a signal.

One that runs on real inputs, lives inside the system, and feeds back into decisions.

The goal isn't measurement.

It's control.

> Disagreement made the system observable.
>
> Observability made it controllable.
