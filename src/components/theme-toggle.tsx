"use client";

import { Button } from "@/components/ui/button";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="z-1 h-8 w-8 px-0 py-0 rounded-sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
      <IconSun className="h-[3rem] w-[3rem] text-neutral-500 dark:hidden dark:hover:text-neutral-50 dark:text-neutral-400" />
      <IconMoonStars className="z-20 hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-300 sm:dark:text-neutral-400 hover:text-neutral-50" />
    </Button>
  );
}