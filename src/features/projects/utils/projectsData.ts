// src/features/projects/utils/projectsData.ts
import { PortfolioProject } from "../types";
import { getAssetUrl } from "@/common/utils/assets";

export function projectsData(): PortfolioProject[] {
  return [
    {
      name: "apexguessr",
      mediaUrl: getAssetUrl("videos/apexguessr.mp4"),
      //thumbnailUrl: getAssetUrl("thumbnails/apexguessr.jpg"),
      projectLink: "https://apexguessr.com",
      techStack: [
        "React",
        "TypeScript",
        "Python",
        "FastAPI",
        "Postgres",
        "Docker",
      ],
      shortDescription: "Geoguessr-inspired, circuit-guessing web game",
      description:
        "Built on a hybrid-cloud architecture (Hetzner, GCP, Cloudflare), Terraform IaC and GitHub Actions CI/CD.",
    },
    {
      name: "playlistworks",
      mediaUrl: getAssetUrl("videos/playlistworks.mp4"),
      //thumbnailUrl: getAssetUrl("thumbnails/playlistworks.jpg"),
      projectLink: "https://www.github.com/yannmazita/playlistworks",
      techStack: [
        "Python",
        "QT/QML",
        "SQLite",
        "No-SQL",
        "GStreamer",
        "Mutagen",
      ],
      shortDescription: "Playlist-driven music player",
      description:
        "Play music. Create instant dynamic playlists. Any combination of tag can be used with the query language, thanks to No-SQL JSON in SQLite.",
    },
    {
      name: "winvue",
      mediaUrl: getAssetUrl("videos/winvue.mp4"),
      //thumbnailUrl: getAssetUrl("thumbnails/winvue.jpg"),
      projectLink: "https://www.github.com/yannmazita/winvue",
      techStack: ["Vue3", "Typescript"],
      shortDescription: "Window manager for Vue",
      description:
        "Display components in movable and resizable 'windows'. You can also minimize and maximize them.",
    },
    {
      name: "This website :)",
      mediaUrl: "some/link",
      projectLink: "https://www.github.com/yannmazita/portfolio",
      techStack: ["React", "Typescript", "CSS", "TailwindCSS", "React-Router"],
      shortDescription: "You're currently browsing it.",
      description:
        "Drawing inspiration specifically from the early 2000s era of fast and nimble websites, Flash animations and Electroclash music.",
    },
    /*
    {
      name: "step.ts",
      mediaUrl: "some/link",
      projectLink: "https://www.github.com/yannmazita/step.ts",
      techStack: ["React", "Typescript", "Tone.JS"],
      shortDescription: "Web-based step sequencer",
      description:
        "Virtual step sequencer allowing to create music on the web.",
    },
    */
  ];
}
