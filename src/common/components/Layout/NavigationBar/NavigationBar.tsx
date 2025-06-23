// src/common/components/Layout/NavigationBar/NavigationBar.tsx
import { useMenuStore } from "@/core/stores/useMenuStore";
import { NavigationButton } from "./NavigationButton";
import { navigationItems } from "@/common/utils/navigation";
import { GITHUB_URL } from "@/common/utils/navigation";
import { useAnimationStore } from "@/core/stores/useAnimationStore";
import { cn } from "@/common/shadcn/lib/utils";

interface NavigationBarProps {
  pauseScrollSpy: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  pauseScrollSpy,
}) => {
  const { selectedIndex, setSelectedIndex } = useMenuStore();
  const sidesMounted = useAnimationStore((state) => state.sidesMounted);

  const handleNavigationClick = (sectionId: string, index: number) => {
    pauseScrollSpy();
    setSelectedIndex(index);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="">
      <div className="flex flex-row justify-end gap-x-0.5 bg-transparent">
        {navigationItems.map((item, index) => (
          <NavigationButton
            key={item.id}
            isActive={index === selectedIndex}
            onClick={() => handleNavigationClick(item.id, index)}
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
            "clip-bl bg-portfolio-primary flex h-8 w-18 items-center justify-end text-xs text-white",
            "animate-in fade-in transition-all duration-300",
            sidesMounted ? "opacity-100" : "opacity-0",
          )}
          style={{
            transitionDelay: sidesMounted
              ? `${navigationItems.length * 100}ms`
              : "0ms",
          }}
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};
