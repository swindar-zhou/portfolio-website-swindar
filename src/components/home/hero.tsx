"use client";

import Image from "next/image";
import profilePic from "@/images/profile.png"
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HeroConstellation } from "@/components/ui/hero-constellation"
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { IconArrowRight } from "@tabler/icons-react";
import { AnimatedName } from "@/components/ui/animated-name";
import React, { useRef, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { data } from "@/data/data";


export default function Hero() {

    const [wiggleIcon, setWiggleIcon] = useState<string | null>(null);

    const { status, dotColor } = getStatus();

    const handleIconClick = (iconName: string) => {
        setWiggleIcon(iconName);
        setTimeout(() => setWiggleIcon(null), 600);
    };

    const handleShimmerButtonClick = () => {
        handleIconClick("email");
    }

    const ctaRef = useRef<HTMLAnchorElement>(null);
    const handleCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = ctaRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    return (
        <div className="pt-32 pb-16 sm:pt-56 relative flex items-center justify-center overflow-hidden">
            <HeroConstellation desktopDots={300} mobileDots={75} />
            <TooltipProvider>
                <BlurFade delay={0.005} inView>
                    <div className="relative flex-col space-y-1">
                        <div className="relative flex flex-col items-center justify-center">
                            <BackgroundGradient className="z-50 h-32 w-32 sm:w-40 sm:h-40 md:w-40 md:h-40 ">
                                <Image
                                    src={profilePic}
                                    alt="Swindar Zhou"
                                    priority
                                    className="h-full w-full rounded-full object-cover ring-2 ring-amber-300/0 transition-all duration-300 group-hover:ring-[6px] group-hover:ring-amber-300/80 group-hover:shadow-[0_0_28px_rgba(251,191,36,0.6)]"
                                />
                            </BackgroundGradient>
                            <ShimmerButton onClick={handleShimmerButtonClick} className="z-50 mt-8">
                                <div className="z-50 relative flex items-center justify-center">
                                    <div
                                        className={`absolute h-1.5 w-1.5 rounded-full border-1 ${dotColor === "green"
                                            ? "border-green-600/80 bg-green-500 animate-ping"
                                            : "border-orange-600/80 bg-orange-500 animate-ping"
                                            } mr-2`}
                                    ></div>
                                    <div
                                        className={`relative h-1 w-1 rounded-full border-1 ${dotColor === "green"
                                            ? "border-green-600/80 bg-green-500 animate-pulse"
                                            : "border-orange-600/80 bg-orange-500 animate-pulse"
                                            } mr-2`}
                                    ></div>
                                </div>
                                <span className="whitespace-pre-wrap text-center font-semibold leading-none text-muted-foreground text-xs sm:text-base py-[0.5]">
                                    {status}
                                </span>
                            </ShimmerButton>
                        </div>
                        <div className="w-full space-y-6">
                            <BlurFade delay={0.005 * 1} inView>
                                <p className="z-50 subpixel-antialiased leading-[1.8] text-5xl sm:text-7xl font-bold text-center">
                                    <span className="inline-block pb-2 bg-gradient-to-b from-stone-200 dark:from-stone-50 to-stone-900 dark:to-stone-300 bg-clip-text text-transparent">
                                        Hi. I&#39;m{" "}
                                        <AnimatedName
                                            name="Swindar Zhou"
                                            className="font-script font-normal text-[1.05em] leading-none align-baseline"
                                        />
                                    </span>
                                </p>
                                <p className="text-base subpixel-antialiased tracking-tight font-medium sm:text-2xl text-center text-secondary-foreground">
                                    Full Stack Developer &amp; Tech Lead{" "}
                                    <span className="font-script font-normal text-[1.05em] leading-none align-baseline text-secondary-foreground">
                                        @ AI Wellness Startup
                                    </span>
                                </p>
                            </BlurFade>
                            <BlurFade delay={0.005 * 2} direction="down" inView>
                                <div className="z-50 flex flex-row items-center justify-center gap-5">
                                    <ContactIcons wiggleIcon={wiggleIcon} handleIconClick={handleIconClick} />
                                    <span className="h-5 w-px bg-stone-300/60 dark:bg-stone-700/60" aria-hidden />
                                    <a
                                        ref={ctaRef}
                                        onMouseMove={handleCtaMove}
                                        href="#projects"
                                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-stone-300/60 dark:border-stone-700/60 bg-background/40 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:text-foreground"
                                    >
                                        <span
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 rounded-full text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                                            style={{
                                                background:
                                                    "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), currentColor, transparent 60%)",
                                            }}
                                        />
                                        <span className="relative">View my work</span>
                                        <IconArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        <BorderBeam size={60} duration={5} />
                                    </a>
                                </div>
                            </BlurFade>
                        </div>
                    </div>
                </BlurFade>
            </TooltipProvider>
        </div>
    );
}

const getStatus = () => {
    const now = new Date();
    const localTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        hour12: false,
    }).format(now);

    const currentHour = parseInt(localTime, 10);

    if (currentHour >= 8 && currentHour < 22) {
        return { status: "Available", dotColor: "green" };
    } else {
        return { status: "Away", dotColor: "amber" };
    }
};


const iconClass = (label: string, wiggleIcon: string | null) =>
    `text-secondary-foreground ${wiggleIcon === label.toLowerCase()
        ? "animate-wiggle scale-150 transition-transform duration-200"
        : ""
    } hover:scale-130 hover:animate-wiggle transition-transform duration-300`;

function ContactIcons({
    wiggleIcon,
    handleIconClick,
}: {
    wiggleIcon: string | null;
    handleIconClick: (label: string) => void;
}) {
    return (
        <div className="flex flex-row items-center justify-center space-x-6">
            {data.contact
                .filter(link => link.label !== "Instagram")
                .map(link => (
                    <Tooltip key={link.label}>
                        <TooltipTrigger asChild>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.aria}
                                onClick={() => handleIconClick(link.label.toLowerCase())}
                            >
                                {React.cloneElement(link.icon, {
                                    className: iconClass(link.label, wiggleIcon),
                                })}
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" >{link.label}</TooltipContent>
                    </Tooltip>
                ))}
        </div>
    );
}