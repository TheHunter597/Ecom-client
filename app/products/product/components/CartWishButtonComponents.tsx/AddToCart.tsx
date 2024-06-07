"use client";

import { useFetch } from "@/utils/hooks/useFetch";
import Image from "next/image";
import cartIcon from "@/public/assets/products/cart.svg";
import ReactLoading from "react-loading";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cart";
import { useAppSelector } from "@/redux/reduxHooks";
export default function AddToCart({
  product: { id, color, size },
}: {
  product: {
    color: string;
    size: string;
    id: string;
  };
}) {
  const dispatch = useDispatch();
  const userAuthenticated = useAppSelector(
    (state) => state.user.isAuthenticated
  );
  let { fetchData, loading, data, error } = useFetch({
    url: "/api/v1/cart/",
    method: "post",
    withToken: true,
    withCredentials: true,
    body: {
      productId: id,
      quantity: 1,
      color,
      size,
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const added = await fetchData();
        if (userAuthenticated && added)
          dispatch(addToCart({ id, color, size }));
      }}
      className="w-full"
    >
      <button
        className="flex flex-row  justify-center items-center gap-3 main-yellow-background-color 
    py-3 primary-color rounded-md w-full hover:opacity-90 hover:-translate-y-1 duration-150"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {loading ? (
          <ReactLoading type="bubbles" width={30} height={30} color="#28242D" />
        ) : data ? (
          <>
            <span className="text-2sb">Added to cart</span>
            <div className="text-1sb">
              <FaCheck />
            </div>
          </>
        ) : error ? (
          <>
            <span className="text-3sb text-center self-center">
              {error.message ? error.message : "Error while adding product"}
            </span>
            <Image src={cartIcon} alt="check" width={30} height={30} />
          </>
        ) : (
          <>
            <span className="text-2sb">Add to cart</span>
            <Image src={cartIcon} alt="cart" width={30} height={30} />
          </>
        )}
      </button>
    </form>
  );
}
