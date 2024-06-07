import { useAppSelector } from "@/redux/reduxHooks";
import RightArrowIcon from "@/public/assets/arrows/CartBlueRightArrow.svg";
import DownArrowIcon from "@/public/assets/arrows/CartBlueDownArrow.svg";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
export default function ProductsSection() {
  let productsVariants = {
    inital: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };
  let currentCartProducts = useAppSelector((state) => state.cart.products);

  let [showProducts, setShowProducts] = useState<boolean>(false);
  let productsResult = currentCartProducts.map((product) => {
    return (
      <div
        className="flex flex-row gap-6 shadow-xl border border-gray-100 rounded-lg
      py-4 px-6 w-full justify-between"
        key={`OrderedProduct-${product.id}`}
      >
        <Image
          src={product.product.image}
          height={100}
          width={150}
          alt={`${product.product.title} image`}
        />
        <h4 className="flex flex-col gap-2">
          <span className="text-4sb primary-color">
            {product.product.title}
          </span>
          <span className="text-3sb secondary-color">
            ${product.product.price.toFixed(2)} * {product.quantity} = $
            {(product.quantity * product.product.price).toFixed(2)}
          </span>
        </h4>
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className="flex flex-row justify-between w-full pb-2 
      border-b-2 border-gray-900"
      >
        <h5 className="text-3sb primary-color w-full">Orderd products</h5>
        <Image
          src={showProducts ? DownArrowIcon : RightArrowIcon}
          width={14}
          height={14}
          alt="right arrow icon"
          className="cursor-pointer"
          onClick={(e) => {
            setShowProducts(!showProducts);
          }}
        />
      </div>
      <AnimatePresence>
        {showProducts && (
          <motion.div
            variants={productsVariants}
            initial="inital"
            animate="animate"
            exit="inital"
            className="flex flex-col gap-4"
            key="cart-products"
          >
            {productsResult}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
