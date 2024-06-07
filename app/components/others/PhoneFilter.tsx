import Image from "next/image";
import FilterCustomersReviewsIcon from "@/public/assets/products/FilterCustomersReviews.svg";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useState } from "react";
export default function PhoneFilter({
  headerText,
  children,
}: {
  headerText: string;
  children: React.ReactNode;
}) {
  const [overlayActive, setOverlayActive] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row justify-between w-full mb-6">
        <h4 className="text-1sb secondary-color">{headerText}</h4>
        <div
          className="flex flex-row gap-1 items-center cursor-pointer"
          onClick={() => setOverlayActive(true)}
        >
          <Image
            src={FilterCustomersReviewsIcon}
            width={30}
            height={30}
            alt="filter reviews"
          />
          <span className="text-4sb secondary-color">Fitler</span>
        </div>
      </div>

      <AnimatePresence>
        {overlayActive && (
          <div
            className="fixed top-0 left-0 w-full flex flex-col items-center justify-center z-50
          bg-black bg-opacity-50 h-screen
          "
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onBlur={() => setOverlayActive(false)}
              style={{ height: "70svh" }}
              className="relative bg-white rounded-lg p-12 md:w-6/12 sm:8-12 w-9/12 shadow-lg
        border-2 border-gray-100  overflow-y-scroll
       "
            >
              <span
                className="header-5sb text-red-500 absolute top-1 right-2 cursor-pointer"
                onClick={() => setOverlayActive(false)}
              >
                X
              </span>
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
