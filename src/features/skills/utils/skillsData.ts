// src/features/skills/utils/skillsData.ts
import { SkillCategory } from "../types";

export function skillsData(): SkillCategory[] {
  return [
    {
      id: "languages",
      title: "Languages",
      skills: [
        "Python",
        "Javascript",
        "Typescript",
        "HTML",
        "CSS",
        "SQL (Postgres)",
        "Java",
        "Bash",
      ],
    },
    {
      id: "frameworks",
      title: "Frameworks",
      skills: ["FastAPI", "React", "Vue", "Node.js", "SpringBoot"],
    },
    {
      id: "technologies",
      title: "Technologies",
      skills: ["Docker", "Terraform", "Github Actions", "Pytest", "GNU/Linux"],
    },
    {
      id: "libraries",
      title: "Libraries",
      skills: [
        "React-Router",
        "Vue-Router",
        "Zustand",
        "Pinia",
        "asyncio",
        "SQLAlchemy",
      ],
    },
    {
      id: "tools",
      title: "Dev Tools",
      skills: ["VS Code", "Neovim", "Vim", "PyCharm", "Eclipse", "Git"],
    },
  ];
}
