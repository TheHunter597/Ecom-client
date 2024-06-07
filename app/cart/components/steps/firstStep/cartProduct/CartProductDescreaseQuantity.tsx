import { decreaseQuantity } from "@/redux/cart/cart";
import { useAppDispatch } from "@/redux/reduxHooks";
import { useFetch } from "@/utils/hooks/useFetch";
import Image from "next/image";
import MinusIcon from "@/public/assets/others/minus.svg";
import { useDebouncedCallback } from "use-debounce";
export default function CartProductDescreaseQuantity({
  id,
  quantity,
}: {
  id: string;
  quantity: any;
}) {
  let dispatch = useAppDispatch();
  let { fetchData, data, error } = useFetch({
    url: `/api/v1/cart/${id}/`,
    method: "put",
    withCredentials: true,
    withToken: true,
    body: {
      quantity: quantity,
    },
  });
  let debounced = useDebouncedCallback(fetchData, 1000);
  return (
    <div
      className="p-1  rounded-md bg-blue-whale cursor-pointer hover:scale-105 duration-300"
      onClick={async () => {
        dispatch(decreaseQuantity(id));
        debounced();
      }}
    >
      <Image src={MinusIcon} width={19} height={19} alt="minus icon" />
    </div>
  );
}
