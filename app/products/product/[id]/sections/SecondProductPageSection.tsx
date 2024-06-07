"use client";
import { IReview } from "@/utils/types";
import { useState } from "react";
import ReviewsContent from "../components/reviews/ReviewsContent";
import FilterReviewsSection from "../components/reviews/FilterReviewsSection";
import { useAppSelector } from "@/redux/reduxHooks";
import DesktopFilterToggler from "@/app/components/others/DesktopFIlterToggler";
import PhoneFilter from "@/app/components/others/PhoneFilter";
export default function SecondProductPageSection({
  reviews,
  productReview,
}: {
  reviews: IReview[];
  productReview: number;
}) {
  let [filterRate, setFilterRate] = useState<number>(0);
  let [filterDate, setFilterDate] = useState<{ name: string; value: number }>({
    name: "Any time",
    value: 500,
  });
  let [reviewsNumber, setReviewsNumber] = useState<number>(5);
  const isPhoneView = useAppSelector((state) => state.user.isPhoneView);
  const [showDesktopFilter, setShowDesktopFilter] = useState<boolean>(true);

  return (
    <div className="grid grid-col-1 md:grid-cols-12 w-11/12 m-auto gap-8 h-fit">
      <DesktopFilterToggler
        setShowDesktopFilter={setShowDesktopFilter}
        showDesktopFilter={showDesktopFilter}
      >
        <FilterReviewsSection
          productReview={productReview}
          reviews={reviews}
          filterRate={filterRate}
          setFilterRate={setFilterRate}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
        />
      </DesktopFilterToggler>
      <div
        className={`col-span-1 ${
          showDesktopFilter ? "md:col-span-9" : "md:col-span-11"
        } w-11/12  md:w-10/12`}
      >
        <div className="block md:hidden">
          <PhoneFilter headerText="Customers reivews">
            <FilterReviewsSection
              productReview={productReview}
              reviews={reviews}
              filterRate={filterRate}
              setFilterRate={setFilterRate}
              filterDate={filterDate}
              setFilterDate={setFilterDate}
            />
          </PhoneFilter>
        </div>
        <ReviewsContent
          reviewsNumber={reviewsNumber}
          setReviewsNumber={setReviewsNumber}
          filterRate={filterRate}
          filterDate={filterDate}
          reviews={reviews}
        />
      </div>
    </div>
  );
}
