// src/common/components/Layout/NavigationBar/NavigationButton.tsx
import { cn } from "@/common/shadcn/lib/utils";
import { CSSProperties } from "react";
import { NavLink } from "react-router-dom";

interface NavigationButtonProps {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  to: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  className,
  style,
  children,
  to,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "clip-bl flex h-8 w-18 items-center justify-end pr-1 text-xs font-bold text-white md:h-11 md:w-24 md:text-sm",
          isActive ? "bg-portfolio-secondary" : "bg-portfolio-primary",
          className,
        )
      }
      style={style}
    >
      {children}
    </NavLink>
  );
};
