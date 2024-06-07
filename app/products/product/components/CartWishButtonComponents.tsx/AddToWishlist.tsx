"use client";

import Image from "next/image";
import { useFetch } from "@/utils/hooks/useFetch";
import ReactLoading from "react-loading";
import { FaCheck } from "react-icons/fa";
import wishListIcon from "@/public/assets/products/wishlist.svg";
import { useAppSelector } from "@/redux/reduxHooks";

export function AddToWishlist({
  productId,
  color,
}: {
  productId: string;
  color?: "first" | "second";
}) {
  const userAuthenticated = useAppSelector(
    (state) => state.user.isAuthenticated
  );
  let { fetchData, loading, error, data } = useFetch({
    url: "/api/v1/wishlist/",
    method: "post",
    withToken: true,
    withCredentials: true,
    body: {
      productId: productId,
    },
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await fetchData();
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        className={`flex flex-row gap-1 justify-center ${
          color != "second"
            ? "main-yellow-background-color primary-color"
            : "primary-background-color text-white "
        }
    py-3  rounded-md w-full hover:opacity-90 hover:-translate-y-1 duration-150 `}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {loading ? (
          <ReactLoading
            type="bubbles"
            width={30}
            height={30}
            color={color == "first" ? "#28242D" : "white"}
          />
        ) : data ? (
          <>
            <span className="text-2sb">Added to Wishlist</span>
            <div
              className="text-1sb"
              style={{ filter: color != "second" ? "invert(1)" : "" }}
            >
              <FaCheck />
            </div>
          </>
        ) : error ? (
          <>
            <span
              className={`text-3sb text-center self-center ${
                color == "first" ? "primary-color" : "text-white"
              }`}
            >
              {error.message ? error.message : "Error while adding product"}
            </span>
            <Image
              src={wishListIcon}
              alt="check"
              width={30}
              height={30}
              style={{ filter: color != "second" ? "invert(1)" : "" }}
            />
          </>
        ) : (
          <>
            <span className="text-3sb">Add to Wishlist</span>
            <Image
              src={wishListIcon}
              alt="cart"
              width={30}
              height={30}
              style={{ filter: color != "second" ? "invert(1)" : "" }}
            />
          </>
        )}
      </button>
    </form>
  );
}
