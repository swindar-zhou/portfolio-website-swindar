"use client";

import Image from "next/image";
import { IconRipple } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";

// Sea & lakes — places I go to reset. Swap photos in /public/water/.
const spots = [
  { image: "/water/shenzhen.jpg", caption: "Shenzhen Bay", sub: "Where I grew up" },
  { image: "/water/notre-dame-lake.jpg", caption: "St. Joseph's Lake", sub: "Notre Dame, IN" },
  { image: "/water/lake-michigan.jpg", caption: "Lake Michigan", sub: "Benton Harbor, MI" },
];

export default function Water() {
  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconRipple className={headingIconClass} />}>
        By the Water
      </SectionHeading>
      <BlurFade delay={0.1} inView>
        <p className="mx-auto mb-8 max-w-2xl text-center text-pretty text-sm sm:text-base text-muted-foreground">
          From the bay I grew up on to the lakes I find wherever I land — water
          is where I slow down, think, and reset.
        </p>
      </BlurFade>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {spots.map((spot, index) => (
          <BlurFade key={spot.caption} delay={0.15 + index * 0.05} inView>
            <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border bg-muted">
              <Image
                src={spot.image}
                alt={spot.caption}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-base font-semibold text-white">{spot.caption}</p>
                <p className="text-xs text-white/80">{spot.sub}</p>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
