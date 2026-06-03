
"use client";
import React, { useState, useEffect, useRef } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { IconTool, IconLink, IconMapPin, IconHeart, IconHandClick, IconRefresh } from "@tabler/icons-react";
import { Globe } from "@/components/ui/globe";
import styles from "./dashboard.module.css";
import { Marquee } from "@/components/ui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image";
import { data } from "@/data/data";
import { useTheme } from "next-themes";
import { ScratchToReveal } from "../magicui/scratch-to-reveal";
import { CustomCursor } from "@/components/ui/custom-cursor";


export default function Dashboard() {
  const [scratchGif, setScratchGif] = useState("");

  const dashboardIconClass = "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary";

  useEffect(() => {
    // Randomly select a GIF on mount
    const randomGif = data.scratchGifs[Math.floor(Math.random() * data.scratchGifs.length)];
    setScratchGif(randomGif);
  }, []);

  const pickNewGif = () => {
    const availableGifs = data.scratchGifs.filter(gif => gif !== scratchGif);
    const randomGif = availableGifs[Math.floor(Math.random() * availableGifs.length)];
    setScratchGif(randomGif);
  };

  const handleScratchComplete = () => {
    pickNewGif();
  };

  return (
    <div className="flex flex-col w-full">
      <CustomCursor />
      <ul
        className={`grid w-full gap-4 ${styles.dashboardGrid}`}>
        <GridItem
          area="location"
          icon={<IconMapPin className={dashboardIconClass} />}
          title="Shenzhen → Notre Dame → Bay Area"
          transitionDuration="100ms"
          cursorEmoji="✈️"
        >
          <div className="min-h-[160px] md:min-h-0">
            <Globe />
          </div>
        </GridItem>
        <GridItem
          area="favorite"
          icon={<IconHeart className={dashboardIconClass} />}
          title="Fav AI Tools"
          transitionDuration="300ms"
          cursorEmoji="❤️"
        >
          <FavoriteLanguage />
        </GridItem>
        <GridItem
          area="tools"
          icon={<IconTool className={dashboardIconClass} />}
          title="Tools"
          transitionDuration="400ms"
          cursorEmoji="🔧"
        >
          <ToolsMarquee />
        </GridItem>
        <GridItem
          area="contact"
          icon={<IconLink className={dashboardIconClass} />}
          title="Connect"
          transitionDuration="500ms"
          cursorEmoji="🔗"
        >
          <ContactMe />
        </GridItem>
        <GridItem
          area="scratch"
          icon={<IconHandClick className={dashboardIconClass} />}
          title="Scratch Me"
          transitionDuration="600ms"
        >
          <div className="relative">
            <ScratchToReveal
              minScratchPercentage={20}
              className="flex items-center h-24 sm:h-35 justify-center overflow-hidden rounded-md bg-background"
              gradientColors={["#A97CF933", "#F38CB933", "#FDCC9233"]}
              onComplete={handleScratchComplete}
              resetKey={scratchGif}
            >
              {scratchGif && (
                <Image
                  src={scratchGif}
                  alt="Scratch to reveal"
                  width={100}
                  height={100}
                  className="h-14 sm:h-16 object-contain"
                  unoptimized
                />
              )}
            </ScratchToReveal>
            <button
              type="button"
              onClick={pickNewGif}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              aria-label="Refresh scratch"
              className="absolute top-1 right-1 z-10 p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-background/60 transition-colors group"
            >
              <IconRefresh className="h-4 w-4 transition-transform group-hover:rotate-180 duration-300" />
            </button>
          </div>
        </GridItem>
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  transitionDuration?: string;
  tooltip?: string;
  cursorEmoji?: string;
}

const GridItem = ({ area, icon, title, children, transitionDuration = "300ms", tooltip, cursorEmoji }: GridItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    if (!tooltip) return;

    setShowTooltip(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Hide tooltip after 2 seconds
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const content = (
    <li
      ref={itemRef}
      data-cursor-emoji={cursorEmoji}
      className="min-h-[2rem] w-full list-none transition-all"
      style={{
        gridArea: area,
        transitionDuration,
        ...(cursorEmoji ? { cursor: "none" } : {}),
      }}
    >
      <div className="relative mx-auto h-full rounded-xl border p-2 md:rounded-2xl md:p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div
          className="relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-lg border-0.75 p-4 shadow-[0px_0px_12px_0px_#ebecf0] dark:shadow-[0px_0px_27px_0px_#2D2D2D] bg-background transition-all"
          style={{
            transitionDuration,
          }}
        >
          <div className="relative flex flex-row items-center gap-2 sm:gap-3">
            <div className="pt-0">{icon}</div>
            <div className="space-y-2">
              <h3 className="text-sm sm:text-md md:text-base tracking-tight text-start font-semibold text-black dark:text-white">
                {title}
              </h3>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </li>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip open={showTooltip} delayDuration={0}>
          <TooltipTrigger
            asChild
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleTap}
          >
            {content}
          </TooltipTrigger>
          <TooltipContent
            sideOffset={-16}
            side="top"
            align="center"
            collisionPadding={0}
            className="pointer-events-none whitespace-nowrap"
          >
            <p className="flex items-center gap-1.5">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

const ContactMe = () => {
  return (
    <div className="flex flex-col gap-4 sm:p-4">
      {data.contact.map(({ href, label, icon, aria }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={aria}
          className="flex items-center gap-2 group"
        >
          {React.cloneElement(icon, {
            className:
              "h-5 w-5 text-muted-foreground transition-all group-hover:animate-wiggle group-hover:scale-125 group-hover:text-primary",
          })}
          <span className="text-muted-foreground transition-all group-hover:text-primary group-hover:font-bold">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};

const Tool = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center">
            <Image
              src={`${icon}`}
              alt={`${name} icon`}
              width={30}
              height={30}
              className="h-8 w-8"
              loading="eager"

            />
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          <p className="text-sm font-semibold text-muted-foreground">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ToolsMarquee = () => {
  const { theme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const currentTheme = theme || resolvedTheme || "dark";

  const processedToolsData = data.tools.map(({ name, icon, themeDependent }) => ({
    name,
    icon: `/tools/${icon}${themeDependent && currentTheme === "dark" ? "-dark" : ""}.svg`,
  }));
  return (
    <div className="relative overflow-hidden">
      <div className="fade-mask-left transition-all duration-400" />
      <div className="fade-mask-right transition-all duration-400" />
      <Marquee pauseOnHover className="[--duration:20s]">
        <div className="flex items-center gap-6">
          {processedToolsData.map(({ name, icon }) => (
            <Tool key={name} name={name} icon={icon} />
          ))}
        </div>
      </Marquee>
    </div>
  );
};


const FAV_AI_TOOLS = [
  { name: "Claude Code", icon: "/tools/claude.svg" },
  { name: "Perplexity", icon: "/tools/perplexity.svg" },
];

const FavoriteLanguage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center gap-2 h-full">
      {FAV_AI_TOOLS.map((tool) => (
        <div key={tool.name} className="flex items-center">
          <Image
            src={tool.icon}
            alt={`${tool.name} icon`}
            width={24}
            height={24}
            className="h-5 w-5 sm:h-6 sm:w-6 ml-1"
          />
          <span className="ml-2 sm:ml-3 text-sm sm:text-base font-normal tracking-tight text-muted-foreground">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );
};
