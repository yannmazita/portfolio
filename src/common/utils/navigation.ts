// src/common/utils/navigation.ts
export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  component: () => Promise<{ default: React.ComponentType }>;
}

export const navigationItems: NavigationItem[] = [
  {
    id: "home",
    name: "HOME",
    path: "/",
    component: () =>
      import("@/features/home/components/HomeSection").then((module) => ({
        default: module.HomeSection,
      })),
  },
  {
    id: "projects",
    name: "PROJECTS",
    path: "/projects",
    component: () =>
      import("@/features/projects/components/ProjectsSection").then(
        (module) => ({ default: module.ProjectsSection }),
      ),
  },
  {
    id: "resume",
    name: "RESUME",
    path: "/resume",
    component: () =>
      import("@/features/resume/components/ResumeSection").then((module) => ({
        default: module.ResumeSection,
      })),
  },
  {
    id: "skills",
    name: "SKILLS",
    path: "/skills",
    component: () =>
      import("@/features/skills/components/SkillsSection").then((module) => ({
        default: module.SkillsSection,
      })),
  },
];

export const GITHUB_URL = "https://github.com/yannmazita";
