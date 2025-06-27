// src/features/projects/hooks/useLightning.ts
import { useRef, useEffect, RefObject } from "react";
import { LightningBolt, LightningOptions } from "../types";
import { random } from "@/common/utils/math";

const DEFAULT_LIGHTNING_OPTIONS: LightningOptions = {
  // Timing
  minDelay: 15,
  maxDelay: 40,

  // Bolt creation
  minCreateCount: 1,
  maxCreateCount: 4,

  // Bolt physics
  minPathLength: 80,
  maxPathLength: 150,
  minSpeed: 30,
  maxSpeed: 50,
  minTurniness: 0.1,
  maxTurniness: 0.5,

  // Aesthetics
  minLineWidth: 1,
  maxLineWidth: 4,
  blur: 20,
  blurColor: "rgba(120, 180, 255, 0.5)",
  strokeColor: "rgba(220, 235, 255, 0.8)",
  trailLength: 30,

  // Starting position and velocity
  startPosition: "edges",
  startPositionBias: "uniform",
  startVelocity: "inward",

  // Perimeter mode
  perimeterMode: "none",
  perimeterSize: 0.6, // Default to a square 60% of the smaller canvas dimension
  perimeterBidirectional: false,
};

interface TrailSegment {
  path: { x: number; y: number }[];
  age: number; // Age in milliseconds
  lineWidth: number;
}

/**
 * @hook useLightning
 *
 * Renders a continuous, generative lightning effect onto a canvas element.
 * It handles the animation loop, canvas resizing, and all drawing logic internally.
 * The hook reads its dimensions from the canvas element, so the canvas MUST be
 * styled with a width and height (ex: using CSS or Tailwind classes) for the
 * effect to be visible.
 *
 * @param canvasRef - Ref object pointing to the canvas element where the animation will be drawn.
 * @param options - Optional object to override the default lightning effect parameters. See `LightningOptions` for all available properties.
 */
export const useLightning = (
  canvasRef: RefObject<HTMLCanvasElement>,
  options: Partial<LightningOptions> = {},
) => {
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const config = { ...DEFAULT_LIGHTNING_OPTIONS, ...options };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w: number;
    let h: number;

    const lightning: LightningBolt[] = [];
    const trails: TrailSegment[] = [];
    let lightTimeCurrent = 0;
    let lightTimeTotal = random(config.minDelay, config.maxDelay);

    let lastTime = performance.now();
    let accumulator = 0;
    const timestep = 1000 / 60;
    const trailDuration = config.trailLength * timestep;

    /**
     * Resolves perimeterSize option into pixel dimensions.
     */
    const getRectangleDimensions = (): { width: number; height: number } => {
      if (typeof config.perimeterSize === "function") {
        return config.perimeterSize(w, h);
      }
      // Default to a square based on the smaller canvas dimension
      const size = Math.min(w, h) * (config.perimeterSize as number);
      return { width: size, height: size };
    };

    /**
     * Gets position on a rectangular perimeter based on progress (0-1).
     */
    const getRectanglePerimeterPosition = (
      progress: number,
      rectWidth: number,
      rectHeight: number,
    ): { x: number; y: number } => {
      const centerX = w / 2;
      const centerY = h / 2;
      const halfW = rectWidth / 2;
      const halfH = rectHeight / 2;

      const perimeter = 2 * (rectWidth + rectHeight);
      if (perimeter === 0) return { x: centerX, y: centerY };

      // Progress thresholds for each edge
      const topEdgeProgress = rectWidth / perimeter;
      const rightEdgeProgress = rectHeight / perimeter;
      const bottomEdgeProgress = rectWidth / perimeter;

      const p1 = topEdgeProgress;
      const p2 = p1 + rightEdgeProgress;
      const p3 = p2 + bottomEdgeProgress;

      progress = progress % 1;
      if (progress < 0) progress += 1;

      if (progress < p1) {
        // Top edge: left to right
        const edgeProgress = progress / p1;
        return {
          x: centerX - halfW + edgeProgress * rectWidth,
          y: centerY - halfH,
        };
      } else if (progress < p2) {
        // Right edge: top to bottom
        const edgeProgress = (progress - p1) / rightEdgeProgress;
        return {
          x: centerX + halfW,
          y: centerY - halfH + edgeProgress * rectHeight,
        };
      } else if (progress < p3) {
        // Bottom edge: right to left
        const edgeProgress = (progress - p2) / bottomEdgeProgress;
        return {
          x: centerX + halfW - edgeProgress * rectWidth,
          y: centerY + halfH,
        };
      } else {
        // Left edge: bottom to top
        const edgeProgress = (progress - p3) / (1 - p3);
        return {
          x: centerX - halfW,
          y: centerY + halfH - edgeProgress * rectHeight,
        };
      }
    };

    const getStartPosition = (): {
      x: number;
      y: number;
      edge: "top" | "right" | "bottom" | "left";
    } => {
      const { startPosition, startPositionBias } = config;

      if (typeof startPosition === "function") {
        const pos = startPosition(w, h);
        const distances = {
          top: pos.y,
          right: w - pos.x,
          bottom: h - pos.y,
          left: pos.x,
        };
        const edge = Object.entries(distances).reduce((a, b) =>
          distances[a[0] as keyof typeof distances] <
          distances[b[0] as keyof typeof distances]
            ? a
            : b,
        )[0] as "top" | "right" | "bottom" | "left";
        return { ...pos, edge };
      }

      let edge: "top" | "right" | "bottom" | "left";
      if (startPosition === "edges") {
        const edgeIndex = Math.floor(random(0, 4));
        edge = ["top", "right", "bottom", "left"][edgeIndex] as typeof edge;
      } else {
        edge = startPosition!;
      }

      let positionAlongEdge = random(0, 1);
      if (startPositionBias === "center") {
        positionAlongEdge = (random(0, 1) + random(0, 1)) / 2;
      } else if (startPositionBias === "corners") {
        positionAlongEdge =
          random(0, 1) < 0.5 ? random(0, 0.2) : random(0.8, 1);
      } else if (typeof startPositionBias === "function") {
        positionAlongEdge = startPositionBias(positionAlongEdge);
      }

      let x: number, y: number;
      switch (edge) {
        case "top":
          x = positionAlongEdge * w;
          y = 0;
          break;
        case "right":
          x = w;
          y = positionAlongEdge * h;
          break;
        case "bottom":
          x = positionAlongEdge * w;
          y = h;
          break;
        case "left":
          x = 0;
          y = positionAlongEdge * h;
          break;
      }
      return { x, y, edge };
    };

    const getStartVelocity = (
      edge: "top" | "right" | "bottom" | "left",
      x: number,
      y: number,
    ): { vx: number; vy: number } => {
      const { startVelocity } = config;
      if (typeof startVelocity === "function") {
        return startVelocity(edge, x, y, w, h);
      }
      if (typeof startVelocity === "number") {
        return { vx: Math.cos(startVelocity), vy: Math.sin(startVelocity) };
      }
      let vx: number, vy: number;
      if (startVelocity === "random") {
        const angle = random(0, Math.PI * 2);
        vx = Math.cos(angle);
        vy = Math.sin(angle);
      } else if (startVelocity === "outward") {
        const centerX = w / 2;
        const centerY = h / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        const mag = Math.sqrt(dx * dx + dy * dy);
        vx = mag > 0 ? dx / mag : 0;
        vy = mag > 0 ? dy / mag : 0;
      } else {
        switch (edge) {
          case "top":
            vx = random(-1, 1);
            vy = random(0.5, 1);
            break;
          case "right":
            vx = random(-1, -0.5);
            vy = random(-1, 1);
            break;
          case "bottom":
            vx = random(-1, 1);
            vy = random(-1, -0.5);
            break;
          case "left":
            vx = random(0.5, 1);
            vy = random(-1, 1);
            break;
        }
      }
      return { vx, vy };
    };

    const createLightning = () => {
      const createCount = Math.floor(
        random(config.minCreateCount, config.maxCreateCount),
      );

      for (let i = 0; i < createCount; i++) {
        if (config.perimeterMode === "rectangle") {
          const { width: rectWidth, height: rectHeight } =
            getRectangleDimensions();
          const progress = random(0, 1);
          const direction =
            config.perimeterBidirectional && random(0, 1) > 0.5 ? -1 : 1;
          const pos = getRectanglePerimeterPosition(
            progress,
            rectWidth,
            rectHeight,
          );

          lightning.push({
            x: pos.x,
            y: pos.y,
            vx: 0,
            vy: 0,
            path: [{ x: pos.x, y: pos.y }],
            pathLimit: random(config.minPathLength, config.maxPathLength),
            speed: random(config.minSpeed, config.maxSpeed),
            turniness: 0,
            lineWidth: random(config.minLineWidth, config.maxLineWidth),
            perimeterProgress: progress,
            perimeterDirection: direction,
          });
        } else {
          const { x, y, edge } = getStartPosition();
          const { vx, vy } = getStartVelocity(edge, x, y);

          lightning.push({
            x,
            y,
            vx,
            vy,
            path: [{ x, y }],
            pathLimit: random(config.minPathLength, config.maxPathLength),
            speed: random(config.minSpeed, config.maxSpeed),
            turniness: random(config.minTurniness, config.maxTurniness),
            lineWidth: random(config.minLineWidth, config.maxLineWidth),
          });
        }
      }
    };

    const updateLightning = () => {
      for (let i = lightning.length - 1; i >= 0; i--) {
        const light = lightning[i];

        if (
          config.perimeterMode === "rectangle" &&
          light.perimeterProgress !== undefined
        ) {
          const { width: rectWidth, height: rectHeight } =
            getRectangleDimensions();
          const perimeter = 2 * (rectWidth + rectHeight);

          if (perimeter === 0) {
            lightning.splice(i, 1);
            continue;
          }

          const progressDelta =
            (light.speed / perimeter) * light.perimeterDirection!;
          light.perimeterProgress =
            (light.perimeterProgress + progressDelta) % 1;
          if (light.perimeterProgress < 0) light.perimeterProgress += 1;

          const newPos = getRectanglePerimeterPosition(
            light.perimeterProgress,
            rectWidth,
            rectHeight,
          );

          const jitter = random(-2, 2);
          const progress = light.perimeterProgress;
          const topEdgeProgress = rectWidth / perimeter;
          const rightEdgeProgress = rectHeight / perimeter;
          const p1 = topEdgeProgress;
          const p2 = p1 + rightEdgeProgress;

          if (
            progress < p1 ||
            (progress >= p2 && progress < p2 + topEdgeProgress)
          ) {
            newPos.y += jitter; // Horizontal edge, jitter vertically
          } else {
            newPos.x += jitter; // Vertical edge, jitter horizontally
          }

          light.path.push(newPos);

          if (light.path.length > light.pathLimit) {
            trails.push({
              path: [...light.path],
              age: 0,
              lineWidth: light.lineWidth,
            });
            lightning.splice(i, 1);
          }
        } else {
          const lastSegment = light.path[light.path.length - 1];
          light.vx += random(-light.turniness, light.turniness);
          light.vy += random(-light.turniness, light.turniness);
          const magnitude = Math.sqrt(
            light.vx * light.vx + light.vy * light.vy,
          );
          if (magnitude > 0) {
            light.vx /= magnitude;
            light.vy /= magnitude;
          }
          const segmentLength = random(light.speed * 0.5, light.speed * 1.5);
          const jitterAmount = light.speed * 1.5;
          const nextX =
            lastSegment.x +
            light.vx * segmentLength +
            random(-jitterAmount, jitterAmount);
          const nextY =
            lastSegment.y +
            light.vy * segmentLength +
            random(-jitterAmount, jitterAmount);
          if (nextX < 0 || nextX > w || nextY < 0 || nextY > h) {
            trails.push({
              path: [...light.path],
              age: 0,
              lineWidth: light.lineWidth,
            });
            lightning.splice(i, 1);
            continue;
          }
          light.path.push({ x: nextX, y: nextY });
          if (light.path.length > light.pathLimit) {
            trails.push({
              path: [...light.path],
              age: 0,
              lineWidth: light.lineWidth,
            });
            lightning.splice(i, 1);
          }
        }
      }
    };

    const drawFrame = (deltaTime: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = trails.length - 1; i >= 0; i--) {
        trails[i].age += deltaTime;
        if (trails[i].age > trailDuration) {
          trails.splice(i, 1);
        }
      }
      ctx.shadowBlur = 0;
      const opacityBuckets = new Map<number, typeof trails>();
      for (const trail of trails) {
        const opacity = 1 - trail.age / trailDuration;
        const bucketKey = Math.floor(opacity * 10) / 10;
        if (!opacityBuckets.has(bucketKey)) {
          opacityBuckets.set(bucketKey, []);
        }
        opacityBuckets.get(bucketKey)?.push(trail);
      }
      for (const [opacity, trailBatch] of opacityBuckets) {
        ctx.strokeStyle = `rgba(220, 235, 255, ${opacity * 0.8})`;
        ctx.beginPath();
        for (const trail of trailBatch) {
          ctx.lineWidth = trail.lineWidth * opacity;
          ctx.moveTo(trail.path[0].x, trail.path[0].y);
          for (const segment of trail.path) {
            ctx.lineTo(segment.x, segment.y);
          }
          ctx.moveTo(
            trail.path[trail.path.length - 1].x,
            trail.path[trail.path.length - 1].y,
          );
        }
        ctx.lineJoin = "round";
        ctx.stroke();
      }
      ctx.shadowBlur = config.blur;
      ctx.shadowColor = config.blurColor;
      ctx.strokeStyle = config.strokeColor;
      ctx.beginPath();
      for (const light of lightning) {
        ctx.lineWidth = light.lineWidth;
        ctx.moveTo(light.path[0].x, light.path[0].y);
        for (const segment of light.path) {
          ctx.lineTo(segment.x, segment.y);
        }
        ctx.moveTo(
          light.path[light.path.length - 1].x,
          light.path[light.path.length - 1].y,
        );
      }
      ctx.lineJoin = "round";
      ctx.stroke();
    };

    const animate = (currentTime: number) => {
      animationFrameId.current = requestAnimationFrame(animate);
      let deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      if (deltaTime > 250) {
        deltaTime = 250;
      }
      accumulator += deltaTime;
      while (accumulator >= timestep) {
        lightTimeCurrent++;
        if (lightTimeCurrent >= lightTimeTotal) {
          createLightning();
          lightTimeCurrent = 0;
          lightTimeTotal = random(config.minDelay, config.maxDelay);
        }
        updateLightning();
        accumulator -= timestep;
      }
      drawFrame(deltaTime);
    };

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      lightning.length = 0;
      trails.length = 0;
      lastTime = performance.now();
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [canvasRef, options]);
};
