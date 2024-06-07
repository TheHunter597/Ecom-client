import { fetchServer } from "@/utils/functions/fetchServer";
import EditProductMainContent from "./components/EditProductMainContent";
import checkUserAuthenticated from "@/utils/functions/checkUserAuthenticated";

export default async function EditProduct({
  params: { id },
}: {
  params: { id: string };
}) {
  let productData = await fetchServer({
    urlInfo: {
      port: process.env.PRODUCTS_PORT as string,
      service: process.env.PRODUCTS_URL as string,
      url: `api/v1/products/${id}/`,
    },
    method: "GET",
    revalidate: 10,
  });
  const categories = await fetchServer({
    urlInfo: {
      port: process.env.PRODUCTS_PORT as string,
      service: process.env.PRODUCTS_URL as string,
      url: "api/v1/products/categories/all/",
    },
    method: "GET",
    revalidate: 10000,
  });
  const userData = await checkUserAuthenticated();
  if (!userData.isAuthenticated) {
    throw new Error("You are not authorized to access this page");
  } else if (userData.userData.id != productData.product.creator.id) {
    throw new Error("You are not authorized to access this page");
  }

  return (
    <EditProductMainContent
      product={productData.product}
      categories={categories.categories.map((cat: any) => cat.name)}
    />
  );
}
