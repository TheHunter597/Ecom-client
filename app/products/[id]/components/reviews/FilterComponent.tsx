import { randomBytes } from "crypto";
import RatingStars from "../../../components/RatingStars";

export default function FilterByRating({
  changeFilterRate,
  productReview,
  reviewsNumber,
  filterRate,
}: {
  changeFilterRate: Function;
  productReview: number;
  reviewsNumber: number;
  filterRate: number;
}) {
  let neededRatings = [1, 2, 3, 4];
  let result = neededRatings.map((rating) => {
    return (
      <div
        key={`FilterWithRevies-${randomBytes(6).toString("hex")}`}
        className={`flex flex-row gap-2 shadow-lg py-2 px-1 rounded-md 
        cursor-pointer hover:bg-gray-800 hover:text-white ${
          filterRate === rating ? "bg-gray-800 text-white" : ""
        }`}
        onClick={() => changeFilterRate(rating)}
      >
        <div className="flex flex-row">
          <RatingStars size={20} rating={rating} title="filterWithReviews" />
        </div>
        <p>{rating} Stars & Up</p>
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 border-b-2 border-gray-700 pb-1">
        <h4 className="desktop-3sb secondary-color">Cutomer reviews</h4>
        <div className="flex flex-col gap-2">
          <RatingStars
            size={24}
            rating={productReview}
            title="filterWithReviews"
          />
          <p className="text-2sb primary-color">
            {productReview.toFixed(2)} ({reviewsNumber} reviews)
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">{result}</div>
    </div>
  );
}
