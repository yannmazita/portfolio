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
        "clip-bl border-portfolio-primary/80 border p-4 font-mono text-black",
        className,
      )}
      style={style}
    >
      <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
        <h3 className="text-portfolio-secondary text-lg font-bold">
          {entry.institution}
        </h3>
        <p className="text-sm text-black/70 sm:text-right">{entry.period}</p>
      </div>
      <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
        <h4 className="font-semibold text-black">{entry.degree}</h4>
        <p className="text-sm text-black/70 sm:text-right">{entry.location}</p>
      </div>
    </div>
  );
};
