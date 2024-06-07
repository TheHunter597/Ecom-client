"use client";

import AuthContainer from "@/app/auth/components/container";
import ChangeProfileData from "@/app/auth/signup/steps/stepThree/ChangeProfileData";
import { editProfileLoadData } from "@/redux/auth/userCreation";
import { useAppSelector } from "@/redux/reduxHooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function ProfileEditContent() {
  const dispatch = useDispatch();
  const currentUserData = useAppSelector((state) => state.user.userData);
  const router = useRouter();

  useEffect(() => {
    dispatch(editProfileLoadData(currentUserData));
  }, [currentUserData]);

  return (
    <div className="h-screen flex flex-row items-center justify-center">
      <div className="h-screen flex flex-col gap-4 items-center justify-center w-11/12 sm:w-fit">
        <h4 className="header-5sb primary-color">Edit your profile data</h4>
        <AuthContainer>
          <ChangeProfileData
            buttonText="Confirm"
            actionAfterSubmit={async () => {}}
          />
        </AuthContainer>
      </div>
    </div>
  );
}
