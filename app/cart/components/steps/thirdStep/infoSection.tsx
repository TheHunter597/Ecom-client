import Image from "next/image";
import RightArrowIcon from "@/public/assets/arrows/CartBlueRightArrow.svg";
import DownArrowIcon from "@/public/assets/arrows/CartBlueDownArrow.svg";
import { useState } from "react";
import { useAppSelector } from "@/redux/reduxHooks";
import { AnimatePresence, motion } from "framer-motion";
export default function InfoSection() {
  let infoVariants = {
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
  let [showInfo, setShowInfo] = useState<boolean>(true);
  let {
    firstName,
    lastName,
    address,
    city,
    country,
    zip_code,
    phone_number,
    email,
    state,
  } = useAppSelector((state) => state.user.userData);
  return (
    <div className="w-full flex flex-col gap-6">
      <div
        className="flex flex-row justify-between pb-2 
      border-b-2 border-gray-900 w-full"
      >
        <h5 className="text-3sb primary-color w-full">Delivery informations</h5>
        <Image
          src={showInfo ? DownArrowIcon : RightArrowIcon}
          width={14}
          height={14}
          alt="right arrow icon"
          className="cursor-pointer"
          onClick={(e) => {
            setShowInfo(!showInfo);
          }}
        />
      </div>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            variants={infoVariants}
            initial="inital"
            animate="animate"
            exit="inital"
            className="flex flex-col gap-4 items-center justify-center w-full"
          >
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <div
                className="flex flex-row justify-between 
          align-middle items-center w-9/12 gap-2"
              >
                <div className="FeaturesLine bg-gray-800 w-1/4"></div>
                <div className="text-2sb ">Personal info</div>
                <div className="FeaturesLine bg-gray-800 w-1/4"></div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row gap-4">
                  <p className="text-3sb">
                    <span className="secondary-color">First name: </span>
                    <span className="primary-color">{firstName}</span>
                  </p>
                  <p className="text-3sb">
                    <span className="secondary-color">Last name: </span>
                    <span className="primary-color">{lastName}</span>
                  </p>
                </div>
                <p className="text-3sb">
                  <span className="secondary-color">Phone number: </span>
                  <span className="primary-color">{phone_number}</span>
                </p>
                <p className="text-3sb">
                  <span className="secondary-color">Email address: </span>
                  <span className="primary-color">{email}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <div
                className="flex flex-row justify-between 
          align-middle items-center w-9/12 gap-2"
              >
                <div className="FeaturesLine bg-gray-800 w-1/4"></div>
                <div className="text-2sb ">Delivery location</div>
                <div className="FeaturesLine bg-gray-800 w-1/4"></div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row gap-6">
                  <p className="text-3sb">
                    <span className="secondary-color">Address: </span>
                    <span className="primary-color">{address}</span>
                  </p>
                  <p className="text-3sb">
                    <span className="secondary-color">State: </span>
                    <span className="primary-color">{state}</span>
                  </p>
                  <p className="text-3sb">
                    <span className="secondary-color">City: </span>
                    <span className="primary-color">{city}</span>
                  </p>
                </div>
                <div className="flex flex-row gap-6">
                  <p className="text-3sb">
                    <span className="secondary-color">Country: </span>
                    <span className="primary-color">{country}</span>
                  </p>
                  <p className="text-3sb">
                    <span className="secondary-color">Zip code: </span>
                    <span className="primary-color">{zip_code}</span>
                  </p>
                </div>
                <p className="text-3sb">
                  <span className="secondary-color">Full address: </span>
                  <span className="primary-color">
                    {address},{city},{state},{country}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
