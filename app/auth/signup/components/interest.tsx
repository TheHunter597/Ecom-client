import { useState } from "react";
import { motion } from "framer-motion";
import { addCategory, removeCategory } from "@/redux/userCreation";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
export default function Interest({ name, id }: { name: string; id: number }) {
  let variants = {
    active: {
      backgroundColor: "#1E1B22",
      color: "#FFFFFF",
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      backgroundColor: "#FFFFFF",
      color: "#1E1B22",
      transition: {
        duration: 0.5,
      },
    },
  };
  let [active, setActive] = useState(false);
  let dispatch = useAppDispatch();
  return (
    <motion.div
      variants={variants}
      initial="inactive"
      animate={active ? "active" : "inactive"}
      className="py-2 px-3 text-3sb border-2 rounded-2xl cursor-pointer hover:bg-gray-200"
      onClick={() => {
        if (!active) dispatch(addCategory(id + 1));
        else dispatch(removeCategory(id + 1));
        setActive(!active);
      }}
    >
      {name}
    </motion.div>
  );
}
