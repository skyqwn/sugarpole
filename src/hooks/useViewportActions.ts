import { useMemo } from "react";
import { StackViewport } from "@cornerstonejs/core";
import { useDicomViewerStore } from "../store/dicomViewerStore";
import { ViewportActionType } from "../types/dicom";

export const useViewportActions = (): ViewportActionType => {
  const { selectedViewportId, viewportStates, updateViewportState } =
    useDicomViewerStore();

  const currentState = viewportStates[selectedViewportId];

  const getViewport = (): StackViewport | null => {
    const currentState = useDicomViewerStore.getState();
    const engine = currentState.renderingEngine.engine;
    const isSetup = currentState.renderingEngine.isViewportSetup;

    if (!isSetup || !engine) {
      return null;
    }

    try {
      console.log(`${selectedViewportId} 뷰포트 가져오기 시도`);
      const viewport = engine.getViewport(selectedViewportId) as StackViewport;
      console.log("뷰포트 가져오기 성공");
      return viewport;
    } catch (e) {
      console.log(`${selectedViewportId} 뷰포트를 찾을 수 없습니다:`, e);
      return null;
    }
  };

  const actions = useMemo(
    () => ({
      flipH: () => {
        const viewport = getViewport();
        if (!viewport) return;

        const newFlipH = !currentState.flipped.horizontal;
        updateViewportState(selectedViewportId, {
          flipped: {
            ...currentState.flipped,
            horizontal: newFlipH,
          },
        });

        const element = viewport.element;
        const canvas = element.querySelector("canvas");

        if (canvas) {
          const flipH = newFlipH ? "scaleX(-1)" : "";
          const flipV = currentState.flipped.vertical ? "scaleY(-1)" : "";
          const transformValue = [flipH, flipV].filter(Boolean).join(" ");
          canvas.style.transform = transformValue;

          if (!currentState.colormap) {
            const props = viewport.getProperties();
            if ("colormap" in props) {
              delete props.colormap;
              viewport.setProperties(props);
            }
          }
          viewport.render();
        }
      },

      flipV: () => {
        const viewport = getViewport();
        if (!viewport) return;

        const newFlipV = !currentState.flipped.vertical;
        updateViewportState(selectedViewportId, {
          flipped: {
            ...currentState.flipped,
            vertical: newFlipV,
          },
        });

        const element = viewport.element;
        const canvas = element.querySelector("canvas");

        if (canvas) {
          const flipH = currentState.flipped.horizontal ? "scaleX(-1)" : "";
          const flipV = newFlipV ? "scaleY(-1)" : "";
          const transformValue = [flipH, flipV].filter(Boolean).join(" ");
          canvas.style.transform = transformValue;
          viewport.render();
        }
      },

      rotate: () => {
        const viewport = getViewport();
        if (!viewport) return;

        const newAngle = (currentState.rotationAngle + 30) % 360;

        updateViewportState(selectedViewportId, {
          rotationAngle: newAngle,
        });

        const props = viewport.getProperties();
        if (!currentState.colormap && "colormap" in props) {
          delete props.colormap;
          console.log("회전 중 불필요한 colormap 속성 제거");
        }

        viewport.setProperties({
          rotation: newAngle,
          invert: currentState.isInverted,
        });

        viewport.render();
      },

      invert: () => {
        const viewport = getViewport();
        if (!viewport) return;

        const newInvert = !currentState.isInverted;
        updateViewportState(selectedViewportId, {
          isInverted: newInvert,
        });

        const props = viewport.getProperties();
        if (!currentState.colormap && "colormap" in props) {
          delete props.colormap;
          console.log("invert 중 불필요한 colormap 속성 제거");
        }

        viewport.setProperties({
          ...viewport.getProperties(),
          invert: newInvert,
        });
        viewport.render();
      },

      zoomIn: () => {
        const viewport = getViewport();
        if (!viewport) return;

        const zoomIn = Math.min(currentState.zoomLevel * 1.2, 5);
        updateViewportState(selectedViewportId, {
          zoomLevel: zoomIn,
        });

        viewport.setZoom(zoomIn);
        viewport.render();
      },

      colormap: () => {
        const viewport = getViewport();
        if (!viewport) return;

        console.log(viewport.getProperties());

        updateViewportState(selectedViewportId, {
          colormap: "jet",
        });

        try {
          viewport.setProperties({
            ...viewport.getProperties(),
            colormap: { name: "jet" },
          });
          viewport.render();
        } catch (e) {
          console.error("Failed to apply colormap:", e);
        }
      },

      reset: () => {
        const viewport = getViewport();
        if (!viewport) return;

        updateViewportState(selectedViewportId, {
          flipped: { horizontal: false, vertical: false },
          rotationAngle: 0,
          isInverted: false,
          zoomLevel: 1,
          colormap: undefined,
        });

        const element = viewport.element;
        const canvas = element.querySelector("canvas");
        if (canvas) {
          canvas.style.transform = "";
        }

        try {
          const props = viewport.getProperties();
          if ("colormap" in props) {
            delete props.colormap;
            viewport.setProperties({
              ...props,
              rotation: 0,
              invert: false,
            });
          } else {
            viewport.setProperties({
              ...props,
              rotation: 0,
              invert: false,
            });
          }

          viewport.resetCamera();
          viewport.setZoom(1);

          (async () => {
            try {
              const imageIds = viewport.getImageIds();
              const currentIndex = viewport.getCurrentImageIdIndex();

              if (imageIds && imageIds.length > 0) {
                const currentImageId = imageIds[currentIndex];
                await viewport.setStack([currentImageId], 0);
                viewport.render();

                console.log("이미지 재로드 완료");
              }
            } catch (e) {
              console.error("이미지 재로드 중 오류:", e);
            }
          })();
        } catch (e) {
          console.error("뷰포트 리셋 중 오류:", e);
        }
      },
    }),
    [selectedViewportId, currentState, updateViewportState]
  );

  return actions;
};
