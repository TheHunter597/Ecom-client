import Image from "next/image";
import TagElement from "./TagElement";
import AddToCartButton from "./CartWishButton";
import Link from "next/link";
import { randomBytes } from "crypto";
import RatingStars from "./RatingStars";

interface ProductProps {
  title: string;
  rating: number;
  tags: string[];
  description: string;
  price: number;
  id: string;
  image: any;
}

export default function MainProductCard({
  title,
  price,
  description,
  image,
  id,
  tags,
  rating,
}: ProductProps) {
  ///////////////////
  let TagsResults = [];
  for (let index = 0; index < Math.min(3, tags.length); index++) {
    TagsResults.push(
      <TagElement name={tags[index]} key={`tags-${title}-${index}`} />
    );
  }

  if (tags.length > 4) {
    TagsResults.push(<TagElement name="And more" key={`tags-${title}-more`} />);
  }
  ///////////////////
  if (title.length > 30) {
    title = title.slice(0, 30) + "...";
  }
  if (description.length > 80) {
    description = description.slice(0, 80) + "...";
  }
  ///////////////////

  return (
    <div className="flex flex-col w-80 MainProductCard rounded-lg">
      <Image src={image} alt="placeholder" width={400} height={400} />
      <div
        className="flex flex-col justify-between px-4 h-fit -mt-7  p-3 text-white
       rounded-lg z-10  primary-background-color"
      >
        <Link href={`/products/${id}`} className="h-full flex flex-col gap-2">
          <div className="header-6sb h-12 flex flex-col justify-center ">
            <h4>{title} </h4>
          </div>
          <div className="flex flex-col gap-1 h-24">
            <div className="flex flex-row">
              <RatingStars rating={rating} title={title} size={20} />(
              {rating.toFixed(2)} of 5)
            </div>
            <div className="flex flex-wrap gap-1">{TagsResults}</div>
          </div>
          <div className="h-20">
            <p>{description}</p>
          </div>
          <div className="flex flex-row gap-1 justify-center align-middle items-center">
            <div className="MainProductCardLine bg-white w-full"></div>
            <div className="header-6sb">{price}$</div>
            <div className="MainProductCardLine bg-white w-full"></div>
          </div>
        </Link>
        <div>
          <AddToCartButton type="cart" />
        </div>
      </div>
    </div>
  );
}
