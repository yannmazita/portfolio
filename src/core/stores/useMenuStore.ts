// src/core/stores/useMenuStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { navigationItems, NavigationItem } from "@/common/utils/navigation";

interface MenuState {
  items: NavigationItem[];
  selectedIndex: number;
  selectNext: () => void;
  selectPrevious: () => void;
  setSelectedIndex: (index: number) => void;
}

export const useMenuStore = create<MenuState>()(
  devtools(
    (set) => ({
      items: navigationItems,
      // Find the index of the 'HOME' item for the initial state
      selectedIndex: navigationItems.findIndex((item) => item.id === "home"),

      selectNext: () =>
        set((state) => ({
          selectedIndex: (state.selectedIndex + 1) % state.items.length,
        })),

      selectPrevious: () =>
        set((state) => ({
          selectedIndex:
            (state.selectedIndex - 1 + state.items.length) % state.items.length,
        })),

      setSelectedIndex: (index) =>
        set((state) => {
          if (index >= 0 && index < state.items.length) {
            return { selectedIndex: index };
          }
          return {};
        }),
    }),
    {
      name: "menu-store",
    },
  ),
);
