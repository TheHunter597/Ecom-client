"use client";
import CreateEditProduct from "@/app/products/components/CreateEditProduct";
import { selectEditProduct } from "@/redux/products/editProductSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { useFetch } from "@/utils/hooks/useFetch";
import { IProduct } from "@/utils/types";

export default function EditProductMainContent({
  product,
  categories,
}: {
  product: IProduct;
  categories: string[];
}) {
  const editProductData = useAppSelector(selectEditProduct);
  const { fetchData, data, error } = useFetch({
    url: "/api/v1/products/update/" + product.id + "/",
    method: "put",
    body: editProductData,
    withCredentials: true,
    withToken: true,
  });
  function toDo() {
    fetchData();
  }

  return (
    <div className="w-10/12 m-auto flex flex-col gap-8 my-8 overflow-x-hidden">
      <h1 className="header-5sb primary-color">Edit Product</h1>
      <div>
        <CreateEditProduct
          categories={categories}
          fetchData={toDo}
          error={error}
          data={data}
          state="edit"
          editProductData={product}
        />
      </div>
    </div>
  );
}
