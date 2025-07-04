// src/features/skills/components/SkillsSection.tsx
import { useAnimationStore } from "@/core/stores/useAnimationStore";
import { skillsData } from "../utils/skillsData";
import { SkillCard } from "./SkillCard";
import { cn } from "@/common/shadcn/lib/utils";

export const SkillsSection: React.FC = () => {
  const textMounted = useAnimationStore((state) => state.textMounted);
  const categories = skillsData();

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center p-4">
      <h1
        className={cn(
          "font-mono text-2xl font-bold tracking-widest text-white uppercase md:text-3xl",
          "animate-in fade-in duration-500",
          textMounted ? "opacity-100" : "opacity-0",
        )}
      >
        Technical Proficiency
      </h1>

      <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <SkillCard
            key={category.id}
            category={category}
            className={cn(
              "animate-in fade-in-0 slide-in-from-top-8 duration-500",
              textMounted ? "opacity-100" : "opacity-0",
            )}
            style={{
              transitionDelay: textMounted ? `${200 + index * 150}ms` : "0ms",
            }}
          />
        ))}
      </div>
    </section>
  );
};
