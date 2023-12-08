"use client";

import { useFetch } from "@/utils/hooks/useFetch";
import { useAppDispatch } from "@/redux/reduxHooks";
import { changeIsAuthenticated } from "@/redux/userSlice";
import axios from "axios";
import { useEffect, useLayoutEffect } from "react";

export default function IsAuthenticatedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let { data, error, loading, fetchData } = useFetch({
    url: "/api/v1/auth/checkuserauthenticated/",
    method: "get",
    withToken: true,
    withCredentials: true,
  });
  useLayoutEffect(() => {
    async function checkUserAuthenticated() {
      await fetchData();
    }
    checkUserAuthenticated();
  }, []);

  let dispatch = useAppDispatch();
  if (data) {
    dispatch(changeIsAuthenticated(true));
  } else {
    dispatch(changeIsAuthenticated(false));
  }
  return <>{children}</>;
}
