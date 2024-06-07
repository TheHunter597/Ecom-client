import Input from "@/app/auth/signup/components/input";
import {
  selectEditProduct,
  setEditProductPrice,
} from "@/redux/products/editProductSlice";
import {
  selectCreateProduct,
  setProductPrice,
} from "@/redux/products/productsSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { useState } from "react";

interface ProductPriceProps {
  currentActiveInput: string | null;
  setCurrentActiveInput: Function;
  error: any;
  state: "edit" | "create";
}

export default function ProductPrice({
  setCurrentActiveInput,
  currentActiveInput,
  error,
  state,
}: ProductPriceProps) {
  const [priceSubmitted, setPriceSubmitted] = useState(false);
  const { price } = useAppSelector(
    state === "edit" ? selectEditProduct : selectCreateProduct
  );
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="w-full">
        <Input
          placeholder="Price"
          name="Price"
          type="text"
          value={price}
          changeFunc={state == "edit" ? setEditProductPrice : setProductPrice}
          properties={{
            required: true,
            min: 1,
            max: 4,
            disabled: priceSubmitted,
          }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.price}
        />
      </div>
      <button
        className="text-4sb primary-color p-3 main-yellow-background-color w-fit self-end h-full"
        onClick={(e) => {
          e.preventDefault();
          setPriceSubmitted((prev) => !prev);
        }}
      >
        {!priceSubmitted ? "Set Price" : "Change Price"}
      </button>
    </div>
  );
}
