import { useState } from "react";
import ProductName from "./elements/ProductTitle";
import Tags from "./elements/Tags";
import ProductPrice from "./elements/ProductPrice";
import ProductColor from "./elements/ProductColor";
import ProductSize from "./elements/ProductSize";
import ProductDescriptionFeatures from "./elements/ProductDescription";
import ProductCategory from "./elements/category/ProductCategory";
import ProductCountInStock from "./elements/ProductCountInStock";

export default function FormMainContent({
  error,
  categories,
  state,
}: {
  error: any;
  categories: string[];
  state: "edit" | "create";
}) {
  let [currentActiveInput, setCurrentActiveInput] = useState(null);

  return (
    <div className="flex flex-col gap-4 col-start-7 col-end-12">
      <ProductName
        currentActiveInput={currentActiveInput}
        setCurrentActiveInput={setCurrentActiveInput}
        error={error}
        state={state}
      />
      <Tags
        currentActiveInput={currentActiveInput}
        setCurrentActiveInput={setCurrentActiveInput}
        error={error}
        state={state}
      />
      <ProductPrice
        currentActiveInput={currentActiveInput}
        setCurrentActiveInput={setCurrentActiveInput}
        error={error}
        state={state}
      />
      <ProductColor
        currentActiveInput={currentActiveInput}
        setCurrentActiveInput={setCurrentActiveInput}
        error={error}
        state={state}
      />
      <ProductSize
        currentActiveInput={currentActiveInput}
        setCurrentActiveInput={setCurrentActiveInput}
        error={error}
        state={state}
      />
      <ProductDescriptionFeatures
        currentActiveInput={currentActiveInput}
        setCurrentActiveInput={setCurrentActiveInput}
        error={error}
        state={state}
      />
      <ProductCategory cateogires={categories} state={state} error={error} />
      <ProductCountInStock
        currentActiveInput={currentActiveInput}
        setCurrentActiveInput={setCurrentActiveInput}
        error={error}
        state={state}
      />
    </div>
  );
}
