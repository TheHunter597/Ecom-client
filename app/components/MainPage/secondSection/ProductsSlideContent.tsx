"use client";
import { randomBytes } from "crypto";
import { useMemo } from "react";
import { IProduct } from "@/utils/types";
import MainProductCard from "@/app/products/product/components/MainProductCard";
import MakeSlider from "../../others/MakeSlider";
import SlideableElement from "../../others/SlideableElement";
import { useRouter } from "next/navigation";
export default function ProductsSlideContent({
  productsResults,
}: {
  productsResults: { products: IProduct[] };
}) {
  const router = useRouter();
  let productsResult = useMemo(() => {
    return productsResults.products.map((product: IProduct) => {
      return (
        <SlideableElement
          key={`${product.title}-${randomBytes(8).toString("hex")}`}
          functionToRun={() => {
            router.push(`/products/product/${product.id}`);
          }}
        >
          <MainProductCard {...product} />
        </SlideableElement>
      );
    });
  }, [productsResults.products]);

  return <MakeSlider>{productsResult}</MakeSlider>;
}
