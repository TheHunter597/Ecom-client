import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import LeftArrowIcon from "@/public/assets/arrows/leftArrow.svg";

export default function DesktopFilterToggler({
  children,
  showDesktopFilter,
  setShowDesktopFilter,
}: {
  children: React.ReactNode;
  showDesktopFilter: boolean;
  setShowDesktopFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const arrowVariants = {
    active: {
      rotate: 180,
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      rotate: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      animate={
        showDesktopFilter
          ? { width: "100%", transition: { duration: 0.7 } }
          : { width: "20%", transition: { duration: 0.7 } }
      }
      className={`hidden md:block relative h-screen w-fit ${
        showDesktopFilter ? "md:col-span-3" : "md:col-span-1"
      }  top-10  `}
    >
      <motion.div
        transition={{ duration: 0.5 }}
        className={`w-full ${
          showDesktopFilter ? "block" : "hidden"
        } overflow-y-scroll`}
      >
        {children}
      </motion.div>
      <div
        className="top-0 -right-0 h-11 w-11 p-2 text-center flex flex-col items-center justify-center
         rounded-full bg-white shadow-lg absolute cursor-pointer z-40 overflow-x-visible"
        onClick={() => {
          setShowDesktopFilter(!showDesktopFilter);
        }}
      >
        <motion.div
          variants={arrowVariants}
          initial="inactive"
          animate={showDesktopFilter ? "active" : "inactive"}
        >
          <Image src={LeftArrowIcon} width={45} height={45} alt="arrow" />
        </motion.div>
      </div>
    </motion.div>
  );
}
