"use client";
import AuthContainer from "@/app/auth/components/container";
import Input from "@/app/auth/signup/components/input";
import {
  setConfirmNewPassword,
  setNewPassword,
  setOldPassword,
} from "@/redux/auth/userSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { useState } from "react";
import closedEye from "@/public/assets/forms/closedEye.svg";
import openedEye from "@/public/assets/forms/openedEye.svg";
import ReactLoading from "react-loading";
import { useFetch } from "@/utils/hooks/useFetch";
export default function ChangePasswordMainContent() {
  const [currentActiveInput, setCurrentActiveInput] = useState(null);
  const { oldPassword, newPassword, confirmNewPassword } = useAppSelector(
    (state) => state.user.changeCurrentPassword
  );

  let { data, loading, error, fetchData } = useFetch({
    url: "/api/v1/auth/auth-change-user-password/",
    method: "put",
    body: {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    },
    withCredentials: true,
    withToken: true,
  });
  return (
    <div className="h-screen flex flex-col w-11/12 sm:w-4/12 mx-auto gap-8 items-center justify-center">
      <h4 className="header-5sb primary-color">Edit your Password</h4>
      <AuthContainer>
        <form
          className="py-2 flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            await fetchData();
          }}
        >
          <Input
            placeholder="Enter Old password"
            name="old password"
            type="password"
            value={oldPassword}
            changeFunc={setOldPassword}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
            icon={closedEye}
            changeIcon={openedEye}
            error={error?.errors?.old_password}
          />
          <Input
            placeholder="Enter New password"
            name="new password"
            type="password"
            value={newPassword}
            changeFunc={setNewPassword}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
            icon={closedEye}
            changeIcon={openedEye}
            error={error?.errors?.new_password}
          />
          <Input
            placeholder="Confirm New password"
            name="confirm new password"
            type="password"
            value={confirmNewPassword}
            changeFunc={setConfirmNewPassword}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
            icon={closedEye}
            changeIcon={openedEye}
            error={error?.errors?.confirm_new_password}
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
              <>Change</>
            </button>
          )}
        </form>
      </AuthContainer>
    </div>
  );
}
