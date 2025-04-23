import React, { useCallback } from "react";
import { useViewportActions } from "../../hooks/useViewportActions";
import { useDicomViewerStore } from "../../store/dicomViewerStore";
import { ViewportActionType } from "../../types/dicom";

interface ActionItemProps {
  name: keyof ViewportActionType;
  label: string;
  onClick: (name: keyof ViewportActionType) => void;
}

const ActionItem: React.FC<ActionItemProps> = ({ name, label, onClick }) => {
  return (
    <li
      className="cursor-pointer text-CoolGray-90 font-medium py-3 px2"
      onClick={() => onClick(name)}
    >
      {label}
    </li>
  );
};

const Toolbar = () => {
  const actions = useViewportActions();
  const { selectedViewportId, renderingEngine } = useDicomViewerStore();

  const handleAction = useCallback(
    (actionName: keyof ViewportActionType) => {
      if (!renderingEngine.isViewportSetup || !renderingEngine.engine) {
        console.log("렌더링 엔진이 준비되지 않아 액션을 실행할 수 없습니다.");
        return;
      }

      console.log(
        `${actionName} 액션 실행, 선택된 뷰포트: ${selectedViewportId}`
      );
      const action = actions[actionName];
      if (action && typeof action === "function") {
        action();
      }
    },
    [actions, selectedViewportId, renderingEngine]
  );

  // 툴바 항목 정의
  const actionItems = [
    { name: "zoomIn", label: "Zoom" },
    { name: "flipH", label: "Flip H" },
    { name: "flipV", label: "Flip V" },
    { name: "rotate", label: "Rotate Delta 30" },
    { name: "invert", label: "Invert" },
    { name: "colormap", label: "Apply Colormap" },
    { name: "reset", label: "Reset" },
  ] as const;

  if (!renderingEngine.isViewportSetup || !renderingEngine.engine) {
    return (
      <ul className="flex gap-4 w-[649px] text-base justify-between  opacity-50">
        {actionItems.map((item) => (
          <li
            key={item.name}
            className="cursor-not-allowed py-3 px-2 text-[#21272A]"
          >
            {item.label}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex gap-4 w-[649px] justify-around">
      {actionItems.map((item) => (
        <ActionItem
          key={item.name}
          name={item.name}
          label={item.label}
          onClick={handleAction}
        />
      ))}
    </ul>
  );
};

export default Toolbar;
