import { useEffect } from "react";
import { StackViewport } from "@cornerstonejs/core";

import { useDicomViewerStore } from "../store/dicomViewerStore";
import { ViewportId } from "../types/dicom";

export const useImageUpdater = () => {
  const { imageIds, page, renderingEngine, updateViewportState } =
    useDicomViewerStore();

  useEffect(() => {
    if (
      !renderingEngine.isInitialized ||
      !renderingEngine.isViewportSetup ||
      !renderingEngine.engine
    ) {
      return;
    }

    console.log("페이지 변경 감지됨:", page, "이미지 업데이트 시작...");

    ["LEFT_VIEWPORT", "RIGHT_VIEWPORT"].forEach((viewportId) => {
      updateViewportState(viewportId as ViewportId, {
        flipped: {
          horizontal: false,
          vertical: false,
        },
        rotationAngle: 0,
        isInverted: false,
        zoomLevel: 1,
        colormap: undefined,
      });

      console.log(`${viewportId} 모든 상태 초기화됨`);
    });

    const applyDefaultState = (viewport: StackViewport) => {
      try {
        viewport.setProperties({
          rotation: 0,
          invert: false,
        });

        viewport.setZoom(1);

        viewport.resetCamera();

        const element = viewport.element;
        const canvas = element.querySelector("canvas");
        if (canvas) {
          canvas.style.transform = "";
        }

        return true;
      } catch (e) {
        console.error("뷰포트 상태 초기화 실패:", e);
        return false;
      }
    };

    const updateViewportImage = async (
      viewportId: ViewportId,
      imageIndex: number
    ) => {
      if (imageIndex >= imageIds.length || !renderingEngine.engine) return;

      try {
        const viewport = renderingEngine.engine.getViewport(
          viewportId
        ) as StackViewport;
        console.log(`${viewportId}에 이미지 로드: ${imageIds[imageIndex]}`);

        applyDefaultState(viewport);

        await viewport.setStack([imageIds[imageIndex]], 0);

        viewport.render();

        console.log(`${viewportId} 이미지 업데이트 완료 (모든 상태 초기화됨)`);
      } catch (e) {
        console.error(`${viewportId} 이미지 업데이트 실패:`, e);
      }
    };

    const updateImages = async () => {
      await updateViewportImage("LEFT_VIEWPORT", page * 2);
      await updateViewportImage("RIGHT_VIEWPORT", page * 2 + 1);
    };

    updateImages();
  }, [page, renderingEngine.isViewportSetup, renderingEngine.engine, imageIds]);

  return null;
};
