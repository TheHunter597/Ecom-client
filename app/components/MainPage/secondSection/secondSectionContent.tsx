"use client";

import MainProductCard from "@/app/products/components/MainProductCard";
import { randomBytes } from "crypto";
import Image from "next/image";
import { useRef, useState } from "react";
import LeftArrow from "@/public/assets/arrows/whiteLeftArrow.svg";
import RightArrow from "@/public/assets/arrows/whiteRightArrow.svg";
import { AnimatePresence, motion } from "framer-motion";
import { IProduct } from "@/utils/types";
export default function SecondSectionContent({
  topTenProducts,
}: {
  topTenProducts: any;
}) {
  let mainDev = useRef<HTMLDivElement>(null);
  let arrowsVariants = {
    active: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    inactive: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  let [isHovered, setIsHovered] = useState(false);
  let productsResult = topTenProducts.products.map((product: IProduct) => (
    <MainProductCard
      {...product}
      key={`${product.title}-${randomBytes(8).toString("hex")}`}
    />
  ));

  return (
    <div
      className="my-24 shadow-xl w-full bg-gray-50 py-1 relative"
      onMouseEnter={() => setIsHovered(() => true)}
      onMouseLeave={() => setIsHovered(() => false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-0 top-0 h-full flex flex-col items-center justify-center z-20
      bg-black bg-opacity-20 rounded-l-xl px-2 cursor-pointer hover:bg-opacity-50 duration-300"
            variants={arrowsVariants}
            initial="inactive"
            exit="inactive"
            animate="active"
            onClick={() => {
              if (mainDev.current) mainDev.current.scrollLeft -= 500;
            }}
          >
            <Image
              src={LeftArrow}
              alt="left-arrow"
              height={45}
              width={45}
              className="z-10"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="relative w-full overflow-x-auto hideScrollBar"
        ref={mainDev}
      >
        <div className="grid grid-flow-col gap-6 w-fit h-fit overflow-x-clip overflow-hidden">
          {productsResult}
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute right-0 top-0 h-full flex flex-col items-center justify-center z-20
      bg-black bg-opacity-20 rounded-r-xl px-2 cursor-pointer hover:bg-opacity-40 duration-300"
            variants={arrowsVariants}
            initial="inactive"
            exit="inactive"
            animate="active"
            onClick={() => {
              if (mainDev.current) mainDev.current.scrollLeft += 500;
            }}
          >
            <Image
              src={RightArrow}
              alt="right-arrow"
              height={45}
              width={45}
              className="z-10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
