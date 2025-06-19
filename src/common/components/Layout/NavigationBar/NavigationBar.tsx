// src/common/components/Layout/NavigationBar/NavigationBar.tsx
import { useMenuStore } from "@/core/stores/useMenuStore";
import { NavigationButton } from "./NavigationButton";
import { navigationItems } from "@/common/utils/navigation";
import { GITHUB_URL } from "@/common/utils/navigation";

export const NavigationBar: React.FC = () => {
  const { selectedIndex, setSelectedIndex } = useMenuStore();

  return (
    <nav className="">
      <div className="flex flex-row justify-end gap-x-0.5">
        {navigationItems.map((item, index) => (
          <NavigationButton
            key={index}
            isActive={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </NavigationButton>
        ))}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="clip-bl bg-portfolio-primary flex h-8 w-18 items-center justify-end text-xs text-white"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};
