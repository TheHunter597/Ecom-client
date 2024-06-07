"use client";
import { useFetch } from "@/utils/hooks/useFetch";
import { useState } from "react";
import ReactLoading from "react-loading";
import closedEye from "@/public/assets/forms/closedEye.svg";
import openedEye from "@/public/assets/forms/openedEye.svg";
import Input from "../signup/components/input";
import { setUserLoginEmail, setUserLoginPassword } from "@/redux/auth/login";
import { useAppSelector } from "@/redux/reduxHooks";
import { useRouter } from "next/navigation";
import AuthContainer from "../components/container";
import Link from "next/link";

export default function Login() {
  let EmailValue = useAppSelector((state) => state.userLogin.email);
  let PasswordValue = useAppSelector((state) => state.userLogin.password);
  let [currentActiveInput, setCurrentActiveInput] = useState(null);
  let { data, loading, error, fetchData } = useFetch({
    url: "/api/v1/auth/login/",
    method: "post",
    body: {
      email: EmailValue,
      password: PasswordValue,
    },
    withCredentials: true,
  });
  let isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  let router = useRouter();

  if (isAuthenticated == true) {
    router.push("/");
  }
  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <div className="w-11/12 sm:w-5/12 md:4/12 flex flex-row items-center justify-center">
        <AuthContainer>
          <h2 className="text-2xl font-bold primary-color text-center pb-4">
            Login
          </h2>
          <form
            className="flex flex-col gap-8"
            onSubmit={async (e) => {
              e.preventDefault();
              let result = await fetchData();
              if (result && typeof window !== "undefined") {
                window.location.href = "/";
              }
            }}
          >
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={EmailValue}
              changeFunc={setUserLoginEmail}
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
              changeFunc={setUserLoginPassword}
              icon={closedEye}
              changeIcon={openedEye}
              properties={{ required: true, min: 8, max: 30 }}
              currentActiveInput={currentActiveInput}
              setCurrentActiveInput={setCurrentActiveInput}
              error={error?.errors?.password}
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
            flex flex-row gap-2 items-center justify-center rounded-md font-bold"
              >
                Login
              </button>
            )}
            <div className="flex flex-col gap-4">
              <Link
                href={"/auth/reset-password"}
                className="text-3r text-gray-600 text-center cursor-pointer hover:text-gray-900 duration-200"
              >
                Forgot your password?{" "}
              </Link>
              <span className="text-3sb text-gray-700 w-full text-center">
                Dont have an account{" "}
                <Link className="text-red-500" href={"/auth/signup"}>
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </AuthContainer>
      </div>
    </div>
  );
}
