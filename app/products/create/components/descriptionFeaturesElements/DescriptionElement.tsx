import {
  selectEditProduct,
  setEditProductDescription,
} from "@/redux/products/editProductSlice";
import {
  selectCreateProduct,
  setProductDescription,
} from "@/redux/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { useState } from "react";

export default function DescriptionElement({
  error,
  state,
}: {
  error: any;
  state: "edit" | "create";
}) {
  const [descriptionSubmitted, setDescriptionSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const { description } = useAppSelector(
    state == "edit" ? selectEditProduct : selectCreateProduct
  );
  return (
    <div className="flex flex-col gap-4">
      <textarea
        minLength={20}
        maxLength={500}
        rows={10}
        placeholder="Description"
        className={`rounded text-2sb w-full h-40 p-2 border border-gray-300 focus:outline-none focus:ring-2
         focus:ring-blue-600 focus:border-transparent ${
           descriptionSubmitted ? "bg-gray-200" : ""
         }`}
        onChange={(e) => {
          dispatch(
            state == "edit"
              ? setEditProductDescription(e.target.value)
              : setProductDescription(e.target.value)
          );
        }}
        value={description}
        disabled={descriptionSubmitted}
      ></textarea>
      <small className="text-red-600 text-center text-4sb">
        {error?.errors?.description}
      </small>
      <button
        className="text-4sb primary-color p-3 main-yellow-background-color w-fit self-end "
        onClick={(e) => {
          e.preventDefault();
          setDescriptionSubmitted((prev) => !prev);
        }}
      >
        {!descriptionSubmitted ? "Set Description" : "Change Description"}
      </button>
    </div>
  );
}
