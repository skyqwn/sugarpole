import { useDicomViewerStore } from '../../store/dicomViewerStore';
import Button from '../common/Button';

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
        <span className="gap-[10px] px-4">Previous Image</span>
      </Button>
      <Button onClick={handleNextPage} disabled={page >= totalPages - 1}>
        <span className="gap-[10px] px-4">Next Image</span>
      </Button>
    </div>
  );
};

export default PageNavigation;
