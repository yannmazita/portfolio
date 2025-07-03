// src/features/home/hooks/useLiveStats.ts
import { useState, useEffect } from "react";
import { CPU_CORES, MEMORY_TOTAL_MB, SWAP_TOTAL_MB } from "../utils/stats-data";
import { random, jitter } from "@/common/utils/math";

/**
 * Simulates live system statistics.
 * @returns An object with live CPU, memory, and swap usage values.
 */
export const useLiveStats = () => {
  const [cpuUsages, setCpuUsages] = useState<number[]>(
    CPU_CORES.map(() => random(5, 30)),
  );
  const [memoryUsage, setMemoryUsage] = useState<number>(
    random(MEMORY_TOTAL_MB * 0.4, MEMORY_TOTAL_MB * 0.65),
  );
  const [swapUsage, setSwapUsage] = useState<number>(
    random(0, SWAP_TOTAL_MB * 0.05),
  );

  useEffect(() => {
    const updateStats = () => {
      setCpuUsages((prev) => prev.map(() => random(5, 50)));

      setMemoryUsage((prev) =>
        jitter(
          prev,
          MEMORY_TOTAL_MB * 0.3,
          MEMORY_TOTAL_MB * 0.75,
          MEMORY_TOTAL_MB * 0.02,
        ),
      );

      setSwapUsage((prev) =>
        jitter(prev, 0, SWAP_TOTAL_MB * 0.1, SWAP_TOTAL_MB * 0.01),
      );
    };

    // Update stats every 2.5 to 4.5 seconds for variability
    const interval = setInterval(updateStats, random(2500, 4500));

    return () => clearInterval(interval);
  }, []);

  return {
    cpuUsages,
    memoryUsage: {
      used: memoryUsage,
      total: MEMORY_TOTAL_MB,
      percent: (memoryUsage / MEMORY_TOTAL_MB) * 100,
    },
    swapUsage: {
      used: swapUsage,
      total: SWAP_TOTAL_MB,
      percent: (swapUsage / SWAP_TOTAL_MB) * 100,
    },
  };
};
