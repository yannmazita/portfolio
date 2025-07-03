// src/features/projects/utils/projectsData.ts
import { PortfolioProject } from "../types";
import DeleteGif from "@/assets/delete_system_32.gif";
import XPSheep from "@/assets/windows_xp_sheep.gif";

export function projectsData(): PortfolioProject[] {
  return [
    {
      name: "apexguessr",
      mediaUrl: DeleteGif,
      projectLink: "https://apexguessr.com",
      techStack: [
        "React",
        "TypeScript",
        "Python",
        "FastAPI",
        "Postgres",
        "Docker",
        "Terraform",
        "GCP",
      ],
      shortDescription: "Geoguessr-inspired, circuit-guessing web game",
      description:
        "Test your knowledge of motorsport circuits from around the world. Identify the track and pinpoint its location on the map.",
    },
    {
      name: "playlistworks",
      mediaUrl: XPSheep,
      projectLink: "https://www.github.com/yannmazita/playlistworks",
      techStack: ["Python", "QT/QML", "SQLite", "GStreamer", "Mutagen"],
      shortDescription: "Playlist-driven music player",
      description:
        "Play your music through easy-to-create dynamic playlists. Any combination of metadata tag can be used to create your playlists.",
    },
    {
      name: "winvue",
      mediaUrl: "some/link",
      projectLink: "https://www.github.com/yannmazita/winvue",
      techStack: ["Vue3", "Typescript"],
      shortDescription: "Window manager for Vue",
      description:
        "Display components in movable and resizable 'windows'. You can also minimize and maximze them.",
    },
    {
      name: "step.ts",
      mediaUrl: "some/link",
      projectLink: "https://www.github.com/yannmazita/step.ts",
      techStack: ["React", "Typescript", "Tone.JS"],
      shortDescription: "Web-based step sequencer",
      description:
        "Virtual step sequencer allowing to create music on the web.",
    },
  ];
}
