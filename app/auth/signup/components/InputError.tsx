import { motion } from "framer-motion";
export default function InputError({
  error,
  size,
}: {
  error?: string;
  size?: number;
}) {
  let errorState = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
    inactive: {
      opacity: 0,
      y: -40,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <motion.small
      className={`text-red-600 text-center ${
        size == 1 ? "text-2sb" : size == 2 ? "text-3sb" : "text-4sb"
      }`}
      variants={errorState}
      animate={error ? "active" : "inactive"}
    >
      {error}
    </motion.small>
  );
}
