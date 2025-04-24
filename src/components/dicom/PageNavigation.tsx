import { useDicomViewerStore } from "../../store/dicomViewerStore";
import Button from "../common/Button";

const PageNavigation = () => {
  const { page, totalPages, prevPage, nextPage } = useDicomViewerStore();

  const handlePrevPage = () => {
    prevPage();
  };

  const handleNextPage = () => {
    nextPage();
  };

  return (
    <div className="flex items-center gap-4">
      <Button onClick={handlePrevPage} disabled={page === 0}>
        <span className="px-4 gap-[10px] ">Previous Image</span>
      </Button>
      <Button onClick={handleNextPage} disabled={page >= totalPages - 1}>
        <span className="px-4 gap-[10px] ">Next Image</span>
      </Button>
    </div>
  );
};

export default PageNavigation;
