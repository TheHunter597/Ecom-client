"use client";
import ExitIcon from "@/public/assets/others/exit.svg";
import { useFetch } from "@/utils/hooks/useFetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function ClearCartOverlay({
  closeOverlay,
}: {
  closeOverlay: Function;
}) {
  let { fetchData, data, error } = useFetch({
    url: "/api/v1/cart",
    method: "delete",
    withToken: true,
    withCredentials: true,
  });
  let router = useRouter();
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 z-50">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2
       -translate-y-1/2 bg-white rounded-lg p-12 md:w-4/12 sm:8-12 w-10/12 "
      >
        <div
          className="absolute cursor-pointer top-4 right-5"
          onClick={() => {
            closeOverlay(false);
          }}
        >
          <Image src={ExitIcon} alt="exit" width={24} height={24} />
        </div>
        <h3 className="header-5sb text-dark-blue text-center relative  ">
          Are you sure you want to clear all products?
        </h3>
        <div className="flex flex-row justify-center gap-4 mt-4">
          <button
            className="text-2sb text-red-600 hover:bg-gray-900 
          py-1 px-2 rounded-lg hover:text-white duration-300"
            onClick={async () => {
              await fetchData();
              closeOverlay(false);
              window.location.reload();
            }}
          >
            Yes
          </button>
          <button
            className="text-2sb text-gray-600 hover:bg-gray-900 
          py-1 px-2 rounded-lg hover:text-white duration-300"
            onClick={() => {
              closeOverlay(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
