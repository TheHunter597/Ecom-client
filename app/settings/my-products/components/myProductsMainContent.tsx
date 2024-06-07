"use client";
import SlideableElement from "@/app/components/others/SlideableElement";
import { IProduct } from "@/utils/types";
import SimpleProductElement from "./SimpleProductElement";
import { useRouter } from "next/navigation";
import MakeSlider from "@/app/components/others/MakeSlider";

export default function MyOrdersMainContent({
  products,
}: {
  products: IProduct[];
}) {
  const router = useRouter();
  const productsResult = products.reverse().map((product: IProduct) => {
    return (
      <SlideableElement
        key={`MyProduct-${product.id}`}
        functionToRun={() => {
          router.push(`/products/product/${product.id}`);
        }}
      >
        <SimpleProductElement product={product} />
      </SlideableElement>
    );
  });
  return <MakeSlider>{productsResult}</MakeSlider>;
}
