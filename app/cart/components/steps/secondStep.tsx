import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import {
  setCardNumber,
  setCardholderName,
  setExpiryMonth,
  setExpiryYear,
  setCVC,
} from "@/redux/cart/checkout";
import VisaLogo from "@/public/assets/cart/Visa.svg";
import MastecardLogo from "@/public/assets/cart/MasterCard.png";
import Image from "next/image";
import Input from "@/app/auth/signup/components/input";
import React, { useEffect, useState } from "react";
export default function SecondStep({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  let [currentActiveInput, setCurrentActiveInput] = useState(null);
  let dispatch = useAppDispatch();
  let cardNumber = useAppSelector((state) => state.checkout.cardNumber);
  let cardName = useAppSelector((state) => state.checkout.cardholderName);
  let cardExpiryYear = useAppSelector((state) => state.checkout.expiryYear);
  let cardExpiryMonth = useAppSelector((state) => state.checkout.expiryMonth);
  let cardCVC = useAppSelector((state) => state.checkout.cvc);
  useEffect(() => {
    let localCardNumber = localStorage.getItem("cardNumber");
    let localCardName = localStorage.getItem("cardName");
    if (localCardNumber) {
      dispatch(setCardNumber(localCardNumber));
    }
    if (localCardName) {
      dispatch(setCardholderName(localCardName));
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        localStorage.setItem("cardNumber", cardNumber);
        localStorage.setItem("cardName", cardName);
        setCurrentStep(2);
      }}
      className="shadow-lg borderborder-gray-100
        rounded-md w-11/12 mx-auto sm:m-0 sm:w-10/12 px-2 sm:px-6 py-10
        flex flex-col gap-10 bg-white
        "
    >
      <div className="flex flex-col sm:flex-row gap-5">
        <div
          className="rounded-lg shadow-lg px-2 sm:px-6 py-7 text-white
        w-full sm:w-6/12 flex flex-col justify-between h-fit gap-8 self-center "
          style={{ backgroundColor: "#741FEF" }}
        >
          <div className="h-12 w-16">
            {cardNumber && (
              <Image
                className="h-full w-full rounded-lg"
                src={cardNumber.startsWith("4") ? VisaLogo : MastecardLogo}
                alt=""
              />
            )}
          </div>
          <p className="oxanium text-2sb">
            {cardNumber ? cardNumber : "CARD NUMBER"}
          </p>
          <div className="grid grid-cols-9 gap-1">
            <div className="flex flex-col flex-wrap gap-2 justify-between h-full col-span-5">
              <h6 className="text-xs font-semibold">Cardholder Name</h6>
              <p className="text-3sb break-normal h-fit max-w-full overflow-hidden overflow-ellipsis">
                {cardName ? cardName : ""}
              </p>
            </div>
            <div className="flex flex-col justify-between h-full col-span-2">
              <h6 className="text-xs font-semibold">EXP</h6>
              <p className="text-3sb">
                {cardExpiryMonth && cardExpiryYear
                  ? `${cardExpiryMonth}/${cardExpiryYear}`
                  : ""}
              </p>
            </div>
            <div className="flex flex-col justify-between h-full col-span-2">
              <h6 className="text-xs font-semibold">CVS</h6>
              <p className="text-3sb">{cardCVC ? cardCVC : ""}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 primary-color w-full sm:w-6/12">
          <h4 className="oxanium text-2sb ">Payment details</h4>
          <div className="flex flex-col gap-8">
            <Input
              placeholder="CARDHOLDER NAME"
              value={cardName}
              changeFunc={setCardholderName}
              type="text"
              currentActiveInput={currentActiveInput}
              setCurrentActiveInput={setCurrentActiveInput}
              name="cardholder name"
              properties={{ required: true }}
            />
            <Input
              placeholder="CARD NUMBER"
              value={cardNumber}
              changeFunc={setCardNumber}
              type="text"
              currentActiveInput={currentActiveInput}
              setCurrentActiveInput={setCurrentActiveInput}
              name="cardholder number"
              properties={{
                min: 19,
                max: 19,
                required: true,
              }}
            />
            <div className="flex flex-row gap-3">
              <Input
                placeholder="EXP MONTH"
                value={cardExpiryMonth}
                changeFunc={setExpiryMonth}
                type="text"
                currentActiveInput={currentActiveInput}
                setCurrentActiveInput={setCurrentActiveInput}
                name="expiry month"
                properties={{
                  min: 2,
                  max: 2,
                  required: true,
                }}
              />
              <Input
                placeholder="EXP YEAR"
                value={cardExpiryYear}
                changeFunc={setExpiryYear}
                type="text"
                currentActiveInput={currentActiveInput}
                setCurrentActiveInput={setCurrentActiveInput}
                name="expiry year"
                properties={{
                  min: 4,
                  max: 4,
                  required: true,
                }}
              />
              <Input
                placeholder="CVC"
                value={cardCVC}
                changeFunc={setCVC}
                type="text"
                currentActiveInput={currentActiveInput}
                setCurrentActiveInput={setCurrentActiveInput}
                name="cvc"
                properties={{
                  min: 3,
                  max: 3,
                  required: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="main-yellow-background-color px-8 py-3 rounded-md self-center text-2sb
        primary-color w-3/4 sm:w-1/4 hover:opacity-80 duration-200"
      >
        Next
      </button>
    </form>
  );
}
