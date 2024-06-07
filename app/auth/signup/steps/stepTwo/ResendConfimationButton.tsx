"use client";
import { useFetch } from "@/utils/hooks/useFetch";
import ReactLoading from "react-loading";
export default function ResendConfirmationButton() {
  let { data, loading, error, fetchData } = useFetch({
    url: "/api/v1/auth/resend-confirmation/",
    method: "post",
    withCredentials: true,
    withToken: true,
  });
  return (
    <div className="flex flex-col gap-2 items-center">
      <button
        className="py-2 primary-background-color  text-2sb w-full 
            flex flex-row gap-2 items-center justify-center rounded-md font-bold text-white h-10"
        onClick={async (e) => {
          await fetchData();
        }}
      >
        {loading ? (
          <ReactLoading type="bubbles" color="#fff" height={20} width={20} />
        ) : (
          "Resend confirmation"
        )}
      </button>
      {data && (
        <small className="text-center text-3sb text-green-500">
          {data.message}
        </small>
      )}
      {error && (
        <small className="text-center text-3sb text-red-500 ">
          {error.message}
        </small>
      )}
    </div>
  );
}
