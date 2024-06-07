import FilterByRating from "../product/[id]/components/reviews/FilterByRating";
import FilterByDate from "../product/[id]/components/reviews/FilterByDate";
import FilterByPrice from "./FilterByPrice";

export default function FilterSection({
  setFilterRate,
  filterRate,
  setFilterDate,
  filterDate,
  setFilterPrice,
  filterPrice,
}: {
  setFilterRate: Function;
  filterRate: number;
  setFilterDate: Function;
  filterDate: { name: string; value: number };
  setFilterPrice: Function;
  filterPrice: number[];
}) {
  return (
    <div className="w-11/12 lg:flex flex-col gap-4 overflow-y-scroll ">
      <h3 className="secondary-color text-2sb pb-4 header-6sb border-b-2 border-b-gray-600">
        Filter Result
      </h3>
      <div className="flex flex-col gap-4">
        <FilterByRating
          changeFilterRate={setFilterRate}
          filterRate={filterRate}
        />
        <FilterByDate
          changeFilterByDate={setFilterDate}
          filterDate={filterDate}
        />
        <FilterByPrice
          changePriceFilter={setFilterPrice}
          filterPrice={filterPrice}
        />
      </div>
    </div>
  );
}
