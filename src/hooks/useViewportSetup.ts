import { useEffect, RefObject } from "react";
import * as cornerstone from "@cornerstonejs/core";
import { StackViewport } from "@cornerstonejs/core";
import { useDicomViewerStore } from "../store/dicomViewerStore";
import { useToolGroup } from "./useToolGroup";

let isSettingUpViewports = false;

export const useViewportSetup = (
  leftRef: RefObject<HTMLDivElement>,
  rightRef: RefObject<HTMLDivElement>
) => {
  const {
    imageIds,
    page,
    renderingEngine,
    setRenderingEngine,
    setViewportSetup,
    selectViewport,
  } = useDicomViewerStore();

  const renderingEngineId = "myRenderingEngine";
  const { setupToolGroup } = useToolGroup(renderingEngineId);

  useEffect(() => {
    const leftElement = leftRef.current;
    const rightElement = rightRef.current;

    if (
      !renderingEngine.isInitialized ||
      !leftElement ||
      !rightElement ||
      !imageIds.length ||
      renderingEngine.isViewportSetup ||
      isSettingUpViewports
    )
      return;

    // 중복 설정 방지
    isSettingUpViewports = true;

    async function setupViewports() {
      try {
        console.log("뷰포트 설정 시작...");

        if (renderingEngine.engine) {
          console.log("기존 렌더링 엔진 제거");
          renderingEngine.engine.destroy();
        }

        const newRenderingEngine = new cornerstone.RenderingEngine(
          renderingEngineId
        );
        console.log("새 렌더링 엔진 생성됨:", renderingEngineId);

        const viewportOptions = [
          {
            id: "LEFT_VIEWPORT",
            element: leftElement,
          },
          {
            id: "RIGHT_VIEWPORT",
            element: rightElement,
          },
        ];

        viewportOptions.forEach((option) => {
          const viewportInput = {
            viewportId: option.id,
            element: option.element as HTMLDivElement,
            type: cornerstone.Enums.ViewportType.STACK,
            defaultOptions: {
              background: [0, 0, 0] as [number, number, number],
              fillStyle: "transparent",
              fitToWindow: true,
            },
          };

          newRenderingEngine.enableElement(viewportInput);
        });

        // 렌더링 엔진 상태 업데이트
        setRenderingEngine(newRenderingEngine);

        // 각 뷰포트에 이미지 로드
        await Promise.all(
          viewportOptions.map(async (option, index) => {
            const imageIndex = page * 2 + index;
            if (imageIndex < imageIds.length) {
              try {
                const viewport = newRenderingEngine.getViewport(
                  option.id
                ) as StackViewport;
                console.log(
                  `${option.id}에 이미지 로드:`,
                  imageIds[imageIndex]
                );
                await viewport.setStack([imageIds[imageIndex]], 0);
                viewport.render();
              } catch (e) {
                console.error(`${option.id} 이미지 로드 실패:`, e);
              }
            }
          })
        );

        // 도구 그룹 설정
        await setupToolGroup(newRenderingEngine, [
          "LEFT_VIEWPORT",
          "RIGHT_VIEWPORT",
        ]);

        // 뷰포트 설정 완료
        setViewportSetup(true);
        console.log("뷰포트 설정 완료");

        // 초기 뷰포트 선택
        setTimeout(() => {
          selectViewport("LEFT_VIEWPORT");
          console.log("LEFT_VIEWPORT 명시적 선택 완료");
        }, 100);
      } catch (error) {
        console.error("뷰포트 설정 중 오류:", error);
      } finally {
        isSettingUpViewports = false;
      }
    }

    setupViewports();

    // 클린업
    return () => {
      if (renderingEngine.engine) {
        try {
          renderingEngine.engine.destroy();
        } catch (e) {
          console.error("렌더링 엔진 정리 중 오류:", e);
        }
      }
    };
  }, [
    renderingEngine.isInitialized,
    imageIds.length,
    renderingEngine.isViewportSetup,
    page,
  ]);

  return renderingEngine.isViewportSetup;
};
