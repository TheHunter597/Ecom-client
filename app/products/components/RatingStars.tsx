import FullStar from "@/public/assets/products/FullStar.svg";
import HalfStar from "@/public/assets/products/HalfStar.svg";
import EmtpyStar from "@/public/assets/products/EmptyStar.svg";
import Image from "next/image";
import { randomBytes } from "crypto";
export default function RatingStars({
  rating,
  title,
  size = 20,
}: {
  rating: number;
  title: string;
  size: 20 | 24 | 32;
}) {
  let stars = [];
  let ratingMock = rating;

  while (ratingMock > 0) {
    if (ratingMock >= 1) {
      stars.push(
        <Image
          src={FullStar}
          alt="placeholder"
          width={size}
          height={size}
          key={`${title}-star-${ratingMock}-${randomBytes(6).toString("hex")}`}
        />
      );
    } else {
      stars.push(
        <Image
          src={HalfStar}
          alt="placeholder"
          width={size * 1.15}
          height={size * 1.15}
          key={`${title}-star-${ratingMock}-${randomBytes(6).toString("hex")}`}
        />
      );
    }
    ratingMock--;
  }
  if (stars.length < 5) {
    while (stars.length != 5) {
      stars.push(
        <Image
          src={EmtpyStar}
          alt="placeholder"
          width={size}
          height={size}
          key={`${title}-star-${ratingMock}-${randomBytes(6).toString("hex")}`}
        />
      );
    }
  }
  return <div className="flex flex-row">{stars}</div>;
}
