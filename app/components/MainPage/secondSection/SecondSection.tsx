import { fetchServer } from "@/utils/functions/fetchServer";
import SecondSectionContent from "./secondSectionContent";

export default async function SecondSection() {
  let topTenProducts = await fetchServer({
    urlInfo: {
      url: "api/v1/products/?limit=10",
      port: "4000",
      service: "products",
    },
    method: "GET",
    revalidate: 10,
  });
  return <SecondSectionContent topTenProducts={topTenProducts} />;
}
