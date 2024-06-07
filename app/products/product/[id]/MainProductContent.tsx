import { IProduct } from "@/utils/types";

import FirstProductPageSection from "./sections/FirstProductPageSection";
import SecondProductPageSection from "./sections/SecondProductPageSection";
import ProductsSlide from "@/app/components/MainPage/secondSection/ProductsSlide";

export default function MainProductContent({ product }: { product: IProduct }) {
  return (
    <div className="flex flex-col gap-16 mb-12">
      <FirstProductPageSection product={product} />
      <SecondProductPageSection
        reviews={product.reviews}
        productReview={product.rating}
      />
      <ProductsSlide
        filterWith={{ category: product.category }}
        limit={10}
        mainHeader="Similar products"
        bgColor="white"
      />
    </div>
  );
}
