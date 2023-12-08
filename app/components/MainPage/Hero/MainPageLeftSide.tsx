export default function MainPageLeftSide() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="main-header">
          Elevate Your <span className="tertiary-color">Style</span> with
          Affordable <span className="tertiary-color">Elegance</span>
        </h1>
        <h2 className="text-1r secondary-color">
          Say goodbye to compromise – our products blend style, functionality,
          and affordability seamlessly
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-1sb text-gray-900">
          <span className="tertiary-color ">Shop</span> Now for Exclusive Deals
        </h3>
        <div className="flex flex-row gap-4">
          <button className="text-1r primary-color main-yellow-background-color py-2 px-2 rounded-md">
            Find out what’s new
          </button>
          <button className="text-1r text-white primary-background-color py-2 px-2 rounded-md">
            Contact us
          </button>
        </div>
      </div>
    </>
  );
}
