// src/common/components/Layout/NavigationBar/NavigationBar.tsx
import { useMenuStore } from "@/core/stores/useMenuStore";
import { NavigationButton } from "./NavigationButton";
import { navigationItems } from "@/common/utils/navigation";
import { GITHUB_URL } from "@/common/utils/navigation";

interface NavigationBarProps {
  pauseScrollSpy: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  pauseScrollSpy,
}) => {
  const { selectedIndex, setSelectedIndex } = useMenuStore();

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
          >
            {item.name}
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
