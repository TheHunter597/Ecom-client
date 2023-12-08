"use client";
import { IReview } from "@/utils/types";
import ReviewElement from "../components/reviews/ReviewElement";
import { useState } from "react";
import FilterByRating from "../components/reviews/FilterComponent";
import ReviewsContent from "../components/reviews/ReviewsContent";

export default function SecondProductPageSection({
  reviews,
  productReview,
}: {
  reviews: IReview[];
  productReview: number;
}) {
  let [filterRate, setFilterRate] = useState<number>(0);
  let [reviewsNumber, setReviewsNumber] = useState<number>(5);
  return (
    <div className="grid grid-cols-4 w-11/12 m-auto gap-6">
      <div className="col-span-1">
        <FilterByRating
          changeFilterRate={setFilterRate}
          productReview={productReview}
          reviewsNumber={reviews.length}
          filterRate={filterRate}
        />
      </div>
      <div className="col-span-3 w-10/12">
        <ReviewsContent
          reviewsNumber={reviewsNumber}
          setReviewsNumber={setReviewsNumber}
          filterRate={filterRate}
          reviews={reviews}
        />
      </div>
    </div>
  );
}
