import { IProduct } from "@/utils/types";

import FirstProductPageSection from "./sections/FirstProductPageSection";
import SecondProductPageSection from "./sections/SecondProductPageSection";
import ProductsSlide from "@/app/components/MainPage/secondSection/ProductsSlide";

export default function MainProductContent({ product }: { product: IProduct }) {
  const refactoredCategoryName = product.category.includes("&")
    ? product.category.replace("&", "%26")
    : product.category;
  return (
    <div className="flex flex-col gap-16 mb-12">
      <FirstProductPageSection product={product} />
      <SecondProductPageSection
        reviews={product.reviews}
        productReview={product.rating}
      />
      <ProductsSlide
        filterWith={{ category: refactoredCategoryName }}
        limit={10}
        mainHeader="Similar products"
        bgColor="white"
      />
    </div>
  );
}
