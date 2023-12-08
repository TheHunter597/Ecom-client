"use client";
import { IReview } from "@/utils/types";
import Image from "next/image";
import NoAvatarIcon from "@/public/assets/others/NoAvatar.svg";
import RatingStars from "../../../components/RatingStars";
import ThumbsUpIcon from "@/public/assets/products/thumbsUp.svg";
import ThumbsUpIconFilled from "@/public/assets/products/thumbsUpFilled.svg";
import ThumbsDownIcon from "@/public/assets/products/thumbsDown.svg";
import ThumbsDownIconFilled from "@/public/assets/products/thumbsDownFilled.svg";
import { randomBytes } from "crypto";
import { useState } from "react";
export default function ReviewElement({
  review: {
    rating,
    product,
    updatedAt,
    image,
    createdAt,
    review,
    creator: { avatar, first_name, last_name, email },
  },
}: {
  review: IReview;
}) {
  let [thumbs, setThumbs] = useState<string | null>(null);
  let date = new Date(createdAt).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let UserName: string;
  if (first_name && last_name) {
    UserName = `${first_name} ${last_name}`;
  } else {
    UserName = email;
  }
  return (
    <div
      className="flex flex-col gap-4 border-b-2 pb-3 gray-400"
      key={`${randomBytes(5).toString("hex")}-review`}
    >
      <div className="flex flex-row gap-1">
        <div>
          <Image src={avatar ? avatar : NoAvatarIcon} alt="User avatar" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm primary-color text-3sb">{`${UserName}`}</p>
          <div className="flex flex-row primary-color">
            <span className="text-4sb">({rating})</span>
            <RatingStars
              rating={rating}
              title={review}
              size={20}
              key={`${randomBytes(5).toString("hex")}-review-rating`}
            />
          </div>
          <p className="text-gray text-tinysb">Review created at : {date}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-4 pl-6">
        <div className="flex flex-col gap-4 pl-6">
          <p className="lighter-black text-3r">{review}</p>
          {image && (
            <div className="flex flex-row items-center justify-center gap-3">
              {" "}
              <span className="secondary-color text-4sb">
                User provided images
              </span>{" "}
              <Image
                src={image}
                alt="User provided image"
                width={50}
                height={50}
                className="cursor-pointer hover:scale-110 transition-opacity duration-500"
              />
            </div>
          )}
        </div>
        <div className="flex flex-row gap-2 items-end justify-end">
          <p className="text-3sb tertiary-color">Was this review helpful ? </p>
          <div className="flex flex-row gap-1">
            {thumbs != "up" ? (
              <Image
                src={ThumbsUpIcon}
                alt="thumbs up"
                width={30}
                height={30}
                onClick={() => setThumbs("up")}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
              />
            ) : (
              <Image
                src={ThumbsUpIconFilled}
                alt="thumbs up filled"
                width={30}
                height={30}
                onClick={() => setThumbs(null)}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
              />
            )}
            {thumbs != "down" ? (
              <Image
                src={ThumbsDownIcon}
                alt="thumbs down"
                width={30}
                height={30}
                onClick={() => setThumbs("down")}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-300  "
              />
            ) : (
              <Image
                src={ThumbsDownIconFilled}
                alt="thumbs down"
                width={30}
                height={30}
                onClick={() => setThumbs(null)}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-300  "
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
