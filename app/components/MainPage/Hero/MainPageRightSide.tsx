"use client";
import MainPageFirst from "@/public/images/mainPage/MainPageFirst.png";
import MainPageSecond from "@/public/images/mainPage/MainPageSecond.png";
import MainPageThird from "@/public/images/mainPage/MainPageThird.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import SmallDots from "./smallDots";
import { AnimatePresence, motion } from "framer-motion";
import LeftArrow from "@/public/assets/arrows/leftArrow.svg";
export default function MainPageRightSide() {
  let imageVariants = {
    initial: {
      position: "absolute",
      opacity: 0.1,
    },
    active: {
      opacity: 1,
      position: "static",
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      opacity: 0,
      position: "absolute",
      zIndex: -1,
      transition: {
        duration: 0.7,
      },
    },
  };
  let dotsNumber = [0, 1, 2];
  let [currentActive, setCurrentActive] = useState(0);
  let dotsResult = dotsNumber.map((number) => {
    return (
      <SmallDots
        number={number}
        currentActive={currentActive}
        setCurrentActive={setCurrentActive}
        key={number}
      />
    );
  });
  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentActive((prev) => {
        if (prev === 2) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className="bg-red-100 w-full pb-4">
      <div className="w-full flex flex-col gap-4 items-center ">
        <AnimatePresence>
          {
            {
              0: (
                <motion.div
                  // @ts-ignore
                  variants={imageVariants}
                  exit="inactive"
                  initial="active"
                  animate="active"
                  key="first"
                >
                  <Image
                    src={MainPageFirst}
                    alt="laptop"
                    className="main-page-image"
                  />
                </motion.div>
              ),
              1: (
                <motion.div
                  // @ts-ignore
                  variants={imageVariants}
                  exit="inactive"
                  initial="initial"
                  animate="active"
                  key="second"
                >
                  <Image
                    src={MainPageSecond}
                    alt="shoe"
                    className="main-page-image"
                  />
                </motion.div>
              ),
              2: (
                <motion.div
                  // @ts-ignore
                  variants={imageVariants}
                  exit="inactive"
                  initial="initial"
                  animate="active"
                  key="third"
                >
                  <Image
                    src={MainPageThird}
                    alt="shoe"
                    className="main-page-image"
                  />
                </motion.div>
              ),
            }[currentActive]
          }
        </AnimatePresence>
        <div className="flex flex-row gap-2">{dotsResult}</div>
      </div>
      <div className="w-ful px-4">
        <div className="flex flex-row px-2 py-2 rounded-lg gap-2 bg-gray-50 w-fit">
          <Image src={LeftArrow} alt="left-arrow" />
          <h5>Explore more</h5>
        </div>
      </div>
    </div>
  );
}
