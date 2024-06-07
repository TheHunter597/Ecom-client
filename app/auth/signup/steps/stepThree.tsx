import { useAppSelector } from "@/redux/reduxHooks";
import { useEffect, useState } from "react";
import { useFetch } from "@/utils/hooks/useFetch";
import ChangeProfileData from "./stepThree/ChangeProfileData";
import AuthContainer from "../../components/container";

export default function StepThree({
  changeCurrentStep,
}: {
  changeCurrentStep: Function;
}) {
  return (
    <div className="pt-20 flex flex-col items-center gap-10 primary-color">
      <h2 className="flex flex-col gap-2 items-center">
        <span className="text-3sb">step 2 of 4</span>
        <span className="header-6sb">Personal informations</span>
      </h2>
      <AuthContainer>
        <div className="flex flex-col items-center justify-center">
          <ChangeProfileData
            buttonText="Next"
            actionAfterSubmit={() => {
              changeCurrentStep((prev: number) => prev + 1);
            }}
          />
          <button
            className="primary-color text-4sb underline cursor-pointer text-center"
            onClick={() => {
              changeCurrentStep((prev: number) => prev + 1);
            }}
          >
            skip this step
          </button>
        </div>
      </AuthContainer>
    </div>
  );
}
