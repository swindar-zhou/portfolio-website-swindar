"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const INITIAL_REVEAL_MS = 1100;
export const SWAP_REVEAL_MS = 600;
export const HOLD_MS = 5000;

// Each clip-path'd element creates its own stacking context, so the parent
// gradient masking doesn't reach inside. We apply the same gradient directly
// to each segment so the cursive matches the sans text in both light and dark.
//
// Pacifico has a deep descender (~0.37em). pb-[0.5em] extends the padding-box
// so the descender lives inside the gradient's paint area and the clip-path's
// border-box reference. -mb-[0.5em] cancels that padding out of layout flow,
// so the line wrapper doesn't grow and the subtitle stays where it was.
const GRADIENT_TEXT =
    "bg-gradient-to-b from-zinc-200 dark:from-zinc-50 to-zinc-950 dark:to-zinc-300 bg-clip-text text-transparent pb-[0.5em] -mb-[0.5em]";

export type Phase = "initial" | "hold" | "exit" | "enter";
export type Suffix = "y" | "am";

interface AnimatedNameProps {
    phase: Phase;
    suffix: Suffix;
    onExitComplete?: () => void;
    className?: string;
}

export function AnimatedName({
    phase,
    suffix,
    onExitComplete,
    className,
}: AnimatedNameProps) {
    // On the very first reveal, render the whole word as a single wiping span
    // so "Shivy" writes in left-to-right as one motion. After the initial
    // reveal completes (phase transitions to "hold"), we swap to the split
    // structure so the suffix can swap independently.
    if (phase === "initial") {
        return (
            <motion.span
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{
                    duration: INITIAL_REVEAL_MS / 1000,
                    ease: [0.6, 0.05, 0.3, 1],
                }}
                className={cn("inline-block", GRADIENT_TEXT, className)}
            >
                Shivy
            </motion.span>
        );
    }

    // After initial reveal: "Shiv" is static plain text (inherits gradient from
    // the line wrapper above), suffix is animated via clipPath driven by phase.
    // initial={false} prevents the suffix's first mount from re-wiping in (we
    // just finished the full-word reveal, so it should appear fully visible).
    const clipPath =
        phase === "exit" ? "inset(0 100% 0 0)" : "inset(0 0% 0 0)";

    return (
        <span className={cn("inline-block", className)}>
            Shiv
            <motion.span
                initial={false}
                animate={{ clipPath }}
                transition={{
                    duration: SWAP_REVEAL_MS / 1000,
                    ease: "easeInOut",
                }}
                onAnimationComplete={() => {
                    // Only signal completion at the end of the exit animation.
                    // Hero uses this to swap the suffix + advance to "enter" at
                    // the exact moment clipPath has settled to fully clipped,
                    // avoiding any timing race where new content could be
                    // briefly visible before the next animation starts.
                    if (phase === "exit") onExitComplete?.();
                }}
                className={cn("inline-block", GRADIENT_TEXT)}
            >
                {suffix}
            </motion.span>
        </span>
    );
}
