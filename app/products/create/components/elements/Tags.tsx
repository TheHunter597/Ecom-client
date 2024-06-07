import Input from "@/app/auth/signup/components/input";
import TagElement from "@/app/products/product/components/TagElement";
import {
  addEditProductTag,
  removeEditProductTag,
  selectEditProduct,
  selectEditProductCurrents,
  setEditCurrentTag,
} from "@/redux/products/editProductSlice";
import {
  addProductTag,
  removeProductTag,
  selectCreateProduct,
  selectCreateProductCurrents,
  setCurrentTag,
} from "@/redux/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { useState } from "react";
interface ProductTagsProps {
  currentActiveInput: string | null;
  setCurrentActiveInput: Function;
  error: any;
  state: "edit" | "create";
}
export default function Tags({
  setCurrentActiveInput,
  currentActiveInput,
  error,
  state,
}: ProductTagsProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const { currentTag } = useAppSelector(
    state === "edit" ? selectEditProductCurrents : selectCreateProductCurrents
  );
  const { tags } = useAppSelector(
    state === "edit" ? selectEditProduct : selectCreateProduct
  );

  const tagsResult = tags.map((tag) => {
    return (
      <div
        className="cursor-pointer"
        onClick={() => {
          dispatch(
            state === "edit"
              ? removeEditProductTag({ tag })
              : removeProductTag({ tag })
          );
        }}
        key={`CreateProductTags-${tag}}`}
      >
        <TagElement
          size="text-4sb"
          name={tag}
          key={`CreateProductTags-${tag}}`}
        />
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-10">
      <div className="flex felx-row gap-2 flex-wrap text-1sb">{tagsResult}</div>
      <div className="flex flex-col gap-2 justify-end">
        <Input
          placeholder="Tag Name"
          name="Tag Name"
          type="text"
          value={currentTag}
          changeFunc={state == "edit" ? setEditCurrentTag : setCurrentTag}
          properties={{ min: 2, max: 16 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.tags}
        />
        <button
          className="text-4sb primary-color p-3 main-yellow-background-color w-fit self-end"
          onClick={(e) => {
            e.preventDefault();
            if (currentTag === "") {
              setErrorMessage("Tag cannot be empty");
              return;
            }
            if (tags.includes(currentTag)) {
              setErrorMessage("Tag already exists");
              return;
            }
            if (tags.length >= 5) {
              setErrorMessage("You can only add 5 tags");
              return;
            }
            setErrorMessage("");
            dispatch(
              state == "edit" ? addEditProductTag({}) : addProductTag({})
            );
            dispatch(state == "edit" ? setEditCurrentTag : setCurrentTag(""));
          }}
        >
          Add Tag
        </button>
        <small className="text-4sb text-red-700">{errorMessage}</small>
      </div>
    </div>
  );
}
