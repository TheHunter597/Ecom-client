import { IReview } from "@/utils/types";
import RatingStars from "../../../components/RatingStars";
import FilterByDate from "./FilterByDate";
import FilterByRating from "./FilterByRating";

export default function FilterReviewsSection({
  productReview,
  reviews,
  filterRate,
  setFilterRate,
  filterDate,
  setFilterDate,
}: {
  productReview: number;
  reviews: IReview[];
  filterRate: number;
  setFilterRate: Function;
  filterDate: { name: string; value: number };
  setFilterDate: Function;
}) {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 w-fit border-r-2 pr-2">
      <div className="flex flex-col gap-2 border-b-2 border-gray-700 pb-1">
        <h4 className="desktop-4sb secondary-color ">
          Filter Cutomers reviews
        </h4>
        <div className="flex flex-col gap-2">
          <RatingStars
            size={20}
            rating={productReview}
            title="filterWithReviews"
          />
          <p className="text-3sb primary-color">
            Rating: {productReview.toFixed(2)} ({reviews.length} reviews)
          </p>
        </div>
      </div>
      <FilterByRating
        changeFilterRate={setFilterRate}
        filterRate={filterRate}
      />
      <FilterByDate
        changeFilterByDate={setFilterDate}
        filterDate={filterDate}
      />
    </div>
  );
}
