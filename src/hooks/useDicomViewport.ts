import { RefObject } from "react";
import { useDicomViewerStore } from "../store/dicomViewerStore";
import { useViewportSetup } from "./useViewportSetup";
import { useImageUpdater } from "./useImageUpdater";

export const useDicomViewport = (
  leftRef: RefObject<HTMLDivElement>,
  rightRef: RefObject<HTMLDivElement>
) => {
  const isViewportSetup = useViewportSetup(leftRef, rightRef);

  useImageUpdater();

  const { renderingEngine } = useDicomViewerStore();

  return {
    isViewportSetup: renderingEngine.isViewportSetup,
  };
};
