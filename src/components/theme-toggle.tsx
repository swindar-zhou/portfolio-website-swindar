"use client";

// import { Button } from "@/components/ui/button";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useState } from "react";


export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = () => {
    setIsToggling(true);
    setTimeout(() => setIsToggling(false), 500);

    const next = theme === "dark" ? "light" : "dark";
    const doc = document as Document & {
      startViewTransition?: (cb: () => unknown) => unknown;
    };

    if (typeof doc.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    // setTheme is synchronous (next-themes writes the class to <html>
    // immediately), so passing a sync callback is enough — the browser
    // captures the post-theme DOM as the "new" snapshot.
    doc.startViewTransition(() => {
      setTheme(next);
    });
  };

  return (
    <div className="flex relative items-center mr-4">
      {/* Sun Icon for Light Mode */}
      <IconSun
        onClick={handleToggle}
        className={`absolute cursor-pointer h-5 w-5 text-zinc-500 dark:text-zinc-300 dark:hidden hover:text-zinc-950 transition-transform duration-500 ${
          isToggling ? "animate-spin-grow" : ""
        }`}
        aria-label="Switch to Light Mode"
      />

      {/* Moon Icon for Dark Mode */}
      <IconMoonStars
        onClick={handleToggle}
        className={`absolute cursor-pointer h-5 w-5 hidden text-zinc-500 dark:block dark:text-zinc-300 hover:text-zinc-50 transition-transform duration-500 ${
          isToggling ? "animate-spin-grow" : ""
        }`}
        aria-label="Switch to Dark Mode"
      />
    </div>
  );
}