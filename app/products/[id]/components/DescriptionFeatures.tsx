"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Feature from "../../components/Feature";
import { randomBytes } from "crypto";
export default function DescrptionFeatures({
  description,
  features,
  creationDate,
  UpdateDate,
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
      <div>
        <Feature
          feature={feature}
          index={index}
          length={features.length}
          key={`${feature.name}-${randomBytes(4).toString("hex")}`}
        />
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4 text-2sb">
        <h5
          onClick={() => setProductInfo("description")}
          className={`cursor-pointer duration-300  ${
            productInfo == "description" ? "text-dark desFeatures" : "text-gray"
          }`}
        >
          Description
        </h5>
        <h5
          onClick={() => setProductInfo("features")}
          className={`cursor-pointer duration-150 ${
            productInfo == "features" ? "text-dark desFeatures" : "text-gray "
          }`}
        >
          Features
        </h5>
      </div>
      <div className="w-10/12 primary-color text-2r flex flex-col gap-5">
        {productInfo == "description" ? description : featuresResult}
      </div>
    </div>
  );
}
