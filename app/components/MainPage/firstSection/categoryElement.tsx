"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
export default function CategoryElement({
  name,
  image,
  link,
}: {
  name: string;
  image: any;
  link: string;
}) {
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
  return (
    <Link
      href={`/categories/${link}`}
      className="relative flex items-center justify-center cursor-pointer overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={image} alt="name" loading="lazy" />
      <AnimatePresence>
        {!hovered ? (
          <motion.h3
            key={`${name}-header`}
            variants={headerVariants}
            initial="exit"
            exit="exit"
            animate="initial"
            className="w-10/12 m-auto absolute top-1/4 text-center paprika header-4sb 
      font-normal secondary-color leading-normal"
          >
            {name}
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
              <span className="text-2sb">{name}</span>
              <span className="text-3r">
                View most popular products in {name} category
              </span>
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}
