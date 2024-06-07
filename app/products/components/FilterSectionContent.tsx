import { IProduct } from "@/utils/types";
import { useState } from "react";
import ResultProduct from "./ResultProduct";
import ReactPaginate from "react-paginate";
export default function FilterSectionContent({
  filterDate,
  filterRate,
  filterPrice,
  products,
}: {
  filterRate: number;
  filterDate: { name: string; value: number };
  filterPrice: number[];
  products: IProduct[];
}) {
  const [itemOffset, setItemOffset] = useState(0);
  let productsNumberPerPage = 6;
  let endOffset = itemOffset + productsNumberPerPage;
  let filteredProducts =
    products
      .filter((product) => {
        return product.rating >= filterRate;
      })
      .map((product) => {
        let date = new Date(product.createdAt);
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return { ...product, days };
      })
      .filter((review) => {
        if (filterDate.value === 500) return true;
        return review.days <= filterDate.value;
      })
      .filter(
        (product) =>
          product.price >= filterPrice[0] && product.price <= filterPrice[1]
      ) || [];

  let productsResult = filteredProducts
    .slice(itemOffset, endOffset)
    .map((product) => {
      return (
        <ResultProduct product={product} key={`ProductResult-${product.id}`} />
      );
    });

  let pageCount = Math.ceil(filteredProducts?.length / productsNumberPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = event.selected * productsNumberPerPage;
    setItemOffset(newOffset);

    if (typeof window != "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="flex flex-col gap-10 ">
      <h5>
        <span className="header-5sb secondary-color">Results</span>
        &nbsp;
        <span className="text-3sb">
          (showing{" "}
          {productsNumberPerPage && endOffset < filteredProducts?.length
            ? endOffset
            : filteredProducts?.length}{" "}
          of {filteredProducts && filteredProducts.length})
        </span>
      </h5>
      <div className="flex flex-col  gap-24">
        <div className=" flex flex-col gap-8">{productsResult}</div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="PaginationClass text-2sb self-center flex flex-row items-center justify-center align-middle gap-2
        p-2 shadow-lg rounded-md mb-8 overflow-x-clip "
          activeClassName="primary-background-color rounded-full text-white"
          // disabledClassName="text-gray-400"
          activeLinkClassName="text-white"
          pageLinkClassName="primary-color px-3 py-1 rounded-full border-2 primary-border-color inline-block
          hover:bg-gray-800 duration-300 hover:text-white"
          previousLinkClassName="hidden primary-background-color py-2 px-4 rounded-md text-3sb text-white inline-block
        hover:bg-white hover:text-gray-800 duration-300 border-2 primary-border-color
        "
          nextLinkClassName="hidden primary-background-color py-2 px-4 rounded-md text-3sb text-white inline-block
        hover:bg-white hover:text-gray-800 duration-300 border-2 primary-border-color
        "
        />
      </div>
    </div>
  );
}
