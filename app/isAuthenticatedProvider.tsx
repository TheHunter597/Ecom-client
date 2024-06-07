"use client";
import { changeIsPhoneView, fetchUserData } from "@/redux/auth/userSlice";
import { useAppDispatch } from "@/redux/reduxHooks";
import { useEffect } from "react";

export default function IsAuthenticatedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.innerWidth <= 768) {
      dispatch(changeIsPhoneView(true));
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        dispatch(changeIsPhoneView(true));
      } else {
        dispatch(changeIsPhoneView(false));
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth <= 768) {
          dispatch(changeIsPhoneView(true));
        } else {
          dispatch(changeIsPhoneView(false));
        }
      });
    };
  }, []);
  return <>{children}</>;
}
