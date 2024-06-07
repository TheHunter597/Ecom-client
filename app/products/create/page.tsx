import { fetchServer } from "@/utils/functions/fetchServer";
import CreateProductMainContent from "./CreateProductMainContent";
import ProtectedRouteUserAuth from "@/utils/Errors/UserAuthenticatedRoute";

export default async function CreateProduct() {
  const categories = await fetchServer({
    urlInfo: {
      port: process.env.PRODUCTS_PORT as string,
      service: process.env.PRODUCTS_URL as string,
      url: "api/v1/products/categories/all/",
    },
    method: "GET",
    revalidate: 10000,
  });

  return (
    <ProtectedRouteUserAuth>
      <CreateProductMainContent
        categories={categories.categories.map((cat: any) => cat.name)}
      />
    </ProtectedRouteUserAuth>
  );
}
