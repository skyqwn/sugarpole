import Toolbar from "../dicom/Toolbar";
import PageNavigation from "../dicom/PageNavigation";

const Header = () => {
  return (
    <header className="flex items-center px-10 py-4  w-full h-[116px] justify-between">
      <h1 className="text-xl font-bold leading-[110%] text-CoolGray-60">
        Dicom Viewer(with Cornerstone.js)
      </h1>

      <div className="flex items-center w-[1014px] gap-6 justify-end">
        <Toolbar />
        <PageNavigation />
      </div>
    </header>
  );
};

export default Header;
