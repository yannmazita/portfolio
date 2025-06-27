// src/features/projects/types.ts

/**
 * Defines where lightning bolts can start
 * - 'edges': Random edge (default behavior)
 * - 'top' | 'right' | 'bottom' | 'left': Specific edge
 * - Custom function returning {x, y} coordinates
 */
export type StartPosition =
  | "edges"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | ((canvasWidth: number, canvasHeight: number) => { x: number; y: number });

/**
 * Controls position distribution along edges
 * - 'uniform': Even distribution (default)
 * - 'center': Bias toward center of edge
 * - 'corners': Bias toward corners
 * - Custom function returning 0-1 value for position along edge
 */
export type PositionBias =
  | "uniform"
  | "center"
  | "corners"
  | ((random: number) => number);

/**
 * Defines initial velocity vectors
 * - 'inward': Points toward canvas interior (default)
 * - 'outward': Points away from canvas
 * - 'random': Random direction
 * - number: Fixed angle in radians
 * - Custom function returning {vx, vy} normalized vector
 */
export type StartVelocity =
  | "inward"
  | "outward"
  | "random"
  | number
  | ((
      edge: "top" | "right" | "bottom" | "left",
      x: number,
      y: number,
      canvasWidth: number,
      canvasHeight: number,
    ) => { vx: number; vy: number });

/*
 * Defines perimeter shapes that bolts can follow
 * - 'none': Standard free-form lightning (default)
 * - 'rectangle': Bolts follow a rectangular perimeter
 * - 'circle': Bolts follow a circular perimeter
 */
export type PerimeterMode = "none" | "rectangle" | "circle";

/**
 * Represents the state and properties of a single lightning bolt instance.
 */
export interface LightningBolt {
  /** The starting horizontal coordinate. */
  x: number;

  /** The starting vertical coordinate. */
  y: number;

  /** The horizontal velocity vector, defining the bolt's general direction. */
  vx: number;

  /** The vertical velocity vector, defining the bolt's general direction. */
  vy: number;

  /** An array of {x, y} coordinates that form the segments of the bolt. */
  path: { x: number; y: number }[];

  /** The maximum number of segments the bolt can have before it is removed. */
  pathLimit: number;

  /** The base speed, influencing the length of each new segment. */
  speed: number;

  /** A factor determining how much the bolt's direction can change per frame. */
  turniness: number;

  /** The pixel width of the rendered bolt line. */
  lineWidth: number;

  /** Optional 0–1 progress value indicating position along perimeter path. */
  perimeterProgress?: number;

  /** Optional direction of movement around the perimeter: clockwise (1) or counter-clockwise (-1). */
  perimeterDirection?: 1 | -1;
}

/**
 * Configuration options for customizing the lightning effect.
 */
export interface LightningOptions {
  // Timing

  /** The minimum number of physics ticks (at 60 ticks/sec) before a new lightning storm can be created. */
  minDelay: number;

  /** The maximum number of physics ticks (at 60 ticks/sec) before a new lightning storm can be created. */
  maxDelay: number;

  // Bolt creation

  /** The minimum number of individual bolts to create in a single storm. */
  minCreateCount: number;

  /** The maximum number of individual bolts to create in a single storm. */
  maxCreateCount: number;

  // Bolt physics

  /**
   * The minimum number of segments a bolt can have.
   * Can be a number or a function that returns a number based on canvas dimensions.
   */
  minPathLength:
    | number
    | ((canvasWidth: number, canvasHeight: number) => number);

  /**
   * The maximum number of segments a bolt can have.
   * Can be a number or a function that returns a number based on canvas dimensions.
   */
  maxPathLength:
    | number
    | ((canvasWidth: number, canvasHeight: number) => number);

  /** The minimum base speed/length for each bolt segment per tick. */
  minSpeed: number;

  /** The maximum base speed/length for each bolt segment per tick. */
  maxSpeed: number;

  /** The minimum factor for how much a bolt can change direction per tick. */
  minTurniness: number;

  /** The maximum factor for how much a bolt can change direction per tick. */
  maxTurniness: number;

  // Aesthetics

  /** The minimum pixel width of the rendered bolt line. */
  minLineWidth: number;

  /** The maximum pixel width of the rendered bolt line. */
  maxLineWidth: number;

  /** The size of the glow/blur effect around the lightning. */
  blur: number;

  /** The color of the glow/blur effect. */
  blurColor: string;

  /** The primary color of the lightning bolt itself. */
  strokeColor: string;

  /** The number of physics ticks (at 60 ticks/sec) that a trail will last, determining its fade-out duration. */
  trailLength: number;

  // Starting position and velocity

  /**
   * Defines where new lightning bolts originate.
   * Can be a predefined string ('edges', 'top', etc.) or a custom function.
   */
  startPosition?: StartPosition;

  /**
   * When using an edge-based `startPosition`, controls the distribution of bolts along that edge.
   */
  startPositionBias?: PositionBias;

  /**
   * Defines initial direction vector for new lightning bolts.
   * Can be a predefined string, a fixed angle (in radians), or a custom function.
   * The vector will be normalized internally.
   */
  startVelocity?: StartVelocity;

  // Perimeter behavior

  /** Defines the perimeter shape that bolts can follow. */
  perimeterMode?: PerimeterMode;

  /**
   * Defines the size of the perimeter.
   * - number: A multiplier for the smaller canvas dimension to create a square. (e.g., 0.6 for 60%)
   * - function: A function returning {width, height} in pixels for a custom rectangle.
   */
  perimeterSize?:
    | number
    | ((
        canvasWidth: number,
        canvasHeight: number,
      ) => {
        width: number;
        height: number;
      });

  /**
   * Enforces a specific aspect ratio (width / height) for the rectangular perimeter.
   * Requires `perimeterMode` to be 'rectangle' and `perimeterSize` to be a number.
   */
  perimeterAspectRatio?: number;

  /** Whether bolts can travel in both clockwise and counter-clockwise directions around the perimeter. */
  perimeterBidirectional?: boolean;
}
