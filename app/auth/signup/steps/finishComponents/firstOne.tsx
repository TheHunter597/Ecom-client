import { motion } from "framer-motion";
export default function ({
  current,
  imageVariants,
  headerVariants,
}: {
  current: number;
  imageVariants: any;
  headerVariants: any;
}) {
  return (
    <motion.div
      className="flex flex-col gap-8"
      // @ts-ignore
      variants={headerVariants}
      exit="exit"
      animate={current === 0 ? "initial" : "start"}
      key="first-header"
    >
      <h2 className="secondary-color text-3xl font-bold">
        Find the latest products in a blink of an eye
      </h2>
      <h4 className="text-3r primary-color">
        In the blink of an eye, you can explore a curated selection of the
        latest and most innovative products across various categories.
      </h4>
    </motion.div>
  );
}
