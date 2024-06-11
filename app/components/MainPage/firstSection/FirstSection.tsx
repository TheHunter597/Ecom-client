import { fetchServer } from "@/utils/functions/fetchServer";
import CategoriesResult from "./CategoriesResult";

export default async function FirstSection() {
  const categoriesData = await fetchServer({
    urlInfo: {
      port: process.env.PRODUCTS_PORT as string,
      service: process.env.PRODUCTS_URL as string,
      url: "api/v1/products/categories/all/",
    },
    method: "GET",
    revalidate: 10000,
  });

  return (
    <div className="w-full bg-emerald-200 py-8">
      <div className="w-11/12 m-auto  flex flex-col gap-12 ">
        <div className="flex flex-col gap-4 secondary-color">
          <div className="flex flex-row justify-between">
            <h2 className="desktop-4sb font-bold text-gray-800">Categories</h2>
          </div>
        </div>
        <CategoriesResult categories={categoriesData.categories} />
      </div>
    </div>
  );
}
