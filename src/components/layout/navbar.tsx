"use client";
import React, { JSX, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../theme-toggle";
import { useTransitionRouter } from "next-view-transitions";
import { CommandPaletteButton } from "../command-palette/command-palette-button";
// import Link from "next/link";
// import Image from "next/image";


export const Navbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {

  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const router = useTransitionRouter();

  useMotionValueEvent(scrollY, "change", (current) => {

    if (typeof current === "number") {
      const previous = scrollY.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      if (current < 50) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleNavClick = (link: string) => {
    if (link.startsWith("/")) {
      router.push(link);
      return;
    }
    if (window.location.pathname !== "/") {
      router.push(`/#${link}`);
      return;
    }
    const section = document.getElementById(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex sm:max-w-5xl w-full justify-self-center backdrop-blur-lg fixed top-0 sm:top-4 inset-x-0 mx-auto md:rounded-lg sm:bg-none dark:bg-background/10 sm:dark:bg-background/20 bg-white/30 z-[5000] pr-4 pl-6 py-4 items-center justify-between",
            className
          )}

        >
          {/* Links in the center */}
          <div className="flex gap-6 ml-auto mr-4">
            {navItems.map((navItem, idx) => (
              <button
                key={`link=${idx}`}
                onClick={() => handleNavClick(navItem.link)}
                className={cn(
                  "relative font-semibold text-slate-700 dark:text-muted-foreground items-center flex space-x-1 hover:text-black dark:hover:text-white transition-colors duration-300"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm">{navItem.name}</span>
              </button>
            ))}
            <CommandPaletteButton />
            <ModeToggle />
          </div>

          <div className="flex items-center">
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};