import { create } from "zustand";
import * as cornerstone from "@cornerstonejs/core";

import {
  ViewportId,
  ViewportState,
  RenderingEngineState,
} from "../types/dicom";

interface DicomViewerState {
  imageIds: string[];
  page: number;
  totalPages: number;

  selectedViewportId: ViewportId;
  viewportStates: Record<ViewportId, ViewportState>;

  renderingEngine: RenderingEngineState;
  toolGroupId: string;

  setImageIds: (imageIds: string[]) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  selectViewport: (id: ViewportId) => void;
  updateViewportState: (
    viewportId: ViewportId,
    updates: Partial<ViewportState>
  ) => void;
  setRenderingEngine: (engine: cornerstone.RenderingEngine) => void;
  setInitialized: (isInitialized: boolean) => void;
  setViewportSetup: (isViewportSetup: boolean) => void;
}

export const useDicomViewerStore = create<DicomViewerState>((set) => ({
  imageIds: [],
  page: 0,
  totalPages: 0,
  selectedViewportId: "LEFT_VIEWPORT",
  toolGroupId: "myToolGroup",
  viewportStates: {
    LEFT_VIEWPORT: {
      id: "LEFT_VIEWPORT",
      flipped: { horizontal: false, vertical: false },
      rotationAngle: 0,
      isInverted: false,
      zoomLevel: 1,
    },
    RIGHT_VIEWPORT: {
      id: "RIGHT_VIEWPORT",
      flipped: { horizontal: false, vertical: false },
      rotationAngle: 0,
      isInverted: false,
      zoomLevel: 1,
    },
  },
  renderingEngine: {
    engine: null,
    isInitialized: false,
    isViewportSetup: false,
  },

  setImageIds: (imageIds) =>
    set((state) => ({
      imageIds,
      totalPages: Math.ceil(imageIds.length / 2),
    })),

  setPage: (page) => set({ page }),

  nextPage: () =>
    set((state) => ({
      page: Math.min(state.page + 1, state.totalPages - 1),
    })),

  prevPage: () =>
    set((state) => ({
      page: Math.max(0, state.page - 1),
    })),

  selectViewport: (id) => set({ selectedViewportId: id }),

  updateViewportState: (viewportId, updates) =>
    set((state) => ({
      viewportStates: {
        ...state.viewportStates,
        [viewportId]: {
          ...state.viewportStates[viewportId],
          ...updates,
        },
      },
    })),

  setRenderingEngine: (engine) =>
    set((state) => {
      console.log("렌더링 엔진 설정:", engine?.id || "없음");
      return {
        renderingEngine: {
          ...state.renderingEngine,
          engine,
        },
      };
    }),

  setInitialized: (isInitialized) =>
    set((state) => {
      console.log("초기화 상태 설정:", isInitialized);
      return {
        renderingEngine: {
          ...state.renderingEngine,
          isInitialized,
        },
      };
    }),

  setViewportSetup: (isViewportSetup) =>
    set((state) => ({
      renderingEngine: {
        ...state.renderingEngine,
        isViewportSetup,
      },
    })),
}));
