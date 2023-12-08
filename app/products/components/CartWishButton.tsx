import cartIcon from "@/public/assets/products/cart.svg";
import wishListIcon from "@/public/assets/products/wishlist.svg";
import Image from "next/image";
export default function CartWishButton({
  type,
}: {
  type: "cart" | "wishlist";
}) {
  if (type == "cart") {
    return (
      <button
        className="flex flex-row gap-1 justify-center main-yellow-background-color 
    py-3 primary-color rounded-md w-full hover:opacity-90 hover:-translate-y-1 duration-150"
      >
        <span>Add to cart </span>{" "}
        <Image src={cartIcon} alt="placeholder" width={26} height={26} />
      </button>
    );
  } else {
    return (
      <button
        className="flex flex-row gap-1 justify-center primary-background-color
    py-3 text-white rounded-md w-full hover:opacity-90 hover:-translate-y-1 duration-150"
      >
        <span>Add to wishlist </span>{" "}
        <Image src={wishListIcon} alt="placeholder" width={26} height={26} />
      </button>
    );
  }
}
