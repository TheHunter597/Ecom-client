import { fetchServer } from "@/utils/functions/fetchServer";
import ProductsSlideContent from "./ProductsSlideContent";

export default async function ProductsSlide({
  limit = 10,
  filterWith,
  mainHeader,
  bgColor,
}: {
  limit?: number;
  filterWith?: { [key: string]: string };
  mainHeader: string;
  subHeader?: string;
  bgColor: string;
}) {
  let formulatedFilters = "";
  if (filterWith) {
    for (let key in filterWith) {
      formulatedFilters += `&${key}=${filterWith[key]}`;
    }
  }

  let productsResults = await fetchServer({
    urlInfo: {
      url: `api/v1/products/?limit=${limit}${formulatedFilters}`,
      port: process.env.PRODUCTS_PORT as string,
      service: process.env.PRODUCTS_URL as string,
    },
    method: "GET",
    revalidate: 10,
  });

  return (
    <div className={`flex flex-col gap-4 bg-opacity-60 py-6 ${bgColor}`}>
      <div className="flex flex-col gap-1 w-11/12 m-auto border-gray-500 pb-2">
        <h3 className=" text-gray-800 text-1sb first-letter:uppercase font-bold">
          {mainHeader}
        </h3>
      </div>
      <ProductsSlideContent productsResults={productsResults} />;
    </div>
  );
}
