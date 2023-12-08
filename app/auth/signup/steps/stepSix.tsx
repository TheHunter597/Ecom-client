import Image from "next/image";
import finishOneImage from "../../../../public/images/finishOne.png";
import finishTwoImage from "../../../../public/images/finishTwo.png";
import AuthContainer from "../../components/container";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FirstOne from "./finishComponents/firstOne";
import SecondOne from "./finishComponents/secondOne";
import ThirdOne from "./finishComponents/thirdOne";

export default function SixthStep({
  changeCurrentStep,
}: {
  changeCurrentStep: Function;
}) {
  let imageVariants = {
    initial: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    start: {
      x: 120,
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      position: "absolute",
      zIndex: -1,
    },
  };
  let headerVariants = {
    initial: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
      },
    },
    start: {
      x: -120,
      opacity: 0,
      transition: {
        duration: 1.5,
      },
    },
    exit: {
      opacity: 0,
      position: "absolute",
      zIndex: -1,
    },
  };
  let [current, setCurrent] = useState(0);

  return (
    <div
      className="pt-20"
      onClick={() => {
        console.log({ current });
      }}
    >
      <AuthContainer>
        <div className="flex flex-col gap-8">
          <motion.div
            className={`py-2 bg-red-400 self-center duration-500 ${
              current == 0 && "w-1/3"
            } ${current == 1 && "w-2/3"} ${current == 2 && "w-full"}`}
          ></motion.div>
          <div className="grid grid-cols-2 gap-10 px-8">
            <div
              className={`flex flex-col justify-between items-center ${
                current == 2 ? "col-span-2" : "col-span-1"
              }`}
            >
              <AnimatePresence>
                {
                  {
                    0: (
                      <FirstOne
                        current={current}
                        headerVariants={headerVariants}
                        imageVariants={imageVariants}
                      />
                    ),
                    1: (
                      <SecondOne
                        current={current}
                        headerVariants={headerVariants}
                        imageVariants={imageVariants}
                      />
                    ),
                    2: (
                      <ThirdOne
                        current={current}
                        headerVariants={headerVariants}
                        imageVariants={imageVariants}
                      />
                    ),
                  }[current]
                }
              </AnimatePresence>
              {current != 2 ? (
                <button
                  className="py-2 primary-color text-2sb w-11/12 md:w-10/12 
            flex flex-row gap-2 items-center border-2 primary-border-color justify-center rounded-md font-bold"
                  onClick={() => {
                    setCurrent((prev) => prev + 1);
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  className="py-2 text-white text-2sb w-10/12 sm:w-5/12  primary-background-color 
            flex flex-row gap-2 items-center justify-center rounded-md font-bold"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.location.href = "/";
                    }
                  }}
                >
                  Proceed to website
                </button>
              )}
            </div>
            <AnimatePresence>
              {
                {
                  0: (
                    <motion.div
                      // @ts-ignore
                      variants={imageVariants}
                      exit="exit"
                      animate={current === 0 ? "initial" : "start"}
                      key="first-image"
                      className="col-span-1"
                    >
                      <Image
                        src={finishOneImage}
                        alt="finish-one"
                        height={400}
                      />
                    </motion.div>
                  ),
                  1: (
                    <motion.div
                      // @ts-ignore
                      variants={imageVariants}
                      exit="exit"
                      initial="start"
                      key="second-image"
                      animate={current === 1 ? "initial" : "start"}
                      className="col-span-1"
                    >
                      <Image
                        src={finishTwoImage}
                        alt="finish-one"
                        height={400}
                      />
                    </motion.div>
                  ),
                }[current]
              }
            </AnimatePresence>
          </div>
        </div>
      </AuthContainer>
    </div>
  );
}
