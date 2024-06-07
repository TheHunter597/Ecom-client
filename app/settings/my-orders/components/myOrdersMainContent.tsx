"use client";
import SlideableElement from "@/app/components/others/SlideableElement";
import { IOrder } from "@/utils/types";
import { useRouter } from "next/navigation";
import MakeSlider from "@/app/components/others/MakeSlider";
import SimpleOrderElement from "./SimpleOrderElement";

export default function MyOrdersMainContent({ orders }: { orders: IOrder[] }) {
  const router = useRouter();
  const ordersResult = orders.map((order: IOrder) => {
    return (
      <SlideableElement
        key={`Myorder-${order.id}`}
        functionToRun={() => {
          router.push(`/products/product/${order.product.id}`);
        }}
      >
        <SimpleOrderElement order={order} />
      </SlideableElement>
    );
  });
  return <MakeSlider>{ordersResult}</MakeSlider>;
}
