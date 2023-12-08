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
      className="flex flex-col gap-8 items-center pb-24"
      // @ts-ignore
      variants={headerVariants}
      exit="exit"
      initial="start"
      animate={current === 2 ? "initial" : "start"}
      key="third-header"
    >
      <h2 className="secondary-color text-3xl font-bold text-center w-10/12">
        Congratulation Your profile successfully created Have fun !
      </h2>
    </motion.div>
  );
}
