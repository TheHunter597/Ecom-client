import { IOrder } from "@/utils/types";
import Image from "next/image";
export default function SimpleOrderElement({ order }: { order: IOrder }) {
  return (
    <div
      className="p-4 rounded-lg h-full bg-white flex flex-col items-center justify-center gap-4 w-80 shadow-xl
     cursor-pointer"
    >
      <Image
        width={0}
        height={0}
        sizes="20we"
        style={{ height: "16rem", width: "16rem" }}
        src={order.product.image}
        alt={order.product.title}
      />
      <div className="flex flex-col justify-between gap-4 w-full h-full">
        <h5 className="text-2sb primary-color break-all">
          {order.product.title.slice(0, 80)}
        </h5>
        <div className="flex flex-col gap-2 text-3sb">
          {order.color && (
            <div className="flex flex-row w-full justify-between">
              <span>Color</span>
              <span className="secondary-color">{order.color}</span>
            </div>
          )}
          {order.size && (
            <div className="flex flex-row w-full justify-between">
              <span>Size</span>
              <span className="secondary-color">{order.size}</span>
            </div>
          )}

          <div className="flex flex-row w-full justify-between">
            <span>Quantity</span>
            <span className="secondary-color">{order.quantity}</span>
          </div>
          <div className="flex flex-row w-full justify-between">
            <span>Total price</span>
            <span className="secondary-color">
              $
              {Number(
                Number(order.product.price) * Number(order.quantity)
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
