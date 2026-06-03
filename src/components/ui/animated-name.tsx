"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const INITIAL_REVEAL_MS = 1100;

// Each clip-path'd element creates its own stacking context, so the parent
// gradient masking doesn't reach inside. We apply the same gradient directly
// to the name so the cursive matches the sans text in both light and dark.
//
// Pacifico has a deep descender (~0.37em). pb-[0.5em] extends the padding-box
// so the descender lives inside the gradient's paint area and the clip-path's
// border-box reference. -mb-[0.5em] cancels that padding out of layout flow.
const GRADIENT_TEXT =
    "bg-gradient-to-b from-stone-200 dark:from-stone-50 to-stone-900 dark:to-stone-300 bg-clip-text text-transparent pb-[0.5em] -mb-[0.5em]";

const CLIP_REVEALED = "inset(0 0% 0 0)";
const CLIP_CLIPPED = "inset(0 100% 0 0)";

interface AnimatedNameProps {
    name?: string;
    className?: string;
}

// A one-shot left-to-right clip-path reveal of the name.
export function AnimatedName({ name = "Swindar", className }: AnimatedNameProps) {
    return (
        <motion.span
            initial={{ clipPath: CLIP_CLIPPED }}
            animate={{ clipPath: CLIP_REVEALED }}
            transition={{
                duration: INITIAL_REVEAL_MS / 1000,
                ease: [0.6, 0.05, 0.3, 1],
            }}
            className={cn("inline-block", GRADIENT_TEXT, className)}
        >
            {name}
        </motion.span>
    );
}
