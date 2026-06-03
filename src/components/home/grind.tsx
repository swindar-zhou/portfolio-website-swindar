"use client";

import Image from "next/image";
import { IconBarbell, IconRun } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";

const pursuits = [
  {
    icon: IconRun,
    title: "Running",
    image: "/grind/running.png",
    imagePosition: "object-[center_50%]",
    blurb:
      "Long-distance runner — the miles are where I think clearest. Training is the same loop as building product: show up, log the reps, chase the next PR.",
    stat: "Notre Dame Holy Half — 13.1 mi",
  },
  {
    icon: IconBarbell,
    title: "Boxing",
    image: "/grind/boxing.jpg",
    imagePosition: "object-center",
    blurb:
      "Competitive boxer — footwork, timing, and the discipline of the ring. It keeps me sharp under pressure and comfortable being uncomfortable.",
    stat: "Notre Dame Boxing Club",
  },
];

export default function Grind() {
  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconBarbell className={headingIconClass} />}>
        The Grind
      </SectionHeading>
      <BlurFade delay={0.1} inView>
        <p className="mx-auto mb-8 max-w-2xl text-center text-pretty text-sm sm:text-base text-muted-foreground">
          Outside of building, I train. Endurance on the road and impact in the
          ring — the same discipline that ships products.
        </p>
      </BlurFade>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pursuits.map((p, index) => (
          <BlurFade key={p.title} delay={0.15 + index * 0.05} inView>
            <div className="group flex h-full flex-col overflow-hidden rounded-xl border bg-background transition-all duration-300 hover:shadow-md">
              <div className="relative h-56 w-full overflow-hidden bg-muted">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover ${p.imagePosition} transition-transform duration-300 group-hover:scale-105`}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-center gap-2">
                  <p.icon className="h-5 w-5 text-secondary-foreground" />
                  <h3 className="text-base font-semibold text-primary">{p.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{p.blurb}</p>
                <p className="mt-auto pt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                  {p.stat}
                </p>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
