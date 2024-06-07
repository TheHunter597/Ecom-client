"use client";
import { useAppSelector } from "@/redux/reduxHooks";
import React, { useState } from "react";
import ClearCartOverlay from "@/app/components/overlay/cart/clearCartOverlay";
import CheckOutSection from "./firstStep/checkOutSection";
import PhoneCartProduct from "../phoneCartProduct";

export default function CartFirstStep({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  let cartData = useAppSelector((state) => state.cart.products);
  let [allProductsHovered, setAllProductsHovered] = useState<boolean>(false);
  let [overlayOpened, setOverlayOpened] = useState<boolean>(false);
  let cartResult = cartData?.map((product) => {
    return <PhoneCartProduct productData={product} key={product.id} />;
  });

  return (
    <div className="grid grid-cols-12 gap-6 relative ">
      <div
        className="col-span-12 sm:col-span-9 flex flex-col gap-20 sm:gap-6 p-6 shadow-lg rounded-lg 
    border border-gray-50 bg-white"
      >
        <div className="flex flex-row justify-between">
          <h3 className="header-4sb text-dark-blue">
            Cart{" "}
            <span className="text-4r light-gray text-3r">
              ({cartData ? cartData.length : 0}) products
            </span>
          </h3>
          <button
            className={`text-3sb md:text-2sb text-red-600 h-fit self-end  desFeatures ${
              allProductsHovered
                ? "text-dark desFeatures"
                : "text-gray desFeatures-inactive"
            }`}
            onMouseEnter={() => {
              setAllProductsHovered(true);
            }}
            onMouseLeave={() => {
              setAllProductsHovered(false);
            }}
            onClick={() => {
              setOverlayOpened(true);
            }}
          >
            Clear all products
          </button>
        </div>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
            {cartResult}
          </div>
        </div>
        {overlayOpened ? (
          <ClearCartOverlay closeOverlay={setOverlayOpened} />
        ) : (
          ""
        )}
      </div>
      <CheckOutSection setCurrentStep={setCurrentStep} cartData={cartData} />
    </div>
  );
}
