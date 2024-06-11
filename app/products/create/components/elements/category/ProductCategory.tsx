import ChooseFromOverlay from "@/app/auth/signup/components/ChooseFromOverlay";
import InputError from "@/app/auth/signup/components/InputError";
import {
  selectEditProduct,
  setEditProductCategory,
} from "@/redux/products/editProductSlice";
import {
  selectCreateProduct,
  setProductCategory,
} from "@/redux/products/productsSlice";
import { useAppSelector } from "@/redux/reduxHooks";

interface ProductCategoryProps {
  cateogires: string[];
  state: "edit" | "create";
  error: any;
}

export default function ProductCategory({
  cateogires,
  state,
  error,
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
      <InputError error={error?.errors.category} />
    </div>
  );
}
