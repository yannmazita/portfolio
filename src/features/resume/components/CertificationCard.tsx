// src/features/resume/components/CertificationCard.tsx
import { cn } from "@/common/shadcn/lib/utils";
import { CertificationEntry } from "../types";

interface CertificationCardProps {
  entry: CertificationEntry;
  className?: string;
  style?: React.CSSProperties;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({
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
          {entry.issuer} Certified - {entry.name}
        </h3>
        <p className="text-sm text-white/70 sm:text-right">{entry.period}</p>
      </div>
      {entry.credentialId && (
        <p className="text-portfolio-primary mt-1 text-xs font-semibold tracking-wider">
          CREDENTIAL ID: {entry.credentialId}
        </p>
      )}

      {/* Divider */}
      <div className="my-3 h-px bg-white/10"></div>

      {/* Description */}
      <ul className="space-y-2 text-sm text-white/90">
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
