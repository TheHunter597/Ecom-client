"use client";
import { useAppSelector } from "@/redux/reduxHooks";
import AuthContainer from "../../components/container";
import Input from "../../signup/components/input";
import {
  changeResetPasswordConfirmPassword,
  changeResetPasswordEmail,
  changeResetPasswordPassword,
} from "@/redux/auth/userSlice";
import { useState } from "react";
import { useFetch } from "@/utils/hooks/useFetch";
export default function SecondResetStep({
  changeCurrentStep,
}: {
  changeCurrentStep: Function;
}) {
  const [currentActiveInput, setCurrentActiveInput] = useState(null);
  const { password, confirmPassword } = useAppSelector(
    (state) => state.user.resetPassowrd
  );
  const { fetchData, loading, error } = useFetch({
    method: "post",
    url: "/api/auth/reset-password",
    body: {},
  });
  return (
    <div className="w-11/12 sm:w-5/12 md:4/12 flex flex-row items-center justify-center">
      <AuthContainer>
        <h2 className="text-2xl font-bold primary-color text-center pb-4">
          Reset Password
        </h2>
        <form
          className="flex flex-col gap-8"
          onSubmit={async (e) => {
            e.preventDefault();
            let result = await fetchData();
            if (result) {
              changeCurrentStep((prev: number) => prev + 1);
            }
          }}
        >
          <Input
            placeholder="New Password"
            name="newPassword"
            type="newPassword"
            value={password}
            changeFunc={changeResetPasswordPassword}
            properties={{ required: true, min: 12, max: 50 }}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
            error={error?.errors?.email}
          />
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="confirmPassword"
            value={confirmPassword}
            changeFunc={changeResetPasswordConfirmPassword}
            properties={{ required: true, min: 12, max: 50 }}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
            error={error?.errors?.email}
          />
          <button
            className="py-2 main-yellow-background-color primary-color text-2sb w-full 
            flex flex-row gap-2 items-center justify-center rounded-md font-bold"
          >
            Reset Password
          </button>
          <small className="text-3sb text-red-600 text-center">
            {error?.message}
          </small>
          <p className="text-3sb te text-gray-600 w-10/12 mx-auto text-center">
            Enter your email and we will send you a link to reset your password
          </p>
        </form>
      </AuthContainer>
    </div>
  );
}
