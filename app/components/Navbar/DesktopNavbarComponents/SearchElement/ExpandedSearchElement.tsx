import { useEffect, useRef, useState } from "react";
import SearchOverlay from "./SearchOverlay";
import { useFetch } from "@/utils/hooks/useFetch";
import { useDebouncedCallback } from "use-debounce";
export default function ExpandedSearchElement({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const { fetchData, data, error } = useFetch({
    url: `/api/v1/products/?title=${searchValue}`,
    method: "get",
  });
  const debouncedFetch = useDebouncedCallback(fetchData, 500);
  return (
    <div className="w-fit h-fit bg-white z-50 sm:w-72">
      <input
        ref={ref}
        type="text"
        className="w-full px-3 py-2 text-4sb primary-color border-b-2 border-gray-500 
        cursor-pointer focus:outline-none focus:border-primary-color "
        placeholder="Search for products"
        value={searchValue}
        onChange={async (e) => {
          setSearchValue(e.target.value);
          await debouncedFetch();
        }}
        onBlur={() => {
          if (!searchValue) setActive(false);
        }}
      />
      {searchValue && data && (
        <SearchOverlay
          data={data}
          searchValue={searchValue}
          setActive={setActive}
        />
      )}
    </div>
  );
}
