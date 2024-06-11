"use client";
import "./FirstSection.scss";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function CategoryElement({
  name,
  image,
  link,
  index,
  currentActive,
  setCurrentActive,
}: {
  name: string;
  image: any;
  link: string;
  index: number;
  currentActive: number;
  setCurrentActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [elementPointerCurrentX, setElementPointerCurrentX] =
    useState<number>(0);
  const router = useRouter();
  let [hovered, setHovered] = useState(false);
  let headerVariants = {
    initial: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };
  let overlayVariants = {
    initial: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };
  let imageVariants = {
    initial: {
      width:
        currentActive - 1 == index || currentActive + 1 == index
          ? "8rem"
          : "10.8rem",
      fontSize:
        currentActive - 1 == index || currentActive + 1 == index
          ? "1.2rem"
          : "1.5rem",
      y: index % 2 === 0 ? -20 : 20,
      // clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)",
      filter: "brightness(82%)",
    },
    active: {
      width: "16rem",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
      // clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
      filter: "brightness(100%)",
    },
  };
  return (
    <div
      onMouseDown={(e) => {
        setElementPointerCurrentX(e.clientX);
      }}
      className="w-fit px-2"
      onMouseEnter={() => {
        setHovered(true);
        setCurrentActive(index);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setCurrentActive(-1);
      }}
    >
      <motion.div
        variants={imageVariants}
        className="relative flex items-center justify-center cursor-pointer overflow-hidden w-fit rounded-2xl "
        animate={hovered ? "active" : "initial"}
        initial="initial"
      >
        <Image
          src={image}
          alt="name"
          loading="lazy"
          height={0}
          width={0}
          sizes="20vw"
          quality={100}
          style={{
            height: "70vh",
            width: "100%",
          }}
          className="FirstSectionImage rounded-2xl"
        />
        <AnimatePresence>
          {!hovered ? (
            <motion.h3
              key={`${name}-header`}
              variants={headerVariants}
              initial="exit"
              exit="exit"
              animate="initial"
              className="max-w-fit m-auto absolute top-1/4 text-center paprika  
      font-normal text-white "
            >
              {name.includes("&")
                ? name
                    .split("&")
                    .map(
                      (element) =>
                        element.charAt(0).toUpperCase() + element.slice(1)
                    )
                    .join(" & ")
                : name.charAt(0).toUpperCase() + name.slice(1)}
            </motion.h3>
          ) : (
            <motion.div
              variants={overlayVariants}
              key={`${name}-overlay`}
              initial="exit"
              exit="exit"
              animate="initial"
              className="absolute bottom-0 py-4 h-3/5 px-2 flex flex-row items-center
           bg-black bg-opacity-50"
            >
              <h3 className="text-center flex flex-col gap-2 text-white">
                <span className="text-2sb">
                  {name.includes("&")
                    ? name
                        .split("&")
                        .map(
                          (element) =>
                            element.charAt(0).toUpperCase() + element.slice(1)
                        )
                        .join(" & ")
                    : name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
                <span className="text-3r">
                  View most popular products in {name} category
                </span>
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
