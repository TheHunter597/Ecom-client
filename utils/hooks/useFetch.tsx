"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface props {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: any;
  withCredentials?: boolean;
  withToken?: boolean;
}

export const useFetch = ({
  url,
  method,
  body,
  withCredentials,
  withToken,
}: props) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  let token: any;
  if (typeof window !== "undefined") {
    token = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.includes("access"))
      ?.split("=")[1];
  }
  let fetchData = async function (overload: any = null) {
    if (overload) {
      body[Object.keys(overload)[0]] = overload[Object.keys(overload)[0]];
    }
    setLoading(true);
    try {
      let res;

      if (method === "get" || method === "delete") {
        res = await axios[method](url, {
          withCredentials: withCredentials ? true : false,
          headers: {
            Authorization: withToken ? `Bearer ${token}` : null,
          },
        });
      } else {
        res = await axios[method](url, body, {
          withCredentials: withCredentials ? true : false,
          headers: {
            Authorization: withToken ? `Bearer ${token}` : null,
          },
        });
      }
      setError(null);
      setData(res.data);
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err.response.data);

      setData(null);
      setLoading(false);
      return false;
    }
  };

  return { data, loading, error, fetchData };
};
