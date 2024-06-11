"use client";
import { IReview } from "@/utils/types";
import ReviewElement from "./ReviewElement";
import { AnimatePresence, motion } from "framer-motion";

export default function ReviewsContent({
  reviews,
  filterRate,
  reviewsNumber,
  setReviewsNumber,
  filterDate,
}: {
  reviews: IReview[];
  filterRate: number;
  reviewsNumber: number;
  setReviewsNumber: Function;
  filterDate: { name: string; value: number };
}) {
  let reviewVariants = {
    initial: (delay: number) => {
      return {
        opacity: 1,
        x: -0,
        transition: {
          duration: 0.5,
          delay: delay * 0.1,
        },
      };
    },
    exit: (delay: number) => {
      return {
        opacity: 0,
        x: -20,
        transition: {
          duration: 0.5,
          delay: delay * 0.1,
        },
      };
    },
  };
  let reviewsResult = reviews
    .filter((review) => review.rating >= filterRate)
    .map((reivew) => {
      let date = new Date(reivew.createdAt);
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      return { ...reivew, days };
    })
    .filter((review) => {
      if (filterDate.value === 500) return true;
      return review.days <= filterDate.value;
    })
    .slice(0, reviewsNumber)
    .map((review, index) => {
      return (
        <motion.div
          variants={reviewVariants}
          initial="exit"
          exit="exit"
          animate="initial"
          custom={index % 5 === 0 ? 0 : (index % 5) - 1}
          key={`review=${review.id}`}
        >
          <ReviewElement review={review} />
        </motion.div>
      );
    });
  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="flex flex-col gap-12 w-full">
        <AnimatePresence>{reviewsResult}</AnimatePresence>
      </div>
      <div className="flex flex-col gap-8">
        <span
          className="secondary-color first-letter:uppercase cursor-pointer self-center text-2sb"
          onClick={() => setReviewsNumber(reviewsNumber + 5)}
        >
          {reviews.length > reviewsNumber ? "Load More" : "No More Reviews"}
        </span>
      </div>
    </div>
  );
}
