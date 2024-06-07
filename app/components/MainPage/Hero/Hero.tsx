import MainPageLeftSide from "./MainPageLeftSide";
import MainPageRightSide from "./MainPageRightSide";

export default function Hero() {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 m-auto w-full mb-8">
      <div className="col-span-1 flex flex-col gap-12 pt-12 w-11/12  sm:w-9/12 mx-auto">
        <MainPageLeftSide />
      </div>
      <div className="sm:col-span-1 h-full sm:block hidden">
        <MainPageRightSide />
      </div>
    </div>
  );
}
