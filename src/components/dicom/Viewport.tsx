import { forwardRef } from "react";
import { ViewportId } from "../../types/dicom";
import { useDicomViewerStore } from "../../store/dicomViewerStore";

interface ViewportProps {
  id: ViewportId;
  className?: string;
}

const Viewport = forwardRef<HTMLDivElement, ViewportProps>((props, ref) => {
  const { id, className = "" } = props;
  const { selectedViewportId, selectViewport } = useDicomViewerStore();

  const isSelected = id === selectedViewportId;

  const handleClick = () => {
    console.log(`${id} 뷰포트 클릭됨`);
    selectViewport(id);
  };

  return (
    <div
      ref={ref}
      className={`${className} ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      onClick={handleClick}
      data-viewport-id={id}
    ></div>
  );
});

Viewport.displayName = "Viewport";

export default Viewport;
