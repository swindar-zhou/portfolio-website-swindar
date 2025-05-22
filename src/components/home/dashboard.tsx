"use client";

// import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { IconMapPin } from "@tabler/icons-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { IconLayoutDashboard, IconTool, IconLink, IconCoffee, IconClockHour4, IconMail, IconBrandGithub, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";
import { Globe } from "@/components/magicui/globe";
import styles from "./dashboard.module.css";
import { SectionHeading } from "../layout/section-heading";
// ...existing code...
export default function Dashboard() {
  return (
    <div className="flex flex-col w-full">
      <SectionHeading icon={<IconLayoutDashboard className="h-5 w-5 text-secondary-foreground" />}>
        Experience
      </SectionHeading>
      <ul
        className={`grid w-full gap-4 ${styles.dashboardGrid}`}>
        <GridItem
          area="location"
          icon={<IconMapPin className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />}
          title="Greater Boston, MA"
        >
          <Globe />
        </GridItem>
        <GridItem
          area="tools"
          icon={<IconTool className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />}
          title="Tools"
        >
        </GridItem>
        <GridItem
          area="contact"
          icon={<IconLink className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />}
          title="Contact Me"
        >
          <ContactMe />
        </GridItem>
        <GridItem
          area="hours"
          icon={<IconClockHour4 className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />}
          title="Hours Coding"
        >
        </GridItem>
        <GridItem
          area="coffees"
          icon={<IconCoffee className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />}
          title="Coffees Consumed"
        >
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
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-lg border-0.75 p-4 shadow-[0px_0px_12px_0px_#ebecf0] dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-4">
          <div className="relative flex flex-row items-center gap-3">
            <div className="pt-1">
              {icon}
            </div>
            <div className="space-y-2">
              <h3 className="pt-0.5 text-sm text-start font-semibold text-black dark:text-white">
                {title}
              </h3>
            </div>
          </div>
          {/* <h2
            className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-muted-foreground"
              >
            {description}
            </h2> */}
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
      <a
        href="mailto:your@email.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Email"
        className="flex items-center gap-2 group"
      >
        <IconMail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-muted-foreground group-hover:text-primary transition-colors">Mail</span>
      </a>
      <a
        href="https://www.linkedin.com/in/your-linkedin"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="flex items-center gap-2 group"
      >
        <IconBrandLinkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-muted-foreground group-hover:text-primary transition-colors">LinkedIn</span>
      </a>
      <a
        href="https://github.com/your-github"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="flex items-center gap-2 group"
      >
        <IconBrandGithub className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-muted-foreground group-hover:text-primary transition-colors">GitHub</span>
      </a>
      <a
        href="https://instagram.com/your-instagram"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="flex items-center gap-2 group"
      >
        <IconBrandInstagram className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-muted-foreground group-hover:text-primary transition-colors">Instagram</span>
      </a>
    </div>
  );
}
