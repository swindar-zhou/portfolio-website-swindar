import Image from "next/image";
import profilePic from "@/images/profile-bw.jpg"
import profilePicHover from "@/images/profile-color.jpg"
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HeroConstellation } from "@/components/ui/hero-constellation"
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
    AnimatedName,
    HOLD_MS,
    INITIAL_REVEAL_MS,
    SWAP_REVEAL_MS,
    type Phase,
    type Suffix,
} from "@/components/ui/animated-name";
import React, { useEffect, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { data } from "@/data/data";


export default function Hero() {

    const [wiggleIcon, setWiggleIcon] = useState<string | null>(null);

    // State machine for the animated name. Lifted to Hero so the layout-animated
    // line wrapper re-renders on every phase/suffix change — Framer Motion's
    // `layout` only measures bounding rects when the motion component re-renders.
    // If the state lived inside AnimatedName, Hero wouldn't re-render and Framer
    // would never see the line wrapper's width change.
    const [phase, setPhase] = useState<Phase>("initial");
    const [suffix, setSuffix] = useState<Suffix>("y");

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        if (phase === "initial") {
            timer = setTimeout(() => setPhase("hold"), INITIAL_REVEAL_MS);
        } else if (phase === "hold") {
            timer = setTimeout(() => setPhase("exit"), HOLD_MS);
        } else if (phase === "enter") {
            timer = setTimeout(() => setPhase("hold"), SWAP_REVEAL_MS);
        }
        // Note: exit -> enter transition is NOT handled by a timer here.
        // It's triggered by AnimatedName's onAnimationComplete (passed below)
        // so the suffix swap happens precisely when Framer signals the exit
        // clipPath animation has settled — no setTimeout timing race that
        // could leave the new suffix briefly visible mid-clip.
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [phase]);

    const handleExitComplete = () => {
        setSuffix((s) => (s === "y" ? "am" : "y"));
        setPhase("enter");
    };

    const { status, dotColor } = getStatus();

    const handleIconClick = (iconName: string) => {
        setWiggleIcon(iconName);
        setTimeout(() => setWiggleIcon(null), 600);
    };

    const handleShimmerButtonClick = () => {
        handleIconClick("email");
    }

    return (
        <div className="pt-32 pb-16 sm:pt-56 relative flex items-center justify-center overflow-hidden">
            <HeroConstellation desktopDots={300} mobileDots={75} />
            <TooltipProvider>
                <BlurFade delay={0.005} inView>
                    <div className="relative flex-col space-y-1">
                        <div className="relative flex flex-col items-center justify-center">
                            <BackgroundGradient className="z-50 h-16 w-16 sm:w-20 sm:h-20 md:w-20 md:h-20 ">
                                <Image
                                    src={profilePic}
                                    alt="Profile Picture"
                                    priority
                                    className="absolute rounded-full transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                                />
                                <Image
                                    src={profilePicHover}
                                    alt="Profile Picture Hover"
                                    className="absolute rounded-full transition-opacity duration-200 opacity-0 group-hover:opacity-100"
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
                                <p className="z-50 subpixel-antialiased leading-[1.8] text-5xl sm:text-7xl font-bold text-center whitespace-nowrap">
                                    <span className="inline-block pb-2 bg-gradient-to-b from-zinc-200 dark:from-zinc-50 to-zinc-950 dark:to-zinc-300 bg-clip-text text-transparent">
                                        Hi. I&#39;m{" "}
                                        <AnimatedName
                                            phase={phase}
                                            suffix={suffix}
                                            onExitComplete={handleExitComplete}
                                            className="font-script font-normal text-[1.05em] leading-none align-baseline"
                                        />
                                    </span>
                                </p>
                                <p className="text-base subpixel-antialiased tracking-tight font-medium sm:text-2xl text-center text-secondary-foreground">
                                    A Software Engineer who likes{" "}
                                    <span className="font-script font-normal text-[1.05em] leading-none align-baseline text-secondary-foreground">
                                        building things
                                    </span>
                                    .
                                </p>
                            </BlurFade>
                            <BlurFade delay={0.005 * 2} direction="down" inView>
                                <div className="z-1 space-y-6 flex flex-col items-center justify-center">
                                    <ContactIcons wiggleIcon={wiggleIcon} handleIconClick={handleIconClick} />
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