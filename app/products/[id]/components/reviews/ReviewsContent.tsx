"use client";
import { IReview } from "@/utils/types";
import ReviewElement from "./ReviewElement";
import { AnimatePresence, motion } from "framer-motion";
import PlusIconGray from "@/public/assets/forms/plusGray.svg";
import PlusIconWhite from "@/public/assets/forms/plusWhite.svg";

import Image from "next/image";
import { useState } from "react";
export default function ReviewsContent({
  reviews,
  filterRate,
  reviewsNumber,
  setReviewsNumber,
}: {
  reviews: IReview[];
  filterRate: number;
  reviewsNumber: number;
  setReviewsNumber: Function;
}) {
  let [plusHovered, setPlusHovered] = useState<boolean>(false);
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
    .slice(0, reviewsNumber)
    .map((review, index) => {
      return (
        <motion.div
          variants={reviewVariants}
          initial="exit"
          exit="exit"
          animate="initial"
          custom={index}
          key={`review=${review.id}`}
        >
          <ReviewElement review={review} />
        </motion.div>
      );
    });
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-12">
        <AnimatePresence>{reviewsResult}</AnimatePresence>
      </div>
      <div className="flex flex-col gap-8">
        <span
          className="secondary-color first-letter:uppercase cursor-pointer self-center text-2sb"
          onClick={() => setReviewsNumber(reviewsNumber + 5)}
        >
          {reviews.length > reviewsNumber ? "Load More" : "No More Reviews"}
        </span>
        <div className="flex flex-col gap-1 w-1/2 self-center">
          <button
            className="p-2 first-letter:uppercase border-2 text-2sb rounded-md
          border-gray-800 flex flex-row gap-2 items-center justify-center
          hover:text-white hover:bg-gray-800 duration-200
          "
            onMouseEnter={() => setPlusHovered(true)}
            onMouseLeave={() => setPlusHovered(false)}
          >
            Write a review
            <Image
              src={plusHovered ? PlusIconWhite : PlusIconGray}
              alt="plus icon"
              height={20}
              width={20}
            />
          </button>
          <span className="text-gray text-center">
            You should have purchased the product to add a review
          </span>
        </div>
      </div>
    </div>
  );
}
