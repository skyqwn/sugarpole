import React, { useRef } from "react";

import Viewport from "./components/dicom/Viewport";
import { useCornerstoneInitialization } from "./hooks/useCornerstoneInitialization";
import { useDicomViewport } from "./hooks/useDicomViewport";
import Header from "./components/common/Header";

export default function App() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const isInitialized = useCornerstoneInitialization();
  const { isViewportSetup } = useDicomViewport(
    leftRef as React.RefObject<HTMLDivElement>,
    rightRef as React.RefObject<HTMLDivElement>
  );

  return (
    <div className="w-[1440px] h-screen mx-auto">
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          Cornerstone 초기화 중...
        </div>
      )}
      <Header />
      <section className="w-full flex border-3 border-white flex-1 h-[903px] gap-1">
        <Viewport ref={leftRef} id="LEFT_VIEWPORT" className="w-1/2 h-full" />
        <Viewport
          ref={rightRef}
          id="RIGHT_VIEWPORT"
          className="w-1/2 h-full "
        />
      </section>
    </div>
  );
}
