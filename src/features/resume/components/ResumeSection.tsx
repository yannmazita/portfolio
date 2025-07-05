// src/features/resume/components/ResumeSection.tsx
import { useAnimationStore } from "@/core/stores/useAnimationStore";
import { ResumeEntryCard } from "./ResumeEntryCard";
import { resumeData } from "../utils/resumeData";
import { cn } from "@/common/shadcn/lib/utils";
import { educationData } from "../utils/educationData";
import { EducationCard } from "./EducationCard";
import { getAssetUrl } from "@/common/utils/assets";
import { Meta } from "@/common/components/Meta";

export const ResumeSection: React.FC = () => {
  const textMounted = useAnimationStore((state) => state.textMounted);
  const experienceEntries = resumeData();
  const educationEntries = educationData();

  // Calculate delays for animation choreography
  const baseExperienceDelay = 300;
  const experienceStagger = 150;
  const formationDelay =
    baseExperienceDelay + experienceEntries.length * experienceStagger;
  const educationStagger = 150;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center p-4">
      <Meta
        title="Resume"
        description="Checkout my resume featuring my work experence and education."
      />

      {/* Experience Section */}
      <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <h2
          className={cn(
            "font-mono text-2xl font-bold tracking-widest text-white uppercase md:text-3xl",
            "animate-in fade-in duration-500",
            textMounted ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: textMounted ? "100ms" : "0ms" }}
        >
          Service Record
        </h2>
        <a
          href={getAssetUrl("/resume/cv_yann_mazita.pdf")}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "clip-bl bg-portfolio-primary hover:bg-portfolio-secondary flex h-11 w-48 items-center justify-center px-4 font-mono text-sm font-bold text-white transition-colors",
            "animate-in fade-in duration-500",
            textMounted ? "opacity-100" : "opacity-0",
          )}
          style={{
            transitionDelay: textMounted ? "200ms" : "0ms",
          }}
        >
          DOWNLOAD PDF
        </a>
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-6">
        {experienceEntries.map((entry, index) => (
          <ResumeEntryCard
            key={entry.id}
            entry={entry}
            className={cn(
              "animate-in fade-in-0 slide-in-from-top-8 duration-500",
              textMounted ? "opacity-100" : "opacity-0",
            )}
            style={{
              transitionDelay: textMounted
                ? `${baseExperienceDelay + index * experienceStagger}ms`
                : "0ms",
            }}
          />
        ))}
      </div>

      {/* Education Section */}
      <div className="mt-12 flex w-full flex-col items-start">
        <h2
          className={cn(
            "font-mono text-2xl font-bold tracking-widest text-white uppercase md:text-3xl",
            "animate-in fade-in duration-500",
            textMounted ? "opacity-100" : "opacity-0",
          )}
          style={{
            transitionDelay: textMounted ? `${formationDelay}ms` : "0ms",
          }}
        >
          Formation
        </h2>
        <div className="mt-4 grid w-full grid-cols-1 gap-6">
          {educationEntries.map((entry, index) => (
            <EducationCard
              key={entry.id}
              entry={entry}
              className={cn(
                "animate-in fade-in-0 slide-in-from-top-4 duration-500",
                textMounted ? "opacity-100" : "opacity-0",
              )}
              style={{
                transitionDelay: textMounted
                  ? `${formationDelay + 150 + index * educationStagger}ms`
                  : "0ms",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
