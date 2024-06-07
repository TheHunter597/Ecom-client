"use client";
import {
  changeResetPasswordConfirmPassword,
  changeResetPasswordPassword,
} from "@/redux/auth/userSlice";
import AuthContainer from "../../components/container";
import Input from "../../signup/components/input";
import { useState } from "react";
import { useAppSelector } from "@/redux/reduxHooks";
import { useFetch } from "@/utils/hooks/useFetch";
import ReactLoading from "react-loading";
import closedEye from "@/public/assets/forms/closedEye.svg";
import openedEye from "@/public/assets/forms/openedEye.svg";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  let { token } = params;
  token = token.replace("%40", "@").replace("%", ",").replace("2C", "");

  const [email, confirmationToken] = token.split(",");
  if (!email || !confirmationToken) {
    throw new Error("Invalid token");
  }
  const [currentActiveInput, setCurrentActiveInput] = useState(null);
  const newPassword = useAppSelector(
    (state) => state.user.resetPassowrd.password
  );
  const confirmationPassword = useAppSelector(
    (state) => state.user.resetPassowrd.confirmPassword
  );
  console.log({
    email,
    newPassword,
    confirmationPassword,
    confirmationToken,
  });
  const router = useRouter();
  const { fetchData, error, data, loading } = useFetch({
    method: "put",
    url: "/api/v1/auth/change-password/",
    body: {
      email,
      new_password: newPassword,
      confirm_new_password: confirmationPassword,
      confirmation_token: confirmationToken,
    },
  });
  return (
    <AuthContainer>
      <form
        className="flex flex-col gap-8"
        onSubmit={async (e) => {
          e.preventDefault();
          let result = await fetchData();
          if (result) {
            setTimeout(() => {
              router.push("/auth/login");
            }, 1500);
          }
        }}
      >
        <h2 className="text-2xl font-bold primary-color text-center pb-4">
          Reset Password
        </h2>
        <Input
          placeholder="New Password"
          name="newPassword"
          type="password"
          value={newPassword}
          changeFunc={changeResetPasswordPassword}
          properties={{ required: true, min: 12, max: 50 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.new_password}
          icon={closedEye}
          changeIcon={openedEye}
        />
        <Input
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmationPassword}
          changeFunc={changeResetPasswordConfirmPassword}
          properties={{ required: true, min: 12, max: 50 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.confirm_new_password}
          icon={closedEye}
          changeIcon={openedEye}
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
            flex flex-row gap-2 items-center justify-center rounded-md font-bold h-10"
          >
            Reset Password
          </button>
        )}
      </form>
    </AuthContainer>
  );
}
