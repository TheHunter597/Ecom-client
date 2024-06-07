"use client";
import DesktopFilterToggler from "@/app/components/others/DesktopFIlterToggler";
import PhoneFilter from "@/app/components/others/PhoneFilter";
import FilterSection from "@/app/products/components/FilterSection";
import FilterSectionContent from "@/app/products/components/FilterSectionContent";
import { IProduct } from "@/utils/types";
import { useState } from "react";

export default function ProductsResultWithFilter({
  products,
}: {
  products: IProduct[];
}) {
  const [filterRate, setFilterRate] = useState<number>(0);
  const [filterDate, setFilterDate] = useState<{
    name: string;
    value: number;
  }>({ name: "Any time", value: 500 });
  const [filterPrice, setFilterPrice] = useState<number[]>([0, 10000]);
  const [showDesktopFilter, setShowDesktopFilter] = useState<boolean>(true);
  return (
    <div className="flex flex-col w-11/12 sm:w-10/12 m-auto mt-10 lg:grid lg:grid-cols-12 gap-8 relative ">
      <div
        className={`hidden lg:block sticky top-10 ${
          showDesktopFilter ? "lg:col-span-3" : " lg:col-span-1"
        }`}
      >
        <DesktopFilterToggler
          showDesktopFilter={showDesktopFilter}
          setShowDesktopFilter={setShowDesktopFilter}
        >
          <FilterSection
            setFilterRate={setFilterRate}
            filterRate={filterRate}
            setFilterDate={setFilterDate}
            filterDate={filterDate}
            setFilterPrice={setFilterPrice}
            filterPrice={filterPrice}
          />
        </DesktopFilterToggler>
      </div>
      <div className="block lg:hidden overflow-y-scroll">
        <PhoneFilter headerText="Filter products">
          <FilterSection
            setFilterRate={setFilterRate}
            filterRate={filterRate}
            setFilterDate={setFilterDate}
            filterDate={filterDate}
            setFilterPrice={setFilterPrice}
            filterPrice={filterPrice}
          />
        </PhoneFilter>
      </div>
      <div
        className={`w-full ${
          showDesktopFilter ? "lg:col-start-4" : "lg:col-start-2"
        } lg:col-end-13`}
      >
        <FilterSectionContent
          filterRate={filterRate}
          filterDate={filterDate}
          filterPrice={filterPrice}
          products={products}
        />
      </div>
    </div>
  );
}
