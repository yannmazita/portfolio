// src/common/utils/navigation.ts
export interface NavigationItem {
  id: string;
  name: string;
}

export const navigationItems: NavigationItem[] = [
  { id: "home", name: "HOME" },
  { id: "projects", name: "PROJECTS" },
  { id: "resume", name: "RESUME" },
  { id: "skills", name: "SKILLS" },
];

export const GITHUB_URL = "https://github.com/yannmazita";
