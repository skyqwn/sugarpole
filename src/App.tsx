import Button from "./components/common/Button";

export default function App() {
  return (
    <div className="w-[1440px] h-screen mx-auto">
      <header className="flex items-center px-10 py-4 w-full h-[116px] justify-between">
        <h1 className="text-xl font-bold leading-[110%]">
          Dicom Viewer(with Cornstone.js)
        </h1>

        <div className="flex items-center w-[1014px] justify-between">
          <ul className=" flex gap-6 w-[649px] justify-between py-3 px-2">
            <li>Zoom</li>
            <li>Flip H</li>
            <li>Flip V</li>
            <li>Rotate Delta 30</li>
            <li>Invert</li>
            <li>Apply Colormap</li>
            <li>Reset</li>
          </ul>
          <Button>Previous Image</Button>
          <Button>Next Image</Button>
        </div>
      </header>
    </div>
  );
}
