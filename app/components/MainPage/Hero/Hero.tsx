import MainPageLeftSide from "./MainPageLeftSide";
import MainPageRightSide from "./MainPageRightSide";

export default function Hero() {
  return (
    <div className="grid grid-cols-2 m-auto w-full">
      <div className="col-span-1 flex flex-col gap-12 pt-12 w-9/12 m-auto">
        <MainPageLeftSide />
      </div>
      <div className="col-span-1 h-full">
        <MainPageRightSide />
      </div>
    </div>
  );
}
