import { useEffect, useState } from "react";
import rightArrow from "@/public/assets/arrows/rightArrow.svg";
import AccountActive from "@/public/assets//others/AccountActive.png";
import accountNotActive from "@/public/assets/others/accountNotActive.png";
import Image from "next/image";
import { useFetch } from "@/utils/hooks/useFetch";
import AuthContainer from "../../components/container";
export default function StepTwo({
  changeCurrentStep,
}: {
  changeCurrentStep: Function;
}) {
  let [accountActive, SetAccountActive] = useState(false);
  let { data, loading, error, fetchData } = useFetch({
    url: "/api/v1/auth/confirmed/",
    method: "post",
    withCredentials: true,
    withToken: true,
  });
  useEffect(() => {
    let interval: any;
    if (!accountActive) {
      interval = setInterval(async () => {
        let result = await fetchData();
        if (result) {
          SetAccountActive(true);
        }
      }, 1500);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [accountActive]);
  return (
    <div className="pt-20 flex flex-col items-center gap-10 primary-color">
      <h2 className="flex flex-col gap-2 items-center">
        <span className="text-3sb">step 1 of 4</span>
        <span className="header-6sb">Account information</span>
      </h2>
      <AuthContainer>
        <div className="py-2  flex flex-col gap-10 items-center justify-center">
          <h2 className="secondary-color header-6sb text-center">
            Confirmation message has been sent to your email please confirm it
          </h2>
          <p className="flex flex-row gap-2">
            <span className="primary-color text-2sb">Account status </span>
            <Image
              src={accountActive ? AccountActive : accountNotActive}
              alt="account-active-icon"
              width={24}
              height={14}
            />
          </p>
          <div className="flex flex-col gap-2 w-full">
            <button
              className={`py-2 main-yellow-background-color primary-color text-2sb w-full 
            flex flex-row gap-2 items-center justify-center rounded-md font-bold 
            ${accountActive ? "opacity-100" : "opacity-50"}`}
              disabled={!accountActive}
              onClick={(e) => {
                e.preventDefault();
                changeCurrentStep((prev: number) => prev + 1);
              }}
            >
              Continue
              <Image src={rightArrow} alt="right arrow" />
            </button>
            <button
              className="py-2 primary-background-color  primary-color text-2sb w-full 
            flex flex-row gap-2 items-center justify-center rounded-md font-bold text-white"
              onClick={(e) => {
                e.preventDefault();
                changeCurrentStep((prev: number) => prev + 1);
              }}
            >
              Resend
            </button>
            <button
              className="primary-color"
              onClick={() => {
                changeCurrentStep((prev: number) => prev + 1);
              }}
            >
              pass
            </button>
          </div>
        </div>
      </AuthContainer>
    </div>
  );
}
