// src/core/stores/useMenuStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { navigationItems } from "@/common/utils/navigation";

interface MenuState {
  items: string[];
  selectedIndex: number;
  selectNext: () => void;
  selectPrevious: () => void;
  setSelectedIndex: (index: number) => void;
}

export const useMenuStore = create<MenuState>()(
  devtools(
    (set) => ({
      items: navigationItems,
      selectedIndex: navigationItems.indexOf("HOME"),

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
