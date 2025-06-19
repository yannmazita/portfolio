// src/core/routes.ts
import { Layout } from "@/common/components/Layout/Layout";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => {
          const { Home } = await import("@/features/home/components/Home");
          return { Component: Home };
        },
      },
    ],
  },
];
