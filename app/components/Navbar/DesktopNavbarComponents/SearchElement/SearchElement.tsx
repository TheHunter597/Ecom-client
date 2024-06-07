import navSearch from "@/public/assets/nav/navSearch.svg";
import Image from "next/image";
import { useState } from "react";
import ExpandedSearchElement from "./ExpandedSearchElement";
import { AnimatePresence, motion } from "framer-motion";

export default function SearchElement() {
  const [active, setActive] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {active ? (
        <motion.div
          initial={{
            scaleX: 0,
            transformOrigin: "right",
          }}
          animate={{
            scaleX: 1,
            transformOrigin: "right",

            transition: {
              duration: 0.3,
              ease: [0.42, 0, 1, 1],
            },
          }}
          exit={{
            scaleX: 0,
            transformOrigin: "right",
            transition: {
              duration: 0.2,
              ease: [0.42, 0, 1, 1],
            },
          }}
          key={"expandedSearchElement"}
        >
          <ExpandedSearchElement setActive={setActive} />
        </motion.div>
      ) : (
        <li
          className="cursor-pointer list-none"
          onClick={() => {
            setActive(true);
          }}
        >
          <Image
            src={navSearch}
            width={45}
            height={45}
            alt="Search element"
            style={{ color: "transparent" }}
          />
        </li>
      )}
    </AnimatePresence>
  );
}
