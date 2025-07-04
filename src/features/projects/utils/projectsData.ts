// src/features/projects/utils/projectsData.ts
import { PortfolioProject } from "../types";
import ApexTimelapse from "@/assets/apexguessr.mp4";
import WinvueTimelapse from "@/assets/winvue.mp4";
import PlaylistworksTimelapse from "@/assets/playlistworks.mp4";

export function projectsData(): PortfolioProject[] {
  return [
    {
      name: "apexguessr",
      mediaUrl: ApexTimelapse,
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
        "Test your knowledge of motorsport circuits from around the world. Deployed on GCP using Terraform and a fully automated CI/CD (Github Actions) pipeline.",
    },
    {
      name: "playlistworks",
      mediaUrl: PlaylistworksTimelapse,
      projectLink: "https://www.github.com/yannmazita/playlistworks",
      techStack: ["Python", "QT/QML", "SQLite", "GStreamer", "Mutagen"],
      shortDescription: "Playlist-driven music player",
      description:
        "Play music. Create instant dynamic playlists. Any combination of metadata tag can be used to create your playlists with the query language.",
    },
    {
      name: "winvue",
      mediaUrl: WinvueTimelapse,
      projectLink: "https://www.github.com/yannmazita/winvue",
      techStack: ["Vue3", "Typescript"],
      shortDescription: "Window manager for Vue",
      description:
        "Display components in movable and resizable 'windows'. You can also minimize and maximize them.",
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
