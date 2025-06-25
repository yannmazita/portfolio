// src/features/projects/components/ProjectSelection.tsx

import { cn } from "@/common/shadcn/lib/utils";

interface ProjectSelectionProps {
  className?: string;
}

export const ProjectSelection: React.FC<ProjectSelectionProps> = ({
  className,
}) => {
  return <div className={cn("text-red-600", className)}>omg</div>;
};
