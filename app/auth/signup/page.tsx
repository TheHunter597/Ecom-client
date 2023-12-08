"use client";
import Image from "next/image";
import SignUpImage from "../../../public/images/SignUp.png";
import { useState } from "react";
import StepOne from "./steps/stepOne";
import StepTwo from "./steps/stepTwo";
import StepThree from "./steps/stepThree";
import FourthStep from "./steps/fourthStep";
import { AnimatePresence, motion } from "framer-motion";
import FifthStep from "./steps/stepFive";
import SixthStep from "./steps/stepSix";
import { useAppSelector } from "@/redux/reduxHooks";
import { useRouter } from "next/navigation";
export default function Signup() {
  let [currentStep, setCurrentStep] = useState(0);
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
      transition: {
        duration: 0.8,
      },
    },
  };

  if (isAuthenticated) {
    router.push("/");
  }
  return (
    <div className="flex flex-row justify-center w-full relative">
      <div className="absolute left-1/2 -z-10">
        <Image
          src={SignUpImage}
          width={window.innerWidth / 2}
          height={window.innerHeight * 0.75}
          alt="Signup image"
        />
      </div>
      <AnimatePresence>
        {
          {
            0: (
              <motion.div
                exit="exit"
                variants={stepsVariants}
                key="first-step"
                className={`w-11/12 sm:w-6/12 lg:w-4/12 absolute`}
              >
                <StepOne changeCurrentStep={setCurrentStep} />
              </motion.div>
            ),
            1: (
              <motion.div
                variants={stepsVariants}
                exit="exit"
                animate="animate"
                initial="start"
                key="second-step"
                className={`w-11/12 sm:w-6/12 lg:w-4/12 absolute`}
              >
                <StepTwo changeCurrentStep={setCurrentStep} />
              </motion.div>
            ),
            2: (
              <motion.div
                variants={stepsVariants}
                exit="exit"
                animate="animate"
                initial="start"
                key="third-step"
                className={`w-11/12 sm:w-6/12 lg:w-4/12 absolute`}
              >
                <StepThree
                  changeCurrentStep={setCurrentStep}
                  key="third step"
                />
              </motion.div>
            ),
            3: (
              <motion.div
                variants={stepsVariants}
                exit="exit"
                animate="animate"
                initial="start"
                key="third-step"
                className={`w-11/12 sm:w-6/12 lg:w-4/12 absolute`}
              >
                <FourthStep changeCurrentStep={setCurrentStep} />
              </motion.div>
            ),
            4: (
              <motion.div
                variants={stepsVariants}
                exit="exit"
                animate="animate"
                initial="start"
                key="third-step"
                className={`w-11/12 sm:w-6/12 lg:w-4/12 absolute`}
              >
                <FifthStep changeCurrentStep={setCurrentStep} />
              </motion.div>
            ),
            5: (
              <motion.div
                variants={stepsVariants}
                exit="exit"
                animate="animate"
                initial="start"
                key="third-step"
                className={`md:9/12 lg:w-7/12 absolute`}
              >
                <SixthStep changeCurrentStep={setCurrentStep} />
              </motion.div>
            ),
          }[currentStep]
        }
      </AnimatePresence>
    </div>
  );
}
