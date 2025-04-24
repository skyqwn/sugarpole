import * as cornerstone from "@cornerstonejs/core";

export interface ViewportState {
  id: string;
  flipped: {
    horizontal: boolean;
    vertical: boolean;
  };
  rotationAngle: number;
  isInverted: boolean;
  zoomLevel: number;
  colormap?: string;
}

export type ViewportId = "LEFT_VIEWPORT" | "RIGHT_VIEWPORT";

export interface RenderingEngineState {
  engine: cornerstone.RenderingEngine | null;
  isInitialized: boolean;
  isViewportSetup: boolean;
}

export interface ViewportActionType {
  flipH: () => void;
  flipV: () => void;
  rotate: () => void;
  invert: () => void;
  zoomIn: () => void;
  colormap: () => void;
  reset: () => void;
}
