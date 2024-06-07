interface DescrptionFeaturesHeaderProps {
  productInfo: string;
  setProductInfo: Function;
}

export default function DescrptionFeaturesHeader({
  productInfo,
  setProductInfo,
}: DescrptionFeaturesHeaderProps) {
  return (
    <div className="flex flex-row gap-4 text-2sb">
      <h5
        onClick={() => setProductInfo("description")}
        className={`cursor-pointer duration-300  ${
          productInfo == "description"
            ? "text-dark desFeatures"
            : "text-gray desFeatures-inactive"
        }`}
      >
        Description
      </h5>
      <h5
        onClick={() => setProductInfo("features")}
        className={`cursor-pointer duration-150 ${
          productInfo == "features"
            ? "text-dark desFeatures"
            : "text-gray desFeatures-inactive"
        }`}
      >
        Features
      </h5>
    </div>
  );
}
