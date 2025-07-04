// src/features/resume/components/EducationCard.tsx
import { cn } from "@/common/shadcn/lib/utils";
import { EducationEntry } from "../types";

interface EducationCardProps {
  entry: EducationEntry;
  className?: string;
  style?: React.CSSProperties;
}

export const EducationCard: React.FC<EducationCardProps> = ({
  entry,
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
      <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
        <h3 className="text-portfolio-secondary text-lg font-bold">
          {entry.institution}
        </h3>
        <p className="text-sm text-white/70 sm:text-right">{entry.period}</p>
      </div>
      <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
        <h4 className="font-semibold text-white">{entry.degree}</h4>
        <p className="text-sm text-white/70 sm:text-right">{entry.location}</p>
      </div>
    </div>
  );
};
