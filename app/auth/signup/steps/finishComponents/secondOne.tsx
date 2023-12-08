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
      initial="start"
      animate={current === 1 ? "initial" : "start"}
      key="second-header"
    >
      <h2 className="secondary-color text-3xl font-bold">
        Amazing discounts around the hour with easy and fast deliver time
      </h2>
      <h4 className="text-3r primary-color">
        Unlock incredible savings with our amazing discounts available around
        the clock. We pride ourselves on offering unbeatable deals that cater to
        your needs whenever you're ready to shop.v
      </h4>
    </motion.div>
  );
}
