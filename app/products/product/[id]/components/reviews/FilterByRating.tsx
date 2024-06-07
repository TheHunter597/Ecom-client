import { randomBytes } from "crypto";
import RatingStars from "../../../components/RatingStars";

export default function FilterByRating({
  changeFilterRate,
  filterRate,
}: {
  changeFilterRate: Function;
  filterRate: number;
}) {
  let neededRatings = [4, 3, 2, 1, 0];
  let result = neededRatings.map((rating) => {
    return (
      <div
        key={`FilterWithReviews-${randomBytes(6).toString("hex")}`}
        className={`flex flex-col sm:flex-row gap-2 shadow-md filtersPadding px-5 py-2 rounded-md border border-gray-200
        cursor-pointer hover:bg-gray-800 hover:text-white duration-200 text-4sb w-full  ${
          filterRate === rating ? "bg-gray-800 text-white" : ""
        }`}
        onClick={() => changeFilterRate(rating)}
      >
        <div className="flex flex-row">
          <RatingStars size={18} rating={rating} title="filterWithReviews" />
        </div>
        <p>{rating} Stars & Up</p>
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-1 sm:gap-2 w-full">
      <h4 className="secondary-color header-6sb">Rating</h4>
      <div className="flex flex-col gap-1 sm:gap-2">{result}</div>
    </div>
  );
}
