"use client";
import { useEffect } from "react";
import { useFetch } from "@/utils/hooks/useFetch";
import { IProduct } from "@/utils/types";
import ProductsResultWithFilter from "./components/ProductsResultWithFilter";

export default function SearchMainContent() {
  const url =
    typeof window != "undefined" ? window.location.href.split("?")[1] : "";
  const {
    fetchData,
    error,
    data,
  }: { data: { products: IProduct[] }; fetchData: Function; error: any } =
    useFetch({
      url: `/api/v1/products/?${url}`,
      method: "get",
    });
  useEffect(() => {
    async function handleLoad() {
      await fetchData();
    }
    handleLoad();
  }, []);

  return <ProductsResultWithFilter products={data ? data.products : []} />;
}
