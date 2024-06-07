import { IProduct } from "@/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import SearchProduct from "./SearchProduct";
import Link from "next/link";
import { useAppSelector } from "@/redux/reduxHooks";
import { useRouter } from "next/navigation";
export default function SearchOverlay({
  data,
  searchValue,
  setActive,
}: {
  data: any;
  searchValue: string;
  setActive: Function;
}) {
  const variants = {
    active: {
      opacity: 1,
      y: 0,
    },
    inactive: {
      opacity: 0,
      y: -100,
    },
  };
  const result = data.products.slice(0, 10).map((product: IProduct) => {
    return (
      <SearchProduct
        product={product}
        key={`productSearch-${product.id}`}
        setActive={setActive}
      />
    );
  });
  const isPhoneView = useAppSelector((state) => state.user.isPhoneView);
  let router = useRouter();
  return (
    <AnimatePresence>
      <motion.div
        key={"search overlay"}
        initial="inactive"
        animate="active"
        exit="inactive"
        variants={variants}
        className={`absolute ${
          isPhoneView ? "left-1/4" : ""
        } mr-3 h-96 rounded-md border border-gray-400 top-full
             text-3sb gap-1 flex flex-col bg-white z-50 sm:w-72 shadow-lg overflow-y-scroll overflow-scroll`}
      >
        <span
          className="text-3sb text-white text-center bg-blue-600 p-3 cursor-pointer"
          onClick={() => {
            setActive(false);
            window.location.href = `/products?title=${searchValue}`;
          }}
        >
          View all results: {data.products.length}
        </span>
        <div
          className="
            py-3 text-3sb flex flex-col"
        >
          {result}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
