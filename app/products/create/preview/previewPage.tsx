"use client";
import { loadLocalStorage } from "@/redux/products/productsSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import {
  FirstProductSectionProps,
  IProduct,
  PreviewProduct,
} from "@/utils/types";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import FirstProductPageSection from "../../product/[id]/sections/FirstProductPageSection";

export default function PreviewPage() {
  const product = useAppSelector((state) => {
    return state.product.createProduct;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLocalStorage());
  }, [dispatch]);
  const previewProductColors = product.colors.map((color, index) => {
    return {
      name: color.name,
      hex: color.hex,
      id: "preview-color-" + index,
    };
  });
  const previewProductSizes = product.sizes.map((size, index) => {
    return {
      name: size.name,
      abbreviation: size.abbreviation,
      id: "preview-size-" + index,
    };
  });
  const otherProduct: IProduct = {
    id: "preview",
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    ...product,
    colors: previewProductColors,
    sizes: previewProductSizes,
    price: +product.price,
    countInStock: +product.countInStock,
    discount: 0,
    creator: { id: "preview-creator" },
    reviews: [],
    rating: 0,
  };

  const missingFields = Object.keys(otherProduct).filter(
    // @ts-ignore
    (item: keyof typeof product) => {
      if (typeof product[item] == "object" && !Array.isArray(item)) {
        if (Object.keys(product[item]).length === 0) {
          return true;
        }
      }
      if (otherProduct[item] == 0) return false;
      return !otherProduct[item];
    }
  );

  if (Object.keys(missingFields).length > 0) {
    return (
      <div className="flex flex-col justify-center items-center h-96 primary-color header-4sb">
        <p>Please fill all the fields</p>
        <p className="text-2sb">
          <span className="text-red-700">Missing fields: </span>
          {missingFields.map((item) => (
            <span key={item}>{item}, </span>
          ))}
        </p>
      </div>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="flex felx-row justify-center items-center h-96 primary-color header-4sb">
          LOADING
        </div>
      }
    >
      <FirstProductPageSection product={otherProduct} test={true} />
    </Suspense>
  );
}
