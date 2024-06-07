import Input from "@/app/auth/signup/components/input";
import SizeElement from "@/app/products/product/[id]/components/SizeElement";
import {
  addEditProductSize,
  removeEditProductSize,
  selectEditProduct,
  selectEditProductCurrents,
  setEditCurrentSizeAbbreviation,
  setEditCurrentSizeName,
} from "@/redux/products/editProductSlice";
import {
  addProductSize,
  removeProductSize,
  selectCreateProduct,
  selectCreateProductCurrents,
  setCurrentSizeAbbreviation,
  setCurrentSizeName,
} from "@/redux/products/productsSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
interface ProductColorProps {
  currentActiveInput: string | null;
  setCurrentActiveInput: Function;
  error: any;
  state: "edit" | "create";
}
export default function ProductSize({
  currentActiveInput,
  setCurrentActiveInput,
  error,
  state,
}: ProductColorProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const { currentSizeName, currentSizeAbbreviation } = useAppSelector(
    state == "edit" ? selectEditProductCurrents : selectCreateProductCurrents
  );
  const { sizes } = useAppSelector(
    state == "edit" ? selectEditProduct : selectCreateProduct
  );
  const dispatch = useDispatch();
  const sizesResult = sizes.map((size) => {
    return (
      <div
        className="cursor-pointer"
        onClick={() => {
          dispatch(
            state == "edit"
              ? removeEditProductSize(size.abbreviation)
              : removeProductSize(size.abbreviation)
          );
        }}
        key={`CreateProductSizes-${size.abbreviation}}`}
      >
        <SizeElement
          size={size}
          key={`CreateProductSizes-${size.abbreviation}}`}
        />
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-2">{sizesResult}</div>
      <div className="flex flex-col gap-6">
        <Input
          placeholder="Size name"
          name="Size name"
          type="text"
          value={currentSizeName}
          changeFunc={
            state == "edit" ? setEditCurrentSizeName : setCurrentSizeName
          }
          properties={{ required: false, min: 2, max: 20 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.sizes}
        />
        <Input
          placeholder="size abbreviation"
          name="size abbreviation"
          type="text"
          value={currentSizeAbbreviation}
          changeFunc={
            state == "edit"
              ? setEditCurrentSizeAbbreviation
              : setCurrentSizeAbbreviation
          }
          properties={{ required: false, min: 1, max: 4 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          // error={error?.errors?.email}
        />
        <div className="flex flex-col gap-2">
          <button
            className="text-4sb primary-color p-3 main-yellow-background-color w-fit self-end"
            onClick={(e) => {
              e.preventDefault();
              if (
                currentSizeName.length < 1 ||
                currentSizeAbbreviation.length < 1
              ) {
                setErrorMessage("Please fill in all fields");
                return;
              } else if (currentSizeAbbreviation.length > 5) {
                setErrorMessage(
                  "Please choose an abbreviation less than 5 characters"
                );
                return;
              }
              dispatch(
                state == "edit" ? addEditProductSize({}) : addProductSize({})
              );
            }}
          >
            Add Size
          </button>
          <small className="text-4sb text-red-700">{errorMessage}</small>
        </div>
      </div>
    </div>
  );
}
