"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const INITIAL_REVEAL_MS = 1100;
const SWAP_REVEAL_MS = 550;
const HOLD_MS = 2600;

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

type Suffix = "y" | "am";

export function AnimatedName({ className }: { className?: string }) {
    const [hasInitialized, setHasInitialized] = useState(false);
    const [suffix, setSuffix] = useState<Suffix>("y");

    useEffect(() => {
        const t = setTimeout(
            () => setHasInitialized(true),
            INITIAL_REVEAL_MS + HOLD_MS
        );
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!hasInitialized) return;
        const period = SWAP_REVEAL_MS * 2 + HOLD_MS;
        const interval = setInterval(() => {
            setSuffix((s) => (s === "y" ? "am" : "y"));
        }, period);
        return () => clearInterval(interval);
    }, [hasInitialized]);

    if (!hasInitialized) {
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

    return (
        <span className={cn("inline-block", className)}>
            Shiv
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={suffix}
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    exit={{ clipPath: "inset(0 100% 0 0)" }}
                    transition={{
                        duration: SWAP_REVEAL_MS / 1000,
                        ease: [0.6, 0.05, 0.3, 1],
                    }}
                    className={cn("inline-block", GRADIENT_TEXT)}
                >
                    {suffix}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
