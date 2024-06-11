"use client";
import { IProduct } from "@/utils/types";
import Image from "next/image";
import TagsResult from "../product/components/TagsResult";
import RatingStars from "../product/components/RatingStars";
import { useRouter } from "next/navigation";
import { AddToWishlist } from "../product/components/CartWishButtonComponents.tsx/AddToWishlist";
import RemoveFromWishList from "../product/components/CartWishButtonComponents.tsx/RemoveFromWishlist";
import AddToCart from "../product/components/CartWishButtonComponents.tsx/AddToCart";

export default function ResultProduct({
  product,
  button = "add",
  cartElementToDelete,
}: {
  product: IProduct;
  button?: "add" | "remove";
  cartElementToDelete?: string;
}) {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center mx-auto sm:mx-0 sm:grid sm:grid-cols-12 gap-8 cursor-pointer"
      onClick={(e) => {
        router.push(`/products/product/${product.id}`);
      }}
    >
      <div className=" col-span-4">
        <Image
          src={product.image}
          width={0}
          height={0}
          alt={product.title}
          sizes="16rem"
          style={{ height: "16rem", width: "16rem" }}
        />
      </div>
      <div className="flex flex-col  gap-6 justify-between sm:col-span-8">
        <div className="flex flex-col gap-4">
          <h5 className="flex flex-col gap-1">
            <span className="sm:header-6sb text-2sb primary-color">
              {product.title}
            </span>
            <div className="text-1sb secondary-color">
              Price:{" "}
              {(
                (product.price * (100 - (product.discount || 0))) /
                100
              ).toFixed(2)}
              $
              <span className="text-4sb text-red-400">
                {product.discount ? `(discount ${product.discount}%)` : ""}
              </span>
            </div>
          </h5>
          {product.tags && (
            <TagsResult tags={product.tags} title={product.title} />
          )}
          <p className="text-3r">
            {product.description && product.description.slice(0, 300)}...
          </p>
          {product.rating && (
            <div className="flex flex-row gap-1 ">
              <RatingStars
                rating={product.rating}
                title={product.title}
                size={20}
              />
              ({product.rating.toFixed(2)} of 5)
            </div>
          )}
        </div>
        <div>
          {button && button == "remove" && cartElementToDelete ? (
            <RemoveFromWishList cartElementToDelete={cartElementToDelete} />
          ) : (
            <AddToWishlist productId={product.id} />
          )}
        </div>
      </div>
    </div>
  );
}
