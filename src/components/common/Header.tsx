import Toolbar from '../dicom/Toolbar';
import PageNavigation from '../dicom/PageNavigation';

const Header = () => {
  return (
    <header className="flex h-[116px] w-full items-center justify-between px-10 py-4">
      <h1 className="text-CoolGray-60 text-xl leading-[110%] font-bold">
        Dicom Viewer(with Cornerstone.js)
      </h1>

      <div className="flex w-[1014px] items-center justify-end gap-6">
        <Toolbar />
        <PageNavigation />
      </div>
    </header>
  );
};

export default Header;
