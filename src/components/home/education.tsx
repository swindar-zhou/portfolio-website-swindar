"use client";

import { ExperienceItem } from "./experience";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconSchool } from "@tabler/icons-react";

export default function Education() {
  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconSchool className={headingIconClass} />}>
        Education
      </SectionHeading>
      <div className="space-y-4">
        <BlurFade delay={0.1} direction="right" inView>
          <ExperienceItem
            image="/experience/stanford.png"
            company="Stanford University"
            role="M.S. in Bioengineering (AI + Healthcare)"
            date="Expected May 2027"
            location="Stanford, CA"
            skills={["Bioengineering", "Machine Learning", "Research", "Python"]}
            href="https://www.stanford.edu"
          />
        </BlurFade>
        <BlurFade delay={0.15} direction="right" inView>
          <ExperienceItem
            image="/experience/notredame.png"
            company="University of Notre Dame"
            role="B.S. in Computer Science"
            date="Graduated May 2026"
            location="Notre Dame, IN"
            skills={["Python", "JavaScript", "TypeScript", "Swift", "SQL", "AI/ML"]}
            href="https://www.nd.edu"
          />
        </BlurFade>
      </div>
    </div>
  );
}
