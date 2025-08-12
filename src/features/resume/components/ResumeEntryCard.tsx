// src/features/resume/components/ResumeEntryCard.tsx
import { cn } from "@/common/shadcn/lib/utils";
import { ResumeEntry } from "../types";

interface ResumeEntryCardProps {
  entry: ResumeEntry;
  className?: string;
  style?: React.CSSProperties;
}

export const ResumeEntryCard: React.FC<ResumeEntryCardProps> = ({
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
      {/* Header */}
      <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
        <h3 className="text-portfolio-secondary text-lg font-bold">
          {entry.company}
        </h3>
        <p className="text-sm text-black/70 sm:text-right">{entry.period}</p>
      </div>
      <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
        <h4 className="font-semibold text-black">{entry.role}</h4>
        <p className="text-sm text-black/70 sm:text-right">{entry.location}</p>
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-white/10"></div>

      {/* Description */}
      <ul className="space-y-2 text-sm text-black/90">
        {entry.description.map((point, index) => (
          <li key={index} className="flex">
            <span className="text-portfolio-primary mr-2">{">"}</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
