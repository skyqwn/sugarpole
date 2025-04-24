import React, { useRef } from 'react';

import Viewport from './components/dicom/Viewport';
import { useCornerstoneInitialization } from './hooks/useCornerstoneInitialization';
import { useDicomViewport } from './hooks/useDicomViewport';
import Header from './components/common/Header';

export default function App() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const isInitialized = useCornerstoneInitialization();
  const { isViewportSetup } = useDicomViewport(
    leftRef as React.RefObject<HTMLDivElement>,
    rightRef as React.RefObject<HTMLDivElement>
  );

  return (
    <div className="mx-auto h-screen w-[1440px]">
      {!isInitialized && !isViewportSetup && (
        <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black">
          Cornerstone 초기화 중...
        </div>
      )}
      <Header />
      <section className="flex h-[903px] w-full flex-1 gap-1 border-3 border-white">
        <Viewport ref={leftRef} id="LEFT_VIEWPORT" className="h-full w-1/2" />
        <Viewport ref={rightRef} id="RIGHT_VIEWPORT" className="h-full w-1/2" />
      </section>
    </div>
  );
}
