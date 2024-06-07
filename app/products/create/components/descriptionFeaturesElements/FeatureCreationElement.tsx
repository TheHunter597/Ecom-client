import Input from "@/app/auth/signup/components/input";
import Feature from "@/app/products/product/components/Feature";
import {
  addEditProductFeature,
  selectEditProduct,
  selectEditProductCurrents,
  setEditCurrentFeatureDescription,
  setEditCurrentFeatureName,
} from "@/redux/products/editProductSlice";
import {
  addProductFeature,
  selectCreateProduct,
  selectCreateProductCurrents,
  setCurrentFeatureDescription,
  setCurrentFeatureName,
} from "@/redux/products/productsSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { randomBytes } from "crypto";
import { useDispatch } from "react-redux";
interface FeatureCreationElementProps {
  currentActiveInput: string | null;
  setCurrentActiveInput: Function;
  error: any;
  state: "edit" | "create";
}
export default function FeatureCreationElement({
  currentActiveInput,
  setCurrentActiveInput,
  error,
  state,
}: FeatureCreationElementProps) {
  const { features } = useAppSelector(
    state === "edit" ? selectEditProduct : selectCreateProduct
  );
  const { currentFeatureName, currentFeatureDescription } = useAppSelector(
    state === "edit" ? selectEditProductCurrents : selectCreateProductCurrents
  );
  const dispatch = useDispatch();
  const featuresResult = features.map((feature, index) => {
    return (
      <Feature
        feature={feature}
        key={`${feature.name}-${randomBytes(4).toString("hex")}`}
        length={features.length}
        index={index}
      />
    );
  });
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">{featuresResult}</div>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Feature name"
          name="feature name"
          type="text"
          value={currentFeatureName}
          changeFunc={
            state == "edit" ? setEditCurrentFeatureName : setCurrentFeatureName
          }
          properties={{ required: true, min: 2, max: 20 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.features}
        />
        <Input
          placeholder="Feature description"
          name="feature description"
          type="text"
          value={currentFeatureDescription}
          changeFunc={
            state == "edit"
              ? setEditCurrentFeatureDescription
              : setCurrentFeatureDescription
          }
          properties={{ required: true, min: 8, max: 100 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          // error={error?.errors?.email}
        />
        <button
          className="text-4sb primary-color p-3 main-yellow-background-color w-fit self-end "
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              state == "edit"
                ? addEditProductFeature({})
                : addProductFeature({})
            );
            dispatch(
              state == "edit"
                ? setEditCurrentFeatureName("")
                : setCurrentFeatureName("")
            );
            dispatch(
              state == "edit"
                ? setEditCurrentFeatureDescription("")
                : setCurrentFeatureDescription("")
            );
          }}
        >
          Add Feature
        </button>
      </div>
    </div>
  );
}
