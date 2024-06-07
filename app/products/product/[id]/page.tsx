import { fetchServer } from "@/utils/functions/fetchServer";
import MainProductContent from "./MainProductContent";
import { IProduct } from "@/utils/types";
export const dynamic = "force-static";

export async function generateStaticParams({
  params: { id },
}: {
  params: { id: string };
}) {
  let productData = await fetchServer({
    urlInfo: {
      port: process.env.PRODUCTS_PORT as string,
      service: process.env.PRODUCTS_URL as string,
      url: `api/v1/products/`,
    },
    method: "GET",
    revalidate: 9600,
  });

  const ids = productData.products.map((product: IProduct) => {
    return {
      id: product.id,
    };
  });
  return ids;
}

export default async function MainProductPage({
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

  return (
    <div>
      <MainProductContent product={productData.product} />
    </div>
  );
}
