import Input from "@/app/auth/signup/components/input";
import ColorElement from "@/app/products/product/[id]/components/ColorElement";
import {
  addEditProductColor,
  removeEditProductColor,
  selectEditProduct,
  selectEditProductCurrents,
  setEditCurrentColorHex,
  setEditCurrentColorName,
} from "@/redux/products/editProductSlice";
import {
  addProductColor,
  removeProductColor,
  selectCreateProduct,
  selectCreateProductCurrents,
  setCurrentColorHex,
  setCurrentColorName,
} from "@/redux/products/productsSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { useDispatch } from "react-redux";
interface ProductColorProps {
  currentActiveInput: string | null;
  setCurrentActiveInput: Function;
  error: any;
  state: "edit" | "create";
}
export default function ProductColor({
  currentActiveInput,
  setCurrentActiveInput,
  error,
  state,
}: ProductColorProps) {
  const { colors } = useAppSelector(
    state == "edit" ? selectEditProduct : selectCreateProduct
  );
  const { currentColorName, currentColorHex } = useAppSelector(
    state == "edit" ? selectEditProductCurrents : selectCreateProductCurrents
  );

  const dispatch = useDispatch();
  const colorsResult = colors.map((color) => {
    return (
      <div
        className="cursor-pointer"
        onClick={() => {
          dispatch(
            state == "edit"
              ? removeEditProductColor(color.hex)
              : removeProductColor(color.hex)
          );
        }}
        key={`CreateProductColors-${color.hex}-${color.name}}`}
      >
        <ColorElement color={color} key={`CreateProductColors-${color.hex}}`} />
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-2">{colorsResult}</div>
      <div className="flex flex-col gap-6">
        <Input
          placeholder="Color name"
          name="Color name"
          type="text"
          value={currentColorName}
          changeFunc={
            state == "edit" ? setEditCurrentColorName : setCurrentColorName
          }
          properties={{ required: false, min: 8, max: 30 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.colors}
        />
        <Input
          placeholder="Hex decimal value"
          name="Hex decimal value"
          type="text"
          value={currentColorHex}
          changeFunc={
            state == "edit" ? setEditCurrentColorHex : setCurrentColorHex
          }
          properties={{ required: false, min: 3, max: 7 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          // error={error?.errors?.email}
        />
        <button
          className="text-4sb primary-color p-3 main-yellow-background-color w-fit self-end"
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              state == "edit" ? addEditProductColor({}) : addProductColor({})
            );
          }}
        >
          Add Color
        </button>
      </div>
    </div>
  );
}
