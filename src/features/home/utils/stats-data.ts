// src/features/home/utils/stats-data.ts
export interface Process {
  pid: number;
  user: string;
  cpu: number;
  mem: number;
  command: string;
}

export const CPU_CORES = [
  { id: 1, name: "FRONTEND" },
  { id: 2, name: "BACKEND" },
  { id: 3, name: "DEVOPS" },
  { id: 4, name: "DESIGN" },
];

export const PROCESS_LIST: Process[] = [
  {
    pid: 1,
    user: "root",
    cpu: 0.0,
    mem: 0.0,
    command: "/sbin/init",
  },
  {
    pid: 1231452,
    user: "mazita",
    cpu: 0.0,
    mem: 0.0,
    command: "npm create vite@latest",
  },
  /*
  {
    pid: 202,
    user: "mazita",
    cpu: 0.0,
    mem: 0.0,
    command: "/home/mazita/.local/bin/typescript-language-server --stdio",
  },
  */
  {
    pid: 1232848,
    user: "mazita",
    cpu: 1.1,
    mem: 0.0,
    command: "docker compose up --d postgres-dev",
  },
  {
    pid: 1233552,
    user: "mazita",
    cpu: 10.3,
    mem: 15.9,
    command: "python -m src.main",
  },
  { pid: 3542, user: "mazita", cpu: 0.0, mem: 0.0, command: "/usr/bin/zsh" },
  { pid: 383413, user: "mazita", cpu: 0.0, mem: 1.2, command: "nvim" },
];

export const MEMORY_TOTAL_MB = 32768;
export const SWAP_TOTAL_MB = 8192;
