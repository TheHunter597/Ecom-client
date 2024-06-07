import Input from "@/app/auth/signup/components/input";
import {
  selectEditProduct,
  setEditProductTitle,
} from "@/redux/products/editProductSlice";
import {
  selectCreateProduct,
  setProductTitle,
} from "@/redux/products/productsSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { useState } from "react";

interface ProductNameProps {
  currentActiveInput: string | null;
  setCurrentActiveInput: Function;
  error: any;
  state: "edit" | "create";
}

export default function ProductTitle({
  currentActiveInput,
  setCurrentActiveInput,
  error,
  state,
}: ProductNameProps) {
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const { title } = useAppSelector(
    state === "edit" ? selectEditProduct : selectCreateProduct
  );
  return (
    <div className="flex flex-col gap-2 justify-end">
      {nameSubmitted ? (
        <h4 className="desktop-2sb secondary-color max-w-full break-before-all">
          {title}
        </h4>
      ) : (
        <Input
          placeholder="Product Name"
          name="Product Name"
          type="text"
          value={title}
          changeFunc={state == "edit" ? setEditProductTitle : setProductTitle}
          properties={{ required: true, min: 8, max: 250 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.title}
        />
      )}
      <button
        className="text-4sb primary-color p-3 main-yellow-background-color w-fit self-end"
        onClick={(e) => {
          e.preventDefault();

          setNameSubmitted((prev) => !prev);
        }}
      >
        {!nameSubmitted ? "Set Product Name" : "Change Product Name"}
      </button>
    </div>
  );
}
