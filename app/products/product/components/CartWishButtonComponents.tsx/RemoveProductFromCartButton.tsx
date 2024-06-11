"use client";
import Image from "next/image";
import ReactLoading from "react-loading";
import wishListIcon from "@/public/assets/products/wishlist.svg";
import { useFetch } from "@/utils/hooks/useFetch";
import DeleteIcon from "@/public/assets/products/DeleteProduct.svg";
import CorrectIcon from "@/public/assets/products/correct.svg";
import { removeFromCart } from "@/redux/cart/cart";
import { useDispatch } from "react-redux";

export default function RemoveProductFromCartButton({
  productId,
}: {
  productId: string;
}) {
  let { fetchData, loading, error, data } = useFetch({
    url: "/api/v1/cart/" + productId,
    method: "delete",
    withToken: true,
    withCredentials: true,
  });
  const dispatch = useDispatch();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await fetchData();
        dispatch(removeFromCart({ id: productId }));
      }}
    >
      <button
        className="flex flex-row gap-1 justify-center items-center border border-red-400
         bg-red-400 text-white hover:bg-white hover:text-red-400 
    py-3 primary-color rounded-md w-full hover:opacity-90 duration-150 InvertHoverButton"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {loading ? (
          <ReactLoading type="bubbles" width={30} height={30} color="#28242D" />
        ) : data ? (
          <>
            <span className="text-2sb">Removed product successfully</span>
            <Image
              src={CorrectIcon}
              alt="correctly removed icon "
              width={32}
              height={32}
            />
          </>
        ) : error ? (
          <>
            <span className="text-3sb text-center self-center text-black">
              {error.message ? error.message : "Error while Removing product"}
            </span>
            <Image src={wishListIcon} alt="check" width={30} height={30} />
          </>
        ) : (
          <>
            <span className="text-2sb">Remove from Cart</span>
            <Image
              src={DeleteIcon}
              alt="remove-element-con"
              width={32}
              height={32}
            />
          </>
        )}
      </button>
    </form>
  );
}
