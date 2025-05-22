"use client";

import React from "react";
// import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { IconMapPin } from "@tabler/icons-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { IconLayoutDashboard, IconTool, IconLink, IconCoffee, IconClockHour4} from "@tabler/icons-react";
import { Globe } from "@/components/magicui/globe";
import styles from "./dashboard.module.css";
import { SectionHeading } from "../layout/section-heading";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { contactLinks } from "@/data/data";


// ...existing code...
export default function Dashboard() {
  return (
    <div className="flex flex-col w-full">
      <SectionHeading icon={<IconLayoutDashboard className="h-5 w-5 text-secondary-foreground" />}>
        Dashboard
      </SectionHeading>
      <ul
        className={`grid w-full gap-4 ${styles.dashboardGrid}`}>
        <GridItem
          area="location"
          icon={<IconMapPin className="h-5 w-5 text-primary" />}
          title="Greater Boston, MA"
        >
          <Globe />
        </GridItem>
        <GridItem
          area="tools"
          icon={<IconTool className="h-5 w-5 text-primary" />}
          title="Tools"
        >
        </GridItem>
        <GridItem
          area="contact"
          icon={<IconLink className="h-5 w-5 text-primary" />}
          title="Contact Me"
        >
          <ContactMe />
        </GridItem>
        <GridItem
          area="hours"
          icon={<IconClockHour4 className="h-5 w-5 text-primary" />}
          title="Hours Coding"
        >
          <NumberTicker
            value={5223}
            className="whitespace-pre-wrap text-3xl font-semibold tracking-tighter text-muted-foreground"
          />
        </GridItem>
      
        <GridItem
          area="coffees"
          icon={<IconCoffee className="h-5 w-5 text-primary" />}
          title="Coffees Consumed"
        >
          <NumberTicker
            value={1134}
            className="whitespace-pre-wrap text-3xl font-semibold tracking-tighter text-muted-foreground"
          />
        </GridItem>
      </ul>
    </div>
  );
}



interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const GridItem = ({ area, icon, title, children }: GridItemProps) => {
  return (
    <li
      className="min-h-[8rem] w-full list-none"
      style={{ gridArea: area }}
    >
      <div className="relative mx-auto h-full rounded-xl border p-2 md:rounded-2xl md:p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-lg border-0.75 p-4 shadow-[0px_0px_12px_0px_#ebecf0] dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-row items-center gap-3">
            <div className="pt-0">
              {icon}
            </div>
            <div className="space-y-2">
              <h3 className="pt-0.5 text-sm text-start font-semibold text-black dark:text-white">
                {title}
              </h3>
            </div>
          </div>
          <div >
            {children}
          </div>
        </div>
      </div>
    </li>
  );
};

const ContactMe = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {contactLinks.map(({ href, label, icon, aria }) => (
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
              "h-5 w-5 text-muted-foreground transition-all group-hover:h-6 group-hover:w-6 group-hover:text-white",
          })}
          <span className="text-muted-foreground transition-all group-hover:text-white group-hover:font-bold">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};