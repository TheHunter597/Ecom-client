import { fetchServer } from "@/utils/functions/fetchServer";
import MainProductContent from "./MainProductContent";
export default async function MainProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  let productData = await fetchServer({
    urlInfo: {
      port: "4000",
      service: "products",
      url: `api/v1/products/${id}/`,
    },
    method: "GET",
    revalidate: 10,
  });
  return (
    <div>
      <MainProductContent product={productData.product} />
      <div></div>
    </div>
  );
}
