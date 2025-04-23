import { useEffect } from "react";
import * as cornerstone from "@cornerstonejs/core";
import * as cornerstoneTools from "@cornerstonejs/tools";
import dicomParser from "dicom-parser";
//@ts-ignore
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import { useDicomViewerStore } from "../store/dicomViewerStore";

export const useCornerstoneInitialization = () => {
  const { setInitialized, setImageIds, toolGroupId, renderingEngine } =
    useDicomViewerStore();

  useEffect(() => {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    const dicomFilePaths = [
      "dicom/CT01.dcm",
      "dicom/CT02.dcm",
      "dicom/CT03.dcm",
      "dicom/CT04.dcm",
      "dicom/CT05.dcm",
      "dicom/CT06.dcm",
      "dicom/CT07.dcm",
      "dicom/CT08.dcm",
    ];
    const wadoImageIds = dicomFilePaths.map((path) => `wadouri:${path}`);
    setImageIds(wadoImageIds);
  }, [setImageIds]);

  useEffect(() => {
    async function init() {
      await cornerstone.init();
      cornerstoneTools.init();

      [
        cornerstoneTools.PanTool,
        cornerstoneTools.ZoomTool,
        cornerstoneTools.WindowLevelTool,
        cornerstoneTools.StackScrollMouseWheelTool,
      ].forEach((T) => {
        cornerstoneTools.addTool(T);
      });

      setInitialized(true);
      console.log("Cornerstone 초기화 완료");
    }

    init();

    return () => {
      if (renderingEngine.engine) {
        renderingEngine.engine.destroy();
      }
      try {
        cornerstoneTools.ToolGroupManager.destroyToolGroup(toolGroupId);
      } catch (e) {
        console.log("Error destroying tool group:", e);
      }
    };
  }, [setInitialized, toolGroupId, renderingEngine.engine]);

  return renderingEngine.isInitialized;
};
