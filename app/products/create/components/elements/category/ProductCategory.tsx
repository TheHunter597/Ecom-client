import ChooseFromOverlay from "@/app/auth/signup/components/ChooseFromOverlay";
import {
  selectEditProduct,
  setEditProductCategory,
} from "@/redux/products/editProductSlice";
import {
  selectCreateProduct,
  setProductCategory,
} from "@/redux/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { useEffect, useState } from "react";

interface ProductCategoryProps {
  cateogires: string[];
  state: "edit" | "create";
}

export default function ProductCategory({
  cateogires,
  state,
}: ProductCategoryProps) {
  const { category } = useAppSelector(
    state === "edit" ? selectEditProduct : selectCreateProduct
  );

  return (
    <div className="flex flex-col gap-6 mb-6">
      <ChooseFromOverlay
        currentActive={category}
        changeCurrentActive={
          state == "edit" ? setEditProductCategory : setProductCategory
        }
        list={cateogires}
        text="Category"
      />
    </div>
  );
}
