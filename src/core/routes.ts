// src/core/routes.ts
import { Layout } from "@/common/components/Layout/Layout";
import { navigationItems } from "@/common/utils/navigation";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    Component: Layout,
    children: navigationItems.map((item) => ({
      index: item.path === "/",
      path: item.path === "/" ? undefined : item.path,
      lazy: async () => {
        const { default: Component } = await item.component();
        return { Component };
      },
    })),
  },
];
