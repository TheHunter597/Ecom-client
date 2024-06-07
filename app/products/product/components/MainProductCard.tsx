import Image from "next/image";
import RatingStars from "./RatingStars";
import { AddToWishlist } from "./CartWishButtonComponents.tsx/AddToWishlist";
import TagsResult from "./TagsResult";
import { useAppSelector } from "@/redux/reduxHooks";
import { IProduct } from "@/utils/types";

export default function MainProductCard({
  title,
  price,
  description,
  image,
  id,
  tags,
  rating,
  discount,
  creator,
}: IProduct) {
  ///////////////////
  if (title.length > 30) {
    title = title.slice(0, 30) + "...";
  }
  if (description.length > 80) {
    description = description.slice(0, 80) + "...";
  }
  const currentUserId = useAppSelector((state) => state.user.userData.id);

  return (
    <div className="flex flex-col w-80 rounded-lg cursor-pointer shadow-md h-fit">
      <div className="h-52">
        <Image
          src={image}
          alt="placeholder"
          width={400}
          height={400}
          className="productCardImage bg-white rounded-md"
        />
      </div>
      <div
        className="flex flex-col justify-between px-4 h-fit -mt-3  p-3 text-white
       rounded-lg z-10  primary-background-color"
      >
        <div className="h-full flex flex-col gap-2">
          <div className="header-6sb h-12 flex flex-col justify-center ">
            <h4>{title} </h4>
          </div>
          <div className="flex flex-col gap-1 h-24">
            <div className="flex flex-row">
              <RatingStars rating={rating} title={title} size={20} />(
              {rating.toFixed(2)} of 5)
            </div>
            <div className="flex flex-wrap gap-1">
              <TagsResult tags={tags} title={title} />
            </div>
          </div>
          <div className="h-20">
            <p>{description}</p>
          </div>
          <div className="flex flex-row gap-1 justify-center align-middle items-center">
            <div className="MainProductCardLine bg-white w-full"></div>
            <div className="relative">
              {discount != 0 && (
                <div className="absolute right-0 -top-5  text-red-400 text-2sb line-through flex flex-row gap-1">
                  <span>${price}</span>
                </div>
              )}
              <div className="header-6sb">
                {((price * (100 - discount)) / 100).toFixed(2)}$
                {discount != 0 && (
                  <span className="text-4sb text-red-400">({discount}%)</span>
                )}
              </div>
            </div>
            <div className="MainProductCardLine bg-white w-full"></div>
          </div>
        </div>
        {(creator == null || creator.id != currentUserId) && (
          <div>
            <AddToWishlist productId={id} />
          </div>
        )}
      </div>
    </div>
  );
}
