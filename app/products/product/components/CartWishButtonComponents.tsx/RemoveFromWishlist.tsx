"use client";

import Image from "next/image";
import ReactLoading from "react-loading";
import wishListIcon from "@/public/assets/products/wishlist.svg";
import { useAppSelector } from "@/redux/reduxHooks";
import { useFetch } from "@/utils/hooks/useFetch";
import DeleteIcon from "@/public/assets/products/DeleteProduct.svg";
import CorrectIcon from "@/public/assets/products/correct.svg";
export default function RemoveFromWishList({
  cartElementToDelete,
}: {
  cartElementToDelete: string;
}) {
  const userAuthenticated = useAppSelector(
    (state) => state.user.isAuthenticated
  );
  let { fetchData, loading, error, data } = useFetch({
    url: "/api/v1/wishlist/" + cartElementToDelete,
    method: "delete",
    withToken: true,
    withCredentials: true,
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (userAuthenticated) {
          await fetchData();
          return;
        }
      }}
    >
      <button
        className="flex flex-row gap-1 justify-center  items-center bg-red-400 text-white
    py-3 primary-color rounded-md w-full hover:opacity-90 hover:-translate-y-1 duration-150"
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
              {error.message ? error.message : "Error while adding product"}
            </span>
            <Image src={wishListIcon} alt="check" width={30} height={30} />
          </>
        ) : (
          <>
            <span className="text-2sb">Remove from Wishlist</span>
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
