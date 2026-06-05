"use client";

import { IconFileCv, IconDownload, IconExternalLink } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";

const RESUME_URL = "/resume.pdf";

export default function Resume() {
  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconFileCv className={headingIconClass} />}>
        Résumé
      </SectionHeading>

      <BlurFade delay={0.1} inView>
        <p className="mx-auto mb-6 max-w-2xl text-center text-pretty text-sm sm:text-base text-muted-foreground">
          The one-page version of everything above — experience, projects, and
          education at a glance.
        </p>
      </BlurFade>

      <BlurFade delay={0.15} inView>
        <div className="mb-6 flex items-center justify-center gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium text-secondary-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground"
          >
            <IconExternalLink className="h-4 w-4" />
            View PDF
          </a>
          <a
            href={RESUME_URL}
            download="Swindar_Zhou_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <IconDownload className="h-4 w-4" />
            Download
          </a>
        </div>
      </BlurFade>

      {/* Inline preview — desktop only (mobile browsers handle PDFs poorly inline) */}
      <BlurFade delay={0.2} inView>
        <div className="mx-auto hidden w-full max-w-3xl overflow-hidden rounded-xl border bg-muted shadow-sm sm:block">
          <object
            data={`${RESUME_URL}#view=FitH`}
            type="application/pdf"
            className="h-[85vh] w-full"
          >
            <iframe
              src={RESUME_URL}
              title="Swindar Zhou résumé"
              className="h-[85vh] w-full"
            />
          </object>
        </div>
      </BlurFade>
    </div>
  );
}
