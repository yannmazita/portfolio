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
        "SQL",
        "Java",
        "Bash",
      ],
    },
    {
      id: "technologies",
      title: "Tech Stack",
      skills: [
        "FastAPI",
        "React",
        "Vue",
        "Pytest",
        "Docker",
        "Terraform",
        "Github Actions",
        "GNU/Linux",
        "SpringBoot",
      ],
    },
    {
      id: "tools",
      title: "Dev Tools",
      skills: ["VS Code", "Neovim", "Vim", "PyCharm", "Eclipse", "Git"],
    },
  ];
}
