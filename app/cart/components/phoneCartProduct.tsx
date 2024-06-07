import { ICartItem } from "@/utils/types";
import Image from "next/image";
import CartProductDescreaseQuantity from "./steps/firstStep/cartProduct/CartProductDescreaseQuantity";
import CartProductAddQuantity from "./steps/firstStep/cartProduct/CartProductAddQuantity";
import { useAppSelector } from "@/redux/reduxHooks";
import { currentQuantity as currentQuantityRedux } from "@/redux/cart/cart";
import RemoveProductFromCartButton from "@/app/products/product/components/CartWishButtonComponents.tsx/RemoveProductFromCartButton";
export default function PhoneCartProduct({
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
    <div className="flex flex-col shadow-md rounded-md h-full py-1">
      <div className="w-11/12 mx-auto flex flex-col justify-between gap-5 h-full">
        <div className="flex flex-col gap-4 items-center">
          <Image src={image} width={200} height={200} alt="phone" />
          <h5 className="header-6sb secondary-color">{title}</h5>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 text-3sb primary-color">
            <div className="flex flex-row justify-between relative">
              <span className="text-3sb primary-color">Quantity: </span>
              <span className="text-3sb primary-color flex flex-row gap-1 items-center">
                <div className="flex flex-row gap-2">
                  <CartProductDescreaseQuantity
                    id={id}
                    quantity={currentQuantity}
                  />
                  <CartProductAddQuantity id={id} quantity={currentQuantity} />
                </div>
                {quantity}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="text-3sb primary-color">Color: </span>
              <span
                className="text-3sb primary-color"
                style={{ color: color.hex }}
              >
                {color.name}
              </span>
            </div>
            {size && (
              <div className="flex flex-row justify-between">
                <span className="text-3sb primary-color">Size: </span>
                <span className="text-3sb primary-color">{size.name}</span>
              </div>
            )}
            <div className="flex flex-row justify-between">
              <span className="text-3sb primary-color">Price: </span>
              <span className="text-3sb primary-color">${price}</span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="text-3sb primary-color">Total: </span>
              <span className="text-3sb primary-color">
                ${quantity * price}
              </span>
            </div>
          </div>
          <RemoveProductFromCartButton productId={id} />
        </div>
      </div>
    </div>
  );
}
