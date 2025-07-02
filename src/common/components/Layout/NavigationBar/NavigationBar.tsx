// src/common/components/Layout/NavigationBar/NavigationBar.tsx
import { NavigationButton } from "./NavigationButton";
import { navigationItems } from "@/common/utils/navigation";
import { GITHUB_URL } from "@/common/utils/navigation";
import { useAnimationStore } from "@/core/stores/useAnimationStore";
import { cn } from "@/common/shadcn/lib/utils";

export const NavigationBar: React.FC = () => {
  const sidesMounted = useAnimationStore((state) => state.sidesMounted);

  return (
    <nav className="">
      <div className="flex flex-row justify-end gap-x-0.5 bg-transparent">
        {navigationItems.map((item, index) => (
          <NavigationButton
            key={item.id}
            to={item.path}
            className={cn(
              "animate-in fade-in transition-all duration-300",
              sidesMounted ? "opacity-100" : "opacity-0",
            )}
            style={{
              transitionDelay: sidesMounted ? `${index * 100}ms` : "0ms",
            }}
          >
            {item.name}
          </NavigationButton>
        ))}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "clip-bl bg-portfolio-primary flex h-8 w-18 items-center justify-end pr-1 text-xs font-bold text-white md:h-11 md:w-24 md:text-sm",
            "animate-in fade-in transition-all duration-300",
            sidesMounted ? "opacity-100" : "opacity-0",
          )}
          style={{
            transitionDelay: sidesMounted
              ? `${navigationItems.length * 100}ms`
              : "0ms",
          }}
        >
          GITHUB
        </a>
      </div>
    </nav>
  );
};
