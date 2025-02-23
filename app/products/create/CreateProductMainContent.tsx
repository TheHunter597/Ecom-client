"use client";

import { useFetch } from "@/utils/hooks/useFetch";
import { useAppSelector } from "@/redux/reduxHooks";
import { selectCreateProduct } from "@/redux/products/productsSlice";
import CreateEditProduct from "../components/CreateEditProduct";

export default function CreateProductMainContent({
  categories,
}: {
  categories: string[];
}) {
  const createProductData = useAppSelector(selectCreateProduct);

  const { fetchData, data, error, loading } = useFetch({
    url: "/api/v1/products/create/",
    method: "post",
    body: createProductData,
    withCredentials: true,
    withToken: true,
  });

  return (
    <div className="w-10/12 m-auto flex flex-col gap-8 my-8">
      <h1 className="header-5sb primary-color">Create Product</h1>
      <div>
        <CreateEditProduct
          categories={categories}
          fetchData={fetchData}
          error={error}
          data={data}
          loading={loading}
          state="create"
        />
      </div>
    </div>
  );
}
