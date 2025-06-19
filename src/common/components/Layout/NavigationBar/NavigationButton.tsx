// src/common/components/Layout/NavigationBar/NavigationButton.tsx
import { cn } from "@/common/shadcn/lib/utils";

interface NavigationButtonProps {
  className?: string;
  children?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  className,
  children,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "clip-bl flex h-8 w-18 items-center justify-end text-xs text-white",
        isActive ? "bg-portfolio-secondary" : "bg-portfolio-primary",
        className,
      )}
    >
      {children}
    </button>
  );
};
