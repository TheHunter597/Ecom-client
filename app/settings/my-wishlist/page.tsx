import ProductsResultWithFilter from "@/app/products/components/ProductsResultWithFilter";
import ResultProduct from "@/app/products/components/ResultProduct";
import ProtectedRouteUserAuth from "@/utils/Errors/UserAuthenticatedRoute";
import { fetchServer } from "@/utils/functions/fetchServer";
import { IProduct } from "@/utils/types";

export default async function MyWishList() {
  const wishlist = await fetchServer({
    urlInfo: {
      url: "api/v1/wishlist/",
      port: process.env.CARTWISHLIST_PORT as string,
      service: process.env.CARTWISHLIST_URL as string,
    },
    method: "GET",
    withCredentials: true,
    withToken: true,
    cache: "no-store",
  });
  let result = wishlist.wishlist.products.map(
    (current: { product: IProduct; id: string }) => {
      return (
        <div key={current.product.id}>
          <ResultProduct
            product={current.product}
            button="remove"
            cartElementToDelete={current.id}
          />
        </div>
      );
    }
  );

  return (
    <ProtectedRouteUserAuth>
      <div className="h-full w-full flex flex-col pt-8 items-center bg-gray-50 min-h-screen">
        <div className="flex flex-col gap-12 rounded-md shadow-xl w-11/12 md:8/12 lg:w-6/12 mx-auto p-4 bg-white">
          <div>
            <h1 className="font-bold primary-color text-2xl">My Wishlist</h1>
          </div>
          {result.length > 0 ? (
            <div className="flex flex-col gap-12">{result}</div>
          ) : (
            <div className="header-5sb secondary-color self-center">
              No items in wishlist
            </div>
          )}
        </div>
      </div>
    </ProtectedRouteUserAuth>
  );
}
