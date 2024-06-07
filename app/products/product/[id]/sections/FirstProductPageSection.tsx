"use client";
import { IProduct, PreviewProduct } from "@/utils/types";
import Image from "next/image";
import TagElement from "../../components/TagElement";
import { randomBytes } from "crypto";
import RatingStars from "../../components/RatingStars";
import DescrptionFeatures from "../components/DescriptionFeatures";
import ColorsSizes from "../components/ColorsSizes";
import AddToCart from "../../components/CartWishButtonComponents.tsx/AddToCart";
import { useState } from "react";
import { AddToWishlist } from "../../components/CartWishButtonComponents.tsx/AddToWishlist";
import { useAppSelector } from "@/redux/reduxHooks";

export default function FirstProductPageSection({
  product: {
    image,
    title,
    description,
    createdAt,
    updatedAt,
    sizes,
    colors,
    features,
    tags,
    price,
    id,
    discount,
    creator,
    rating,
    reviews,
  },
  test,
}: {
  product: IProduct;
  test?: boolean;
}) {
  let [chosenColor, setChosenColor] = useState(
    colors
      ? colors[0]
      : {
          name: "",
          hex: "",
          id: "",
        }
  );
  let [chosenSize, setChosenSize] = useState<{
    name: string;
    abbreviation: string;
    id?: string;
  }>(
    sizes
      ? sizes[0]
      : {
          name: "",
          abbreviation: "",
        }
  );

  let tagsResult = tags.map((tag) => (
    <TagElement
      key={`${randomBytes(5).toString("hex")}-${tag}`}
      name={tag}
      size="text-4sb"
    />
  ));
  let cartProduct = {
    id,
    color: chosenColor.id ? chosenColor.id : "",
    size: chosenSize ? (chosenSize.id ? chosenSize.id : "") : "",
  };
  const currentUserId = useAppSelector((state) => state.user.userData.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-11 gap-6 w-11/12 m-auto mt-12">
      <div className="col-span-5 relative rounded-md">
        <Image
          src={image}
          alt="product-image"
          width={600}
          height={600}
          quality={100}
          className="sticky top-32 product-image"
        />
      </div>
      <div className="col-span-6 flex flex-col gap-8 w-11/12 m-auto sm:m-0 sm:w-10/12">
        <div className="flex flex-col gap-6">
          <h3 className="desktop-3sb text-dark">{title}</h3>
          <div className="flex flex-wrap gap-1 w-full sm:w-9/12">
            {tagsResult}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative text-red-400 w-fit">
            {discount != 0 && (
              <div className="absolute right-0 -top-5 text-2sb line-through flex flex-row gap-1">
                <span>${price}</span>
              </div>
            )}
            <div className="header-6sb">
              Price: {((price * (100 - discount)) / 100).toFixed(2)}$
              {discount != 0 && (
                <span className="text-4sb text-red-400">
                  (discount {discount}%)
                </span>
              )}
            </div>
          </div>
          {!test && (
            <div className="flex flex-row text-3sb primary-color items-center gap-1">
              {/* @ts-ignore */}
              <RatingStars rating={rating} title={title} size={24} />
              {/* @ts-ignore */}
              {rating.toFixed(2)}({reviews.length} reviews)
            </div>
          )}
        </div>
        <DescrptionFeatures
          description={description}
          features={features}
          UpdateDate={updatedAt}
          creationDate={createdAt}
        />
        <ColorsSizes
          sizes={sizes}
          colors={colors}
          chosenColor={chosenColor}
          setChosenColor={setChosenColor}
          chosenSize={chosenSize}
          setChosenSize={setChosenSize}
          productId={id}
        />
        {(!creator || creator.id != currentUserId) && (
          <div className="flex flex-col gap-3">
            {cartProduct.id && cartProduct.color ? (
              <AddToCart product={cartProduct} />
            ) : (
              ""
            )}
            <AddToWishlist productId={id} color="second" />
          </div>
        )}
      </div>
    </div>
  );
}
