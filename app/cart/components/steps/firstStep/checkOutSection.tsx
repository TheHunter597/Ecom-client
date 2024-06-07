import { TotalPrice } from "@/redux/cart/cart";
import { useAppSelector } from "@/redux/reduxHooks";
import { useEffect, useState } from "react";
import CompleteInfoOverlay from "./CompleteInfoOverlay";
import Image from "next/image";
import WhiteCartSideArrowIcon from "@/public/assets/cart/WhiteCartSideArrow.svg";
import { AnimatePresence, motion } from "framer-motion";
function checkMissedData(data: any) {
  let missedData = [];
  for (const property in data) {
    if (property == "avatar") continue;
    if (data[property] === null || data[property] === "") {
      missedData.push(property);
    }
  }
  return missedData;
}
export default function CheckOutSection({
  setCurrentStep,
  cartData,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  cartData: any[];
}) {
  let [missedData, setMissedData] = useState<string[]>([]);
  let [overlayType, setOverlayType] = useState<"info" | "empty">("info");
  let [openOverlay, setOpenOverlay] = useState<boolean>(false);
  let totalPrice = useAppSelector(TotalPrice);
  let userData = useAppSelector((state) => state.user.userData);
  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    setMissedData(checkMissedData(userData));
  }, [userData]);
  const isPhoneView = useAppSelector((state) => state.user.isPhoneView);
  return (
    <div className="fixed sm:static sm:col-span-3 right-0 bottom-1/2">
      <AnimatePresence mode="wait">
        {active || !isPhoneView ? (
          <motion.div
            initial={{ x: "100%" }}
            exit={{ x: "100%" }}
            animate={{ x: 0 }}
            className="relative py-8 px-4 w-full pt-10 sm:flex  border-gray-100 shadow-xl rounded-lg bg-white 
      p-4 h-fit flex-col justify-between gap-6 cursor-pointer"
          >
            <div className="flex flex-col gap-4 border-b-2 pb-2 border-gray-700">
              <div className="flex flex-row justify-between text-2sb gap-4">
                <span className="primary-color">SubTotal</span>
                <span className="secondary-color">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-row justify-between text-2sb gap-4">
                <span className="primary-color">Discount</span>
                <span className="secondary-color">$0.00</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <div className="header-6sb secondary-color flex flex-row justify-between">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                className="w-full py-2 bg-light-blue rounded-md text-white text-2sb
            hover:bg-white hover:text-gray-800  duration-300 border-2 border-light-blue
            "
                onClick={() => {
                  if (missedData.length > 0) {
                    setOpenOverlay(true);
                    setOverlayType("info");
                  } else if (cartData.length <= 0) {
                    setOpenOverlay(true);
                    setOverlayType("empty");
                  } else {
                    setCurrentStep(1);
                  }
                }}
              >
                Checkout
              </button>
            </div>
            {isPhoneView && (
              <div
                className="absolute text-red-500 header-5sb top-0 right-4 cursor-pointer"
                onClick={() => {
                  setActive(false);
                }}
              >
                X
              </div>
            )}
            {openOverlay && (
              <CompleteInfoOverlay
                type={overlayType}
                missingData={missedData}
                setOpenOverlay={setOpenOverlay}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotateY: "0", x: 100 }}
            className="bg-blue-400 p-2 rounded-full"
            onClick={() => {
              setActive(true);
            }}
            exit={{ rotateY: "0deg", x: 100 }}
            animate={{ rotateY: "180deg", x: 0 }}
            key={"activate-checkout"}
          >
            <Image
              src={WhiteCartSideArrowIcon}
              height={30}
              width={30}
              alt="cart side arrow icon"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
