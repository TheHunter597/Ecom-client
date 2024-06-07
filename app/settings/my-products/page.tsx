import { fetchServer } from "@/utils/functions/fetchServer";
import { IProduct } from "@/utils/types";
import MyProductsMainContent from "./components/myProductsMainContent";
import ProtectedRouteUserAuth from "@/utils/Errors/UserAuthenticatedRoute";

export default async function YourProducts() {
  const { products, count }: { products: IProduct[]; count: number } =
    await fetchServer({
      urlInfo: {
        url: "api/v1/my-products/",
        port: process.env.PRODUCTS_PORT as string,
        service: process.env.PRODUCTS_URL as string,
      },
      method: "GET",
      withToken: true,
      withCredentials: true,
    });

  return (
    <ProtectedRouteUserAuth>
      <div className="w-full h-screen bg-gray-200">
        <div className={`flex flex-col gap-4 mx-auto pt-8 `}>
          <div className="flex flex-col gap-1 w-10/12 mx-auto border-gray-500 pb-2">
            <h3 className="font-bold primary-color header-5sb first-letter:uppercase">
              Your Products
            </h3>
          </div>
          {count > 0 ? (
            <MyProductsMainContent products={products} />
          ) : (
            <div
              className="h-96 header-4sb text-center flex flex-col
           items-center justify-center self-center  primary-color font-bold"
            >
              You have not created any products to display
            </div>
          )}
        </div>
      </div>
    </ProtectedRouteUserAuth>
  );
}
