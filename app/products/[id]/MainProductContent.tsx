import { IProduct } from "@/utils/types";

import FirstProductPageSection from "./sections/FirstProductPageSection";
import SecondProductPageSection from "./sections/SecondProductPageSection";

export default function MainProductContent({ product }: { product: IProduct }) {
  return (
    <div className="flex flex-col gap-8 mb-12">
      <FirstProductPageSection product={product} />
      <SecondProductPageSection
        reviews={product.reviews}
        productReview={product.rating}
      />
    </div>
  );
}
