import { IProduct } from "@/utils/types";
import Image from "next/image";
import TagElement from "../../components/TagElement";
import { randomBytes } from "crypto";
import RatingStars from "../../components/RatingStars";
import DescrptionFeatures from "../components/DescriptionFeatures";
import ColorsSizes from "../components/ColorsSizes";
import CartWishButton from "../../components/CartWishButton";

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
    rating,
    reviews,
  },
}: {
  product: IProduct;
}) {
  let tagsResult = tags.map((tag) => (
    <TagElement
      key={`${randomBytes(5).toString("hex")}-${tag}`}
      name={tag}
      size="text-4sb"
    />
  ));
  return (
    <div className="grid grid-cols-2 gap-6 w-11/12 m-auto mt-12">
      <div className="col-span-1 relative rounded-md">
        <Image
          src={image}
          alt="product-image"
          width={700}
          height={600}
          quality={100}
          className="sticky top-10 product-image"
        />
      </div>
      <div className="col-span-1 flex flex-col gap-6 w-10/12">
        <div className="flex flex-col gap-6 ">
          <h3 className="desktop-3sb text-dark">{title}</h3>
          <div className="flex flex-wrap gap-1 w-9/12">{tagsResult}</div>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="tertiary-color desktop-4sb">
            Current price: ${price.toFixed(2)}
          </h5>
          <div className="flex flex-row">
            <RatingStars rating={rating} title={title} size={24} />
            {rating.toFixed(2)}({reviews.length})
          </div>
        </div>
        <DescrptionFeatures
          description={description}
          features={features}
          UpdateDate={updatedAt}
          creationDate={createdAt}
        />
        <ColorsSizes sizes={sizes} colors={colors} />
        <div className="flex flex-col gap-3">
          <CartWishButton type="cart" />
          <CartWishButton type="wishlist" />
        </div>
      </div>
    </div>
  );
}
