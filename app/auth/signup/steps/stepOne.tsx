"use client";
import AuthContainer from "../../components/container";
import Input from "../components/input";
import { useState } from "react";
import rightArrow from "@/public/assets/arrows/rightArrow.svg";
import closedEye from "@/public/assets/forms/closedEye.svg";
import openedEye from "@/public/assets/forms/openedEye.svg";
import Image from "next/image";
import {
  setUserConfirmPassword,
  setUserEmail,
  setUserPassword,
} from "@/redux/auth/userCreation";
import { useAppSelector } from "@/redux/reduxHooks";
import { useFetch } from "@/utils/hooks/useFetch";
import ReactLoading from "react-loading";
import Link from "next/link";
export default function StepOne({
  changeCurrentStep,
}: {
  changeCurrentStep: Function;
}) {
  let EmailValue = useAppSelector((state) => state.userCreation.email);
  let PasswordValue = useAppSelector((state) => state.userCreation.password);
  let ConfirmPasswordValue = useAppSelector(
    (state) => state.userCreation.confirm_password
  );
  let [currentActiveInput, setCurrentActiveInput] = useState(null);
  const { data, loading, error, fetchData } = useFetch({
    url: "/api/v1/auth/create/",
    method: "post",
    body: {
      email: EmailValue,
      password: PasswordValue,
      confirm_password: ConfirmPasswordValue,
    },
    withCredentials: true,
  });
  return (
    <div className="pt-20 flex flex-col items-center gap-10 primary-color w-full">
      <h2 className="flex flex-col gap-2 items-center">
        <span className="text-3sb">step 1 of 4</span>
        <span className="header-6sb">Account information</span>
      </h2>
      <AuthContainer>
        <form
          className="py-2 flex flex-col gap-8"
          onSubmit={async (e) => {
            e.preventDefault();
            let result = await fetchData();
            if (result) {
              changeCurrentStep((prev: number) => prev + 1);
            }
          }}
        >
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={EmailValue}
            changeFunc={setUserEmail}
            properties={{ required: true, min: 12, max: 50 }}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
            error={error?.errors?.email}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={PasswordValue}
            changeFunc={setUserPassword}
            icon={closedEye}
            changeIcon={openedEye}
            properties={{ required: true, min: 8, max: 30 }}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
            error={error?.errors?.password}
          />
          <Input
            placeholder="Confirm password"
            name="confirm password"
            type="password"
            value={ConfirmPasswordValue}
            changeFunc={setUserConfirmPassword}
            icon={closedEye}
            changeIcon={openedEye}
            properties={{ required: true, min: 8, max: 30 }}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
            error={error?.errors?.confirm_password}
          />
          {error && error.message ? (
            <small className="text-red-600 text-center text-3sb">
              {error.message}
            </small>
          ) : (
            ""
          )}
          {data && data.message ? (
            <small className="text-green-600 text-center text-3sb">
              {data.message}
            </small>
          ) : (
            ""
          )}
          <span className="text-3sb text-gray-700 w-full text-center">
            Already have an account{" "}
            <Link className="text-red-500" href={"/auth/login"}>
              Login
            </Link>
          </span>
          {loading ? (
            <div className="flex flex-row justify-center">
              <ReactLoading
                type="bubbles"
                width={50}
                height={40}
                color="#101B42"
              />
            </div>
          ) : (
            <button
              className="py-2 main-yellow-background-color primary-color text-2sb w-full 
            flex flex-row gap-2 items-center justify-center rounded-md font-bold h-10 "
            >
              Next
              <Image src={rightArrow} alt="right arrow" />
            </button>
          )}
        </form>
      </AuthContainer>
    </div>
  );
}
