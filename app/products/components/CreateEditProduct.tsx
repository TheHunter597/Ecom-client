import { useEffect, useState } from "react";
import CreateEditProductImage from "../create/components/CreateEditProductImage";
import FormMainContent from "../create/components/FormMainContent";
import PreviewPage from "../create/preview/previewPage";
import InputError from "@/app/auth/signup/components/InputError";
import { useDispatch } from "react-redux";
import { loadLocalStorage } from "@/redux/products/productsSlice";
import { loadEditProductData } from "@/redux/products/editProductSlice";
import { IProduct } from "@/utils/types";
import { revalidateProductPage } from "@/utils/functions/serverActions";

export default function CreateEditProduct({
  categories,
  fetchData,
  error,
  data,
  state,
  editProductData,
}: {
  categories: string[];
  fetchData: any;
  error: any;
  data: any;
  state: "edit" | "create";
  editProductData?: IProduct;
}) {
  const [preview, setPreview] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state == "create") {
      dispatch(loadLocalStorage());
    } else {
      dispatch(loadEditProductData(editProductData));
    }
  }, [dispatch]);
  let boundRevalidateProductPage = revalidateProductPage.bind(
    null,
    editProductData?.id
  );
  return (
    <form
      className="flex flex-col gap-12"
      onSubmit={async (e) => {
        e.preventDefault();
        let result = await fetchData();
        if (result && state == "edit") {
          boundRevalidateProductPage();
        }
      }}
    >
      {!preview ? (
        <div className="flex flex-col gap-24 sm:gap-4  sm:grid sm:grid-cols-12">
          <CreateEditProductImage state={state} />
          <FormMainContent
            error={error}
            categories={categories}
            state={state}
          />
        </div>
      ) : (
        <PreviewPage />
      )}

      <div className="flex flex-col gap-4">
        {error && <InputError error={error.message} size={3} />}
        {data && (
          <small className="text-green-600 text-2sb self-center">
            {data.message}
          </small>
        )}
        <div className="flex flex-row gap-4 justify-center">
          <button
            className="text-3sb text-white p-3 primary-background-color w-fit sm:w-1/4 self-end"
            onClick={(e) => {
              e.preventDefault();
              setPreview((prev) => !prev);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            className="text-3sb primary-color p-3 main-yellow-background-color w-fit sm:w-1/4 self-end"
            // onClick={async (e) => {
            //   e.preventDefault();
            // }}
          >
            {state == "create" ? "Add Product" : "Update Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
