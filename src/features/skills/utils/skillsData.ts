// src/features/skills/utils/skillsData.ts
import { SkillCategory } from "../types";

export function skillsData(): SkillCategory[] {
  return [
    {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      skills: [
        "Google Cloud (GCP)",
        "Terraform",
        "Docker",
        "Docker Compose",
        "GitHub Actions (CI/CD)",
        "GNU/Linux",
        "Bash Scripting",
        "Git",
      ],
    },
    {
      id: "languages",
      title: "Languages & Databases",
      skills: [
        "Python",
        "TypeScript",
        "JavaScript",
        "SQL (Postgres, SQLite)",
        "Java",
        "HTML5 / CSS3",
      ],
    },
    {
      id: "frameworks",
      title: "Frameworks & Libraries",
      skills: [
        "FastAPI",
        "React",
        "Vue 3",
        "Node.js",
        "Spring Boot",
        "asyncio",
        "SQLAlchemy",
        "Qt (PySide6)",
        "QML",
        "Zustand",
        "Pinia",
      ],
    },
    {
      id: "tools",
      title: "Dev Tools",
      skills: ["Neovim", "VS Code", "Vim", "PyCharm", "Eclipse"],
    },
  ];
}
