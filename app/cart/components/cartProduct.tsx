import Image from "next/image";
import { useAppSelector } from "@/redux/reduxHooks";

import { ICartItem } from "@/utils/types";
import CartProductAddQuantity from "./steps/firstStep/cartProduct/CartProductAddQuantity";
import CartProductDescreaseQuantity from "./steps/firstStep/cartProduct/CartProductDescreaseQuantity";
import { currentQuantity as currentQuantityRedux } from "@/redux/cart/cart";
import ColorElement from "@/app/products/product/[id]/components/ColorElement";
import SizeElement from "@/app/products/product/[id]/components/SizeElement";
export default function CartProduct({
  productData: {
    quantity,
    product: { title, price, image },
    id,
    color,
    size,
  },
}: {
  productData: ICartItem;
}) {
  let currentQuantity = useAppSelector(currentQuantityRedux(id));

  return (
    <div
      className="grid grid-cols-12 place-content-center shadow-xl p-2 rounded-md border-2
     border-gray-50 bg-gray-50"
    >
      <div className="col-span-7 flex flex-row gap-2 items-center  ">
        <Image
          src={image}
          width={200}
          height={200}
          alt="product image"
          className="rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h6 className="text-4sb primary-color border-b-2 border-gray-600 pb-1">
            {title.slice(0, 68)}
            {title.length > 100 ? "..." : ""}
          </h6>
          <div className="flex flex-col gap-2">
            {color && (
              <span className="text-4sb primary-color flex flex-row gap-1">
                Color: <span style={{ color: color.hex }}>{color.name}</span>
                <ColorElement
                  color={color}
                  elementSize={{
                    type: "small",
                    rightIconSize: 18,
                  }}
                />
              </span>
            )}
            {size && (
              <span className="text-4sb primary-color flex flex-row gap-1">
                Size: <span className="secondary-color">{size.name}</span>
                <SizeElement size={size} />
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-3 flex flex-row gap-4 items-center justify-center">
        <CartProductDescreaseQuantity id={id} quantity={currentQuantity} />
        <p className="text-2sb primary-color h-fit">{currentQuantity}</p>
        <CartProductAddQuantity id={id} quantity={currentQuantity} />
      </div>
      <div className="col-span-2 desktop-4sb secondary-color self-center text-center">
        ${(price * quantity).toFixed(2)}
      </div>
    </div>
  );
}
