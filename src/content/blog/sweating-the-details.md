---
title: "Sweating the Details"
description: "Why I obsess over animation timing, optical balance, and the micro-interactions most users will never consciously notice."
date: "2026-05-15"
tags: ["ui", "ux", "design", "animation"]
---

Most users won't notice the things I obsess over.

They won't notice that the contact button's padding is slightly asymmetric so the airplane icon optically centers. They won't notice that when you click it, a *new* plane rises from below to fill the empty space. They won't notice that the wave emoji in the footer re-triggers every time it scrolls into view.

But they'll feel it.

## Animation is feedback, not decoration

A button that just changes color when you click it is a vending machine. A button that *responds*, with weight, recovery, and follow-through, is alive.

The plane flying off says *your message went somewhere.* The new one rising from below says *the system is ready for you again.* The information conveyed is the same as a static button. The experience isn't.

The cheap version of this is "everything wiggles." The good version is using motion to answer questions the user didn't know they were asking: *did that work?*, *can I click again?*, *where did it go?*

## Optical isn't mathematical

If your icon is geometrically centered but visually leans left, it's not centered.

The eye doesn't measure pixels; it measures mass. Most icons have asymmetric weight. A paper airplane points up-right; its visual anchor sits in the lower-left. A play triangle is heavier on the left edge than the right. Letterforms are the same: an "O" floats away from edges while a "K" leans into them.

The fix is unglamorous. Add 4px of right padding. Nudge the icon down by half a pixel. Compensate with negative margin. The math will tell you it's wrong; trust your eyes.

## Timing matters more than the curve

I'll spend ten minutes tweaking a cubic-bezier curve. I'll spend an hour tuning the *duration*.

- **200ms** feels snappy. Good for hover states, taps, immediate feedback.
- **300ms** feels considered. Good for entrances, modals, drawer opens.
- **500ms** feels slow. Good for hero animations or anything you want to draw attention to.
- **Over 700ms** feels broken unless it's intentional storytelling.

The same animation at 200ms vs 500ms is a different product.

## Why bother

Because polish is the only thing that survives a first impression.

A user can't tell whether your database queries are efficient or your architecture scales. They will absolutely tell, in two seconds, without thinking about it, whether your product *feels* expensive or cheap. And the gap between those two feelings is built out of a thousand small things nobody asks for and everybody feels.

That's the part of UX worth sweating.
