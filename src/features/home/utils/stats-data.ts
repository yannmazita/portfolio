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
    pid: 101,
    user: "mazita",
    cpu: 25.5,
    mem: 8.2,
    command: "/bin/react-mastery --v=19",
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
    pid: 303,
    user: "mazita",
    cpu: 1.2,
    mem: 5.5,
    command: "/usr/sbin/nginx -g 'daemon off;'",
  },
  {
    pid: 404,
    user: "mazita",
    cpu: 9.8,
    mem: 3.1,
    command: "docker-compose up -d",
  },
  {
    pid: 505,
    user: "mazita",
    cpu: 20.3,
    mem: 15.9,
    command: "/usr/games/tekken --mode=arcade",
  },
  { pid: 606, user: "mazita", cpu: 1.0, mem: 1.2, command: "zsh" },
];

export const MEMORY_TOTAL_MB = 32768;
export const SWAP_TOTAL_MB = 8192;
