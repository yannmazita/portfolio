// src/features/home/hooks/useLiveStats.ts
import { useState, useEffect, useRef } from "react";
import { CPU_CORES, MEMORY_TOTAL_MB, SWAP_TOTAL_MB } from "../utils/stats-data";

// Helper to generate a random number in a range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

const initialCpuUsages = CPU_CORES.map(() => random(20, 60));
const initialMemoryUsage = random(4000, 8000);
const initialSwapUsage = random(1000, 2000);

/**
 * Simulates live system statistics.
 * @returns An object with live CPU, memory, and swap usage values.
 */
export const useLiveStats = () => {
  const [cpuUsages, setCpuUsages] = useState<number[]>(initialCpuUsages);
  const [memoryUsage, setMemoryUsage] = useState<number>(initialMemoryUsage);
  const [swapUsage, setSwapUsage] = useState<number>(initialSwapUsage);

  const requestRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);

  // Store targets and current values for smooth animation
  const cpuTargetsRef = useRef<number[]>(initialCpuUsages);
  const memTargetRef = useRef<number>(initialMemoryUsage);
  const swapTargetRef = useRef<number>(initialSwapUsage);

  const animate = (time: number) => {
    // Update targets every 2 seconds
    if (time - lastUpdateTimeRef.current > 2000) {
      lastUpdateTimeRef.current = time;
      cpuTargetsRef.current = CPU_CORES.map(() => random(20, 85));
      memTargetRef.current = random(4000, 12000);
      swapTargetRef.current = random(1000, 4000);
    }

    // Interpolate current values towards targets for smooth transition
    setCpuUsages((prev) =>
      prev.map((usage, i) => usage + (cpuTargetsRef.current[i] - usage) * 0.05),
    );
    setMemoryUsage((prev) => prev + (memTargetRef.current - prev) * 0.05);
    setSwapUsage((prev) => prev + (swapTargetRef.current - prev) * 0.05);

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
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
