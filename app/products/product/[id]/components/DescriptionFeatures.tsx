"use client";
import { useState } from "react";
import Feature from "../../components/Feature";
import { randomBytes } from "crypto";
import DescrptionFeaturesHeader from "./DescriptionFeaturesHeader";
export default function DescrptionFeatures({
  description,
  features,
}: {
  description: string;
  features: {
    name: string;
    description: string;
  }[];
  creationDate: string;
  UpdateDate: string;
}) {
  let [productInfo, setProductInfo] = useState("description");
  let featuresResult = features.map((feature, index) => {
    return (
      <Feature
        feature={feature}
        index={index}
        length={features.length}
        key={`${feature.name}-${randomBytes(4).toString("hex")}`}
      />
    );
  });
  return (
    <div className="flex flex-col gap-6  border-gray-700 border-b-2 pb-12">
      <DescrptionFeaturesHeader
        productInfo={productInfo}
        setProductInfo={setProductInfo}
      />
      <div className="w-12/12 sm:w-10/12 primary-color text-2r flex flex-col gap-3">
        {productInfo == "description" ? description : featuresResult}
      </div>
    </div>
  );
}
