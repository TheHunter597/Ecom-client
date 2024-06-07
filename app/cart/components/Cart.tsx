"use client";
import { useState } from "react";
import backgroundImage from "@/public/assets/cart/cartPage.png";
import CartFirstStep from "./steps/FirstStep";
import StepsHeader from "./StepsHeader";
import SecondStep from "./steps/secondStep";
import ThirdStep from "./steps/thirdStep";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import PaymentCompletion from "./steps/PaymentCompletion";
////////////

export default function CartContent() {
  let stepsVariants = {
    start: {
      x: -120,
      opacity: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.7,
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      x: 200,
      position: "absolute",
      transition: {
        duration: 0.8,
      },
    },
  };
  let [currentStep, setCurrentStep] = useState<number>(0);
  return (
    <div className="pt-12 relative">
      <Image
        src={backgroundImage}
        height={window.innerHeight}
        width={window.innerWidth / 3}
        alt="cart bg image"
        className="absolute -z-50 right-0 top-0"
      />
      <div className="flex flex-col gap-10 w-12/12 px-2 sm:w-10/12 mx-auto">
        <div className="flex flex-row gap-2 sm:gap-6 self-center">
          <StepsHeader
            text="Cart"
            currentStep={currentStep}
            step={0}
            setCurrentStep={setCurrentStep}
          />
          <StepsHeader
            text="Check out"
            currentStep={currentStep}
            step={1}
            setCurrentStep={setCurrentStep}
          />
          <StepsHeader
            text="Payment"
            currentStep={currentStep}
            step={2}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <AnimatePresence>
          {
            {
              0: (
                <motion.div
                  exit="exit"
                  initial="start"
                  animate="animate" // @ts-ignore
                  variants={stepsVariants}
                  key="first-cart-step"
                >
                  <CartFirstStep setCurrentStep={setCurrentStep} />
                </motion.div>
              ),
              1: (
                <motion.div
                  exit="exit"
                  initial="start"
                  animate="animate"
                  // @ts-ignore
                  variants={stepsVariants}
                  key="second-cart-step"
                >
                  <SecondStep setCurrentStep={setCurrentStep} />
                </motion.div>
              ),
              2: (
                <motion.div
                  exit="exit"
                  initial="start"
                  animate="animate" // @ts-ignore
                  variants={stepsVariants}
                  key="third-cart-step"
                >
                  <ThirdStep setcurrentStep={setCurrentStep} />
                </motion.div>
              ),
              3: (
                <motion.div
                  exit="exit"
                  initial="start"
                  animate="animate" // @ts-ignore
                  variants={stepsVariants}
                  key="Payment-completion"
                >
                  <PaymentCompletion />
                </motion.div>
              ),
            }[currentStep]
          }
        </AnimatePresence>
      </div>
    </div>
  );
}
