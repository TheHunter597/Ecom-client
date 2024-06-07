import { useState } from "react";
import DescriptionElement from "../descriptionFeaturesElements/DescriptionElement";
import FeatureCreationElement from "../descriptionFeaturesElements/FeatureCreationElement";
import DescrptionFeaturesHeader from "@/app/products/product/[id]/components/DescriptionFeaturesHeader";
interface ProductDescriptionFeaturesProps {
  currentActiveInput: string | null;
  setCurrentActiveInput: Function;
  error: any;
  state: "edit" | "create";
}

export default function ProductDescriptionFeatures({
  currentActiveInput,
  setCurrentActiveInput,
  error,
  state,
}: ProductDescriptionFeaturesProps) {
  let [productInfo, setProductInfo] = useState("description");

  return (
    <div className="flex flex-col gap-8">
      <DescrptionFeaturesHeader
        productInfo={productInfo}
        setProductInfo={setProductInfo}
      />
      {productInfo === "description" ? (
        <DescriptionElement error={error} state={state} />
      ) : (
        <FeatureCreationElement
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error}
          state={state}
        />
      )}
    </div>
  );
}
