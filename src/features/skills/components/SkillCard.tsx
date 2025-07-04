// src/features/skills/components/SkillCard.tsx
import { cn } from "@/common/shadcn/lib/utils";
import { SkillCategory } from "../types";

interface SkillCardProps {
  category: SkillCategory;
  className?: string;
  style?: React.CSSProperties;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  category,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "clip-bl border border-white/20 bg-black/30 p-4 font-mono text-white",
        className,
      )}
      style={style}
    >
      <h3 className="text-portfolio-secondary mb-3 text-lg font-bold">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-cyan-800/50 px-2.5 py-1 text-sm text-cyan-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
