// src/features/projects/hooks/useLightningLinker.ts
import { useRef, useEffect, RefObject } from "react";
import { LightningBolt, LightningOptions } from "../types";
import { random } from "@/common/utils/math";

const DEFAULT_LINKER_OPTIONS: Partial<LightningOptions> = {
  minDelay: 50,
  maxDelay: 150,
  minPathLength: 100,
  maxPathLength: 200,
  minSpeed: 20,
  maxSpeed: 35,
  minTurniness: 0.3,
  maxTurniness: 0.8,
  minLineWidth: 1,
  maxLineWidth: 3,
  blur: 15,
  blurColor: "rgba(180, 200, 255, 0.4)",
  strokeColor: "rgba(220, 235, 255, 0.7)",
  trailLength: 25,
};

export interface LightningLink {
  startElementRef: RefObject<HTMLElement>;
  endElementRef: RefObject<HTMLElement>;
}

interface TrailSegment {
  path: { x: number; y: number }[];
  age: number;
  lineWidth: number;
}

/**
 * @hook useLightningLinker
 *
 * Renders guided lightning bolts between specified DOM elements on a single canvas.
 * It's designed to visually link sections of a page to encourage scrolling.
 *
 * @param canvasRef - Ref object for the canvas element.
 * @param links - An array of objects defining the start and end element refs for each link.
 * @param options - Optional configuration to override default lightning parameters.
 */
export const useLightningLinker = (
  canvasRef: RefObject<HTMLCanvasElement>,
  links: LightningLink[],
  options: Partial<LightningOptions> = {},
) => {
  const animationFrameId = useRef<number | null>(null);
  const visibilityRef = useRef<Map<RefObject<HTMLElement>, boolean>>(new Map());

  useEffect(() => {
    const config = { ...DEFAULT_LINKER_OPTIONS, ...options };
    const canvas = canvasRef.current;
    if (!canvas || !links.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w: number, h: number;
    const lightning: LightningBolt[] = [];
    const trails: TrailSegment[] = [];
    let cooldown = 0;
    let cooldownTotal = random(config.minDelay!, config.maxDelay!);

    let lastTime = performance.now();
    let accumulator = 0;
    const timestep = 1000 / 60;
    const trailDuration = config.trailLength! * timestep;

    const createLightning = () => {
      const availableLinks = links.filter(
        (link) =>
          visibilityRef.current.get(link.startElementRef) &&
          !visibilityRef.current.get(link.endElementRef),
      );

      if (availableLinks.length === 0) return;

      const link = availableLinks[Math.floor(random(0, availableLinks.length))];
      const startEl = link.startElementRef.current;
      const endEl = link.endElementRef.current;

      if (!startEl || !endEl) return;

      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();

      if (startRect.bottom < 0 || endRect.top < h) {
        return;
      }

      const startX = startRect.left + startRect.width / 2 + random(-50, 50);
      const startY = startRect.bottom;
      const endX = endRect.left + endRect.width / 2 + random(-50, 50);
      const endY = endRect.top;
      const dx = endX - startX;
      const dy = endY - startY;
      const mag = Math.sqrt(dx * dx + dy * dy);

      const minPath =
        typeof config.minPathLength === "function"
          ? config.minPathLength(w, h)
          : config.minPathLength!;
      const maxPath =
        typeof config.maxPathLength === "function"
          ? config.maxPathLength(w, h)
          : config.maxPathLength!;

      lightning.push({
        x: startX,
        y: startY,
        vx: mag > 0 ? dx / mag : 0,
        vy: mag > 0 ? dy / mag : 1,
        path: [{ x: startX, y: startY }],
        pathLimit: random(minPath, maxPath),
        speed: random(config.minSpeed!, config.maxSpeed!),
        turniness: random(config.minTurniness!, config.maxTurniness!),
        lineWidth: random(config.minLineWidth!, config.maxLineWidth!),
      });
    };

    const updateLightning = () => {
      for (let i = lightning.length - 1; i >= 0; i--) {
        const light = lightning[i];
        const lastSegment = light.path[light.path.length - 1];

        light.vx += random(-light.turniness, light.turniness);
        light.vy += random(-light.turniness, light.turniness);

        const magnitude = Math.sqrt(light.vx * light.vx + light.vy * light.vy);
        if (magnitude > 0) {
          light.vx /= magnitude;
          light.vy /= magnitude;
        }

        const segmentLength = random(light.speed * 0.5, light.speed * 1.5);
        const nextX = lastSegment.x + light.vx * segmentLength;
        const nextY = lastSegment.y + light.vy * segmentLength;

        if (
          nextX < -w ||
          nextX > w * 2 ||
          nextY < -h ||
          nextY > h * 2 ||
          light.path.length > light.pathLimit
        ) {
          trails.push({
            path: [...light.path],
            age: 0,
            lineWidth: light.lineWidth,
          });
          lightning.splice(i, 1);
          continue;
        }

        light.path.push({ x: nextX, y: nextY });
      }
    };

    const drawFrame = (deltaTime: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineJoin = "round";

      for (let i = trails.length - 1; i >= 0; i--) {
        trails[i].age += deltaTime;
        if (trails[i].age > trailDuration) {
          trails.splice(i, 1);
        }
      }

      if (trails.length > 0) {
        ctx.beginPath();
        for (const trail of trails) {
          const opacity = 1 - trail.age / trailDuration;
          ctx.strokeStyle = `rgba(220, 235, 255, ${opacity * 0.7})`;
          ctx.lineWidth = trail.lineWidth * opacity;
          ctx.moveTo(trail.path[0].x, trail.path[0].y);
          for (let j = 1; j < trail.path.length; j++) {
            ctx.lineTo(trail.path[j].x, trail.path[j].y);
          }
        }
        ctx.stroke();
      }

      ctx.shadowBlur = config.blur!;
      ctx.shadowColor = config.blurColor!;
      ctx.strokeStyle = config.strokeColor!;
      if (lightning.length > 0) {
        ctx.beginPath();
        for (const light of lightning) {
          ctx.lineWidth = light.lineWidth;
          ctx.moveTo(light.path[0].x, light.path[0].y);
          for (let j = 1; j < light.path.length; j++) {
            ctx.lineTo(light.path[j].x, light.path[j].y);
          }
        }
        ctx.stroke();
      }
    };

    const animate = (currentTime: number) => {
      animationFrameId.current = requestAnimationFrame(animate);
      let deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      if (deltaTime > 250) deltaTime = 250;

      accumulator += deltaTime;
      while (accumulator >= timestep) {
        cooldown++;
        if (cooldown >= cooldownTotal) {
          createLightning();
          cooldown = 0;
          cooldownTotal = random(config.minDelay!, config.maxDelay!);
        }
        updateLightning();
        accumulator -= timestep;
      }
      drawFrame(deltaTime);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      lightning.length = 0;
      trails.length = 0;
      lastTime = performance.now();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ref = links
            .flatMap((l) => [l.startElementRef, l.endElementRef])
            .find((r) => r.current === entry.target);
          if (ref) {
            visibilityRef.current.set(ref, entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 },
    );

    const allElements = new Set(
      links.flatMap((l) => [l.startElementRef, l.endElementRef]),
    );
    allElements.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
        visibilityRef.current.set(ref, false);
      }
    });

    window.addEventListener("resize", handleResize);
    handleResize();
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [canvasRef, links, options]);
};
