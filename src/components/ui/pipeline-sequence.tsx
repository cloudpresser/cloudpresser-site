"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  "intent",
  "orchestration",
  "execution",
  "verification",
  "supervision",
];

export function PipelineSequence() {
  // Track which elements are visible and which is currently active
  const [revealedStepIndex, setRevealedStepIndex] = useState(0); // Start with first step visible
  const [revealedArrowIndex, setRevealedArrowIndex] = useState(-1); // Start with no arrows visible
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    // Wait for the initial page load / Hero ScrollReveal animation to finish
    const startDelay = setTimeout(() => {
      // Highlight the first step immediately after delay
      setActiveStep(0);
      let currentStep = 0;
      let phase: "arrow" | "step" = "arrow";

      const interval = setInterval(() => {
        if (currentStep >= STEPS.length - 1 && phase === "step") {
          // Finished revealing all steps. Wait one final tick then settle.
          setTimeout(() => {
            setActiveStep(null);
            setIsSettled(true);
          }, 600);
          clearInterval(interval);
          return;
        }

        if (phase === "arrow") {
          // Reveal the next arrow
          setRevealedArrowIndex(currentStep);
          phase = "step";
        } else {
          // Reveal and highlight the next step
          currentStep++;
          setRevealedStepIndex(currentStep);
          setActiveStep(currentStep);
          phase = "arrow";
        }
      }, 400); // 400ms per phase (800ms total per stage transition)

      return () => clearInterval(interval);
    }, 1000); // 1000ms initial delay

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-muted-foreground">
      {STEPS.map((step, i) => {
        const isStepRevealed = isSettled || i <= revealedStepIndex;
        const isActive = activeStep === i;
        const isArrowRevealed = isSettled || i <= revealedArrowIndex;
        const isPastArrow = isSettled || (activeStep !== null && i < activeStep);

        return (
          <span key={step} className="flex items-center gap-3">
            <span
              className={cn(
                "px-3 py-1.5 rounded-md text-sm tracking-tight transition-all duration-500 cursor-default",
                // Visibility transition
                isStepRevealed
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2",
                // Active vs Settled/Inactive styling
                isActive
                  ? "bg-primary/10 text-primary shadow-sm shadow-primary/20 ring-1 ring-primary/30 -translate-y-0.5"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-sm"
              )}
            >
              {step}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "text-xs select-none transition-all duration-500",
                  // Visibility transition
                  isArrowRevealed
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2",
                  // Active/Past coloring
                  isActive || isPastArrow ? "text-primary/50" : "text-border"
                )}
              >
                &rarr;
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
