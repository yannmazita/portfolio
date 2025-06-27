// src/features/projects/utils/projectsData.ts
import { PortfolioProject } from "../types";
import DeleteGif from "@/assets/delete_system_32.gif";
import XPSheep from "@/assets/windows_xp_sheep.gif";

export function projectsData(): PortfolioProject[] {
  return [
    {
      name: "apexguessr",
      mediaUrl: DeleteGif,
      projectLink: "apexguessr.com",
      techStack: ["React", "TypeScript", "OpenLayers", "Python", "FastAPI"],
      shortDescription: "Geoguessr-inspired, circuit-guessing web game",
      description:
        "Test your knowledge of motorsport circuits from around the world. Identify the track and pinpoint its location on the map.",
    },
    {
      name: "playlistworks",
      mediaUrl: XPSheep,
      projectLink: "https://www.github.com/yannmazita/playlistworks",
      techStack: ["Python", "QT/QML", "SQLite"],
      shortDescription: "Playslist-driven music player",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.",
    },
    {
      name: "winvue",
      mediaUrl: "some/link",
      projectLink: "https://www.github.com/yannmazita/winvue",
      techStack: ["Vue3", "Typescript"],
      shortDescription: "Window manager for Vue",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.",
    },
    {
      name: "step.ts",
      mediaUrl: "some/link",
      projectLink: "https://www.github.com/yannmazita/step.ts",
      techStack: ["React", "Typescript", "Tone.JS"],
      shortDescription: "Web-based step sequencer",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.",
    },
  ];
}
