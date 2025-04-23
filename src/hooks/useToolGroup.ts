import * as cornerstoneTools from "@cornerstonejs/tools";
import { RenderingEngine } from "@cornerstonejs/core";
import { useDicomViewerStore } from "../store/dicomViewerStore";
import { ViewportId } from "../types/dicom";

export const useToolGroup = (renderingEngineId: string) => {
  const { toolGroupId } = useDicomViewerStore();

  const setupToolGroup = async (
    engine: RenderingEngine,
    viewportIds: ViewportId[]
  ) => {
    const { PanTool, ZoomTool, WindowLevelTool, StackScrollMouseWheelTool } =
      cornerstoneTools;

    try {
      const existingToolGroup =
        cornerstoneTools.ToolGroupManager.getToolGroup(toolGroupId);
      if (existingToolGroup) {
        cornerstoneTools.ToolGroupManager.destroyToolGroup(toolGroupId);
      }
    } catch (e) {
      console.log("기존 도구 그룹이 없음");
    }

    const toolGroup =
      cornerstoneTools.ToolGroupManager.createToolGroup(toolGroupId);

    if (toolGroup) {
      viewportIds.forEach((viewportId) => {
        toolGroup.addViewport(viewportId, renderingEngineId);
      });

      [
        { tool: WindowLevelTool, mouseButton: 1 },
        { tool: PanTool, mouseButton: 2 },
        { tool: ZoomTool, mouseButton: 3 },
        { tool: StackScrollMouseWheelTool, mouseWheel: true },
      ].forEach(({ tool, mouseButton, mouseWheel }) => {
        toolGroup.addTool(tool.toolName);

        if (mouseWheel) {
          toolGroup.setToolActive(tool.toolName);
        } else {
          toolGroup.setToolActive(tool.toolName, {
            bindings: [{ mouseButton }],
          });
        }
      });

      console.log("도구 그룹 설정 완료:", toolGroupId);
      return true;
    }

    return false;
  };

  const cleanupToolGroup = () => {
    try {
      cornerstoneTools.ToolGroupManager.destroyToolGroup(toolGroupId);
    } catch (e) {
      console.log("도구 그룹 정리 중 오류:", e);
    }
  };

  return {
    setupToolGroup,
    cleanupToolGroup,
  };
};
