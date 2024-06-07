function arraysEqual(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((element, index) => element === arr2[index]);
}
export default function FilterByPrice({
  changePriceFilter,
  filterPrice,
}: {
  changePriceFilter: Function;
  filterPrice: number[];
}) {
  let neededPrices = [
    [0, 25],
    [25, 50],
    [50, 100],
    [100, 200],
    [0, 10000],
  ];
  let result = neededPrices.map((price) => {
    return (
      <div
        key={`FilterWithResults-${price}`}
        className={`flex flex-row gap-2 shadow-md filtersPadding text-4sb px-1 rounded-md border border-gray-200
        cursor-pointer hover:bg-gray-800 hover:text-white duration-200 ${
          arraysEqual(price, filterPrice) ? "bg-gray-800 text-white " : ""
        }`}
        onClick={() => changePriceFilter(price)}
      >
        <p>
          {Array.isArray(price)
            ? `$${price[0]} to $${price[1]}`
            : `Up to $${price}`}
        </p>
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-4">
      <h4 className="secondary-color header-6sb">Price</h4>
      <div className="flex flex-col gap-2">{result}</div>
    </div>
  );
}
