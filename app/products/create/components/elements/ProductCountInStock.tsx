import Input from "@/app/auth/signup/components/input";
import {
  selectEditProduct,
  setEditProductCountInStock,
} from "@/redux/products/editProductSlice";
import {
  selectCreateProduct,
  setProductCategory,
  setProductCountInStock,
} from "@/redux/products/productsSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { useState } from "react";

interface ProductCountInStockProps {
  currentActiveInput: string | null;
  setCurrentActiveInput: Function;
  error: any;
  state: "edit" | "create";
}

export default function ProductCountInStock({
  setCurrentActiveInput,
  currentActiveInput,
  error,
  state,
}: ProductCountInStockProps) {
  const { countInStock } = useAppSelector(
    state === "edit" ? selectEditProduct : selectCreateProduct
  );
  const [countInStockChosen, setcountInStockChosen] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <Input
        placeholder="countInStock"
        name="countInStock"
        type="text"
        value={countInStock}
        changeFunc={
          state === "edit" ? setEditProductCountInStock : setProductCountInStock
        }
        properties={{
          required: true,
          min: 1,
          max: 3,
          disabled: countInStockChosen,
        }}
        currentActiveInput={currentActiveInput}
        setCurrentActiveInput={setCurrentActiveInput}
        error={error?.errors?.countInStock}
      />
      <button
        className="text-4sb primary-color p-3 main-yellow-background-color w-fit self-end"
        onClick={(e) => {
          e.preventDefault();
          setcountInStockChosen((prev) => !prev);
        }}
      >
        {countInStockChosen ? "Change Count in stock" : "Choose Count in stock"}
      </button>
    </div>
  );
}
