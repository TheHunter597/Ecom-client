import { incrementQuantity } from "@/redux/cart/cart";
import { useAppDispatch } from "@/redux/reduxHooks";
import { useFetch } from "@/utils/hooks/useFetch";
import Image from "next/image";
import PlusIcon from "@/public/assets/others/plus.svg";
import { useDebouncedCallback } from "use-debounce";
export default function CartProductAddQuantity({
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
      quantity,
    },
  });
  let debounced = useDebouncedCallback(fetchData, 1000);

  return (
    <div
      className="p-1  rounded-md bg-blue-whale cursor-pointer hover:scale-105 duration-300"
      onClick={() => {
        dispatch(incrementQuantity(id));
        debounced();
      }}
    >
      <Image
        src={PlusIcon}
        width={19}
        height={19}
        alt="plus icon"
        // className="w-4 md:w-6 h-4 md:h-6"
      />
    </div>
  );
}
