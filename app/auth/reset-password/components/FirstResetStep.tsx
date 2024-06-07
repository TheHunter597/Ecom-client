"use client";
import { useEffect, useState } from "react";
import AuthContainer from "../../components/container";
import Input from "../../signup/components/input";
import { useFetch } from "@/utils/hooks/useFetch";
import { useAppSelector } from "@/redux/reduxHooks";
import { changeResetPasswordEmail } from "@/redux/auth/userSlice";
import ReactLoading from "react-loading";
import { useRouter } from "next/navigation";
export default function FirstResetStep() {
  const [currentActiveInput, setCurrentActiveInput] = useState(null);
  const EmailValue = useAppSelector((state) => state.user.resetPassowrd.email);
  const { fetchData, error, data, loading } = useFetch({
    method: "post",
    url: "/api/v1/auth/reset-password/",
    body: { email: EmailValue },
  });

  return (
    <AuthContainer>
      <h2 className="text-2xl font-bold primary-color text-center pb-4">
        Reset Password
      </h2>
      <form
        className="flex flex-col gap-8"
        onSubmit={async (e) => {
          e.preventDefault();
          await fetchData();
        }}
      >
        <Input
          placeholder="Email"
          name="email"
          type="email"
          value={EmailValue}
          changeFunc={changeResetPasswordEmail}
          properties={{ required: true, min: 12, max: 50 }}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.email}
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
        <p className="text-3sb text-gray-600 w-10/12 mx-auto text-center">
          Enter your email and we will send you a link to reset your password
        </p>
      </form>
    </AuthContainer>
  );
}
