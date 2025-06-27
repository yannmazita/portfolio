// src/features/projects/components/DynamicProjectSelectBackdropSVG.tsx
import { cn } from "@/common/shadcn/lib/utils";

interface DynamicProjectSelectBackdropSVGProps {
  className?: string;
  width: number;
  height: number;
}

export const DynamicProjectSelectBackdropSVG: React.FC<
  DynamicProjectSelectBackdropSVGProps
> = ({ className, width, height }) => {
  // Define geometric constants based on the original design's proportions
  const bottomBarHeight = 50;
  const curveAreaWidth = width * 0.1875; // e.g., 150 on an 800-wide canvas
  const curveHeight = height - bottomBarHeight;

  // Calculate control points for the quadratic bezier curves
  const leftCurveControlX = curveAreaWidth / 2;
  const rightCurveStartX = width - curveAreaWidth;
  const rightCurveControlX = width - curveAreaWidth / 2;
  const curveControlY = height / 2; // Control point is always at half the total height

  // Generate path data strings dynamically
  const leftPathD = `M 0 0 L ${curveAreaWidth} 0 Q ${leftCurveControlX} ${curveControlY} ${curveAreaWidth} ${curveHeight} L 0 ${curveHeight} Z`;
  const rightPathD = `M ${rightCurveStartX} 0 L ${width} 0 L ${width} ${curveHeight} L ${rightCurveStartX} ${curveHeight} Q ${rightCurveControlX} ${curveControlY} ${rightCurveStartX} 0 Z`;

  const leftCurveStrokeD = `M ${curveAreaWidth} 0 Q ${leftCurveControlX} ${curveControlY} ${curveAreaWidth} ${curveHeight}`;
  const rightCurveStrokeD = `M ${rightCurveStartX} 0 Q ${rightCurveControlX} ${curveControlY} ${rightCurveStartX} ${curveHeight}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      // This ensures the SVG scales correctly without distortion within its container
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="backdropGradientLeft"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#d0d0d0" />
          <stop offset="100%" stopColor="#666666" />
        </linearGradient>
        <linearGradient
          id="backdropGradientRight"
          x1="100%"
          y1="0%"
          x2="0%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#d0d0d0" />
          <stop offset="100%" stopColor="#666666" />
        </linearGradient>
        <linearGradient
          id="backdropGradientBottom"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#666666" />
          <stop offset="100%" stopColor="#d0d0d0" />
        </linearGradient>
      </defs>

      {/* Shapes */}
      <path d={leftPathD} fill="url(#backdropGradientLeft)" />
      <path d={rightPathD} fill="url(#backdropGradientRight)" />
      <rect
        x={0}
        y={curveHeight}
        width={width}
        height={bottomBarHeight}
        fill="url(#backdropGradientBottom)"
      />

      {/* Strokes and Highlights */}
      <path
        d={leftCurveStrokeD}
        fill="none"
        stroke="#ffffff"
        strokeWidth={1}
        opacity={0.7}
      />
      <path
        d={rightCurveStrokeD}
        fill="none"
        stroke="#ffffff"
        strokeWidth={1}
        opacity={0.7}
      />
      <path
        d={`M ${curveAreaWidth + 1} 0 Q ${leftCurveControlX + 1} ${curveControlY} ${
          curveAreaWidth + 1
        } ${curveHeight}`}
        fill="none"
        stroke="#666666"
        strokeWidth={1}
        opacity={0.5}
      />
      <path
        d={`M ${rightCurveStartX - 1} 0 Q ${rightCurveControlX - 1} ${curveControlY} ${
          rightCurveStartX - 1
        } ${curveHeight}`}
        fill="none"
        stroke="#666666"
        strokeWidth={1}
        opacity={0.5}
      />

      {/* Lines */}
      <line
        x1={0}
        y1={curveHeight - 1}
        x2={width}
        y2={curveHeight - 1}
        stroke="#ffffff"
        strokeWidth={1}
      />
      <line
        x1={0}
        y1={curveHeight + 1}
        x2={width}
        y2={curveHeight + 1}
        stroke="#666666"
        strokeWidth={1}
      />
      <line
        x1={0}
        y1={height - 1}
        x2={width}
        y2={height - 1}
        stroke="#e8e8e8"
        strokeWidth={1}
        opacity={0.6}
      />
    </svg>
  );
};
