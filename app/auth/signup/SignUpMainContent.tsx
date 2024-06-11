"use client";
import Image from "next/image";
import SignUpImage from "../../../public/images/SignUp.png";
import { useEffect, useState } from "react";
import StepOne from "./steps/stepOne";
import StepTwo from "./steps/stepTwo";
import StepThree from "./steps/stepThree";
import FourthStep from "./steps/stepFour";
import { AnimatePresence, motion } from "framer-motion";
import FifthStep from "./steps/stepFive";
import SixthStep from "./steps/stepSix";
import { useAppSelector } from "@/redux/reduxHooks";
import { useRouter } from "next/navigation";
export default function SignUpMainContent() {
  let [currentStep, setCurrentStep] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  let router = useRouter();
  let isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  let stepsVariants = {
    start: {
      x: 120,
      opacity: 0.8,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      x: -120,
      position: "absolute",
      transition: {
        duration: 0.8,
      },
    },
  };

  if (isAuthenticated) {
    router.push("/");
  }
  useEffect(() => {
    if (window) {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  return (
    <>
      <div className="absolute left-1/2 -z-10">
        <Image
          src={SignUpImage}
          width={windowWidth != 0 ? windowWidth / 2 : 0}
          className="h-fit"
          alt="Signup image"
        />
      </div>
      <AnimatePresence>
        {
          {
            0: (
              <motion.div
                exit="exit"
                // @ts-ignore
                variants={stepsVariants}
                key="first-step"
                className={`w-11/12 sm:w-6/12 lg:w-4/12 `}
              >
                <StepOne changeCurrentStep={setCurrentStep} />
              </motion.div>
            ),
            1: (
              <motion.div
                // @ts-ignore
                variants={stepsVariants}
                exit="exit"
                animate="animate"
                initial="start"
                key="second-step"
                className={`w-11/12 sm:w-6/12 lg:w-4/12 `}
              >
                <StepTwo changeCurrentStep={setCurrentStep} />
              </motion.div>
            ),
            2: (
              <motion.div
                // @ts-ignore
                variants={stepsVariants}
                exit="exit"
                animate="animate"
                initial="start"
                key="third-step"
                className={`w-11/12 sm:w-6/12 lg:w-4/12 `}
              >
                <StepThree
                  changeCurrentStep={setCurrentStep}
                  key="third step"
                />
              </motion.div>
            ),
            3: (
              <motion.div
                // @ts-ignore
                variants={stepsVariants}
                exit="exit"
                animate="animate"
                initial="start"
                key="third-step"
                className={`w-11/12 sm:w-6/12 lg:w-4/12 `}
              >
                <FourthStep changeCurrentStep={setCurrentStep} />
              </motion.div>
            ),
            4: (
              <motion.div
                // @ts-ignore
                variants={stepsVariants}
                exit="exit"
                animate="animate"
                initial="start"
                key="third-step"
                className={`w-11/12 sm:w-6/12 lg:w-4/12 `}
              >
                <FifthStep changeCurrentStep={setCurrentStep} />
              </motion.div>
            ),
            5: (
              <motion.div
                // @ts-ignore
                variants={stepsVariants}
                exit="exit"
                animate="animate"
                initial="start"
                key="third-step"
                className={`md:9/12 lg:w-7/12 `}
              >
                <SixthStep changeCurrentStep={setCurrentStep} />
              </motion.div>
            ),
          }[currentStep]
        }
      </AnimatePresence>
    </>
  );
}
